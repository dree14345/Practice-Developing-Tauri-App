// src-tauri/src/services/auth_service.rs
use crate::commands::auth::AuthResponse;
use crate::errors::AppError;
use crate::repositories::user_repo::UserRepository;
use jsonwebtoken::{decode, encode, DecodingKey, EncodingKey, Header, Validation};
use serde::{Deserialize, Serialize};
use std::sync::Arc;

const JWT_SECRET: &str = "your-secret-key-change-this-in-production";

// the data encoded inside the JWT token
#[derive(Debug, Serialize, Deserialize)]
struct Claims {
    sub: i32, // user id
    username: String,
    exp: usize, // expiry timestamp
}

pub struct AuthService {
    user_repo: Arc<UserRepository>,
}

impl AuthService {
    pub fn new(user_repo: Arc<UserRepository>) -> Self {
        Self { user_repo }
    }

    pub async fn login(
        &self,
        username: String,
        password: String,
    ) -> Result<AuthResponse, AppError> {
        // 1. look up user in DB
        let user =
            self.user_repo
                .find_by_username(&username)
                .await?
                .ok_or(AppError::Unauthorized(
                    "Invalid username or password".into(),
                ))?;

        // 2. verify password against stored hash
        let valid = bcrypt::verify(&password, &user.password_hash)
            .map_err(|_| AppError::Unauthorized("Invalid username or password".into()))?;

        if !valid {
            return Err(AppError::Unauthorized(
                "Invalid username or password".into(),
            ));
        }

        // 3. generate JWT
        let token = self.generate_token(user.user_id, &user.username)?;

        Ok(AuthResponse {
            token,
            user_id: user.user_id,
            username: user.username,
        })
    }

    pub async fn validate_token(&self, token: String) -> Result<bool, AppError> {
        let result = decode::<Claims>(
            &token,
            &DecodingKey::from_secret(JWT_SECRET.as_bytes()),
            &Validation::default(),
        );
        Ok(result.is_ok())
    }

    // called during registration
    pub async fn register(
        &self,
        username: String,
        password: String,
        email: String,
    ) -> Result<AuthResponse, AppError> {
        // check if username already taken
        let existing = self.user_repo.find_by_username(&username).await?;
        if existing.is_some() {
            return Err(AppError::Validation("Username already taken".into()));
        }

        // hash the password — never store plain text
        let hash = bcrypt::hash(&password, bcrypt::DEFAULT_COST)
            .map_err(|_| AppError::Internal("Failed to hash password".into()))?;

        // insert into DB
        let user = self.user_repo.insert(&username, &hash, &email).await?;

        let token = self.generate_token(user.user_id, &user.username)?;

        Ok(AuthResponse {
            token,
            user_id: user.user_id,
            username: user.username,
        })
    }

    fn generate_token(&self, user_id: i32, username: &str) -> Result<String, AppError> {
        // token expires in 24 hours
        let expiry = chrono::Utc::now()
            .checked_add_signed(chrono::Duration::hours(24))
            .unwrap()
            .timestamp() as usize;

        let claims = Claims {
            sub: user_id,
            username: username.to_string(),
            exp: expiry,
        };

        encode(
            &Header::default(),
            &claims,
            &EncodingKey::from_secret(JWT_SECRET.as_bytes()),
        )
        .map_err(|_| AppError::Internal("Failed to generate token".into()))
    }
}
