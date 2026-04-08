use crate::errors::AppError;
use crate::models::user::User;
use sqlx::PgPool;

pub struct UserRepository {
    pool: PgPool,
}

impl UserRepository {
    pub fn new(pool: PgPool) -> Self {
        // Must be capital S
        Self { pool }
    }

    pub async fn find_by_username(&self, username: &str) -> Result<Option<User>, AppError> {
        sqlx::query_as!(
            User,
            "SELECT user_id, username, password_hash, email FROM users WHERE username = $1",
            username
        )
        .fetch_optional(&self.pool)
        .await // No parentheses here
        .map_err(AppError::Database)
    }

    pub async fn insert(
        &self,
        username: &str,
        password_hash: &str,
        email: &str,
    ) -> Result<User, AppError> {
        sqlx::query_as!(
            User,
            "INSERT INTO users (username, password_hash, email)
             VALUES ($1, $2, $3)
             RETURNING user_id, username, password_hash, email",
            username,
            password_hash,
            email
        )
        .fetch_one(&self.pool)
        .await
        .map_err(AppError::Database)
    }
}
