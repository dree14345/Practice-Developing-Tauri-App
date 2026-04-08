use crate::errors::AppError;
use crate::repositories::item_repo::ItemRepository;
use crate::{commands::auth::AuthResponse, models::item::Item};
use jsonwebtoken::{decode, encode, DecodingKey, EncodingKey, Header, Validation};
use serde::{Deserialize, Serialize};
use std::sync::Arc;

const JWT_SECRET: &str = "your-secret-key-change-this-in-production";

#[derive(Debug, Serialize, Deserialize)]
struct Claims {
    sub: i32, // user id
    username: String,
    exp: usize, // expiry timestamp
}

pub struct ItemService {
    user_repo: Arc<ItemRepository>,
}

impl ItemService {
    pub fn new(user_repo: Arc<ItemRepository>) -> Self {
        Self { user_repo }
    }

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

    pub async fn create_item(
        state: State<'_, AppState>,
        name: String,
        description: Option<String>,
    ) -> Result<Item, String> {
        sqlx::query_as!(
            Item,
            "INSERT INTO items(name, description) VALUES($1, $2) RETURNING id, name, description",
            name,
            description
        )
        .fetch_one(&state.db)
        .await
        .map_err(|e| e.to_string())
    }
    // READ (all)
    #[tauri::command]
    async fn get_items(state: State<'_, AppState>) -> Result<Vec<Item>, String> {
        sqlx::query_as!(Item, "SELECT id, name, description FROM items ORDER BY id")
            .fetch_all(&state.db)
            .await
            .map_err(|e| e.to_string())
    }
    // Get Item By Id
    #[tauri::command]
    async fn get_item_by_id(
        state: tauri::State<'_, AppState>,
        id: i32,
    ) -> Result<Option<Item>, String> {
        // Use Option because the ID might not exist
        sqlx::query_as!(
            Item,
            "SELECT id, name, description FROM items WHERE id = $1",
            id
        )
        .fetch_optional(&state.db) // fetch_optional returns 0 or 1 result
        .await
        .map_err(|e| e.to_string())
    }
    // UPDATE
    #[tauri::command]
    async fn update_item(
        state: State<'_, AppState>,
        id: i32,
        name: String,
        description: Option<String>,
    ) -> Result<Item, String> {
        sqlx::query_as!(Item, "UPDATE items SET name = $2, description = $3 WHERE id = $1 RETURNING id, name, description", id, name, description).fetch_one(&state.db).await.map_err(|e| e.to_string())
    }
    #[tauri::command]
    async fn delete_item(state: State<'_, AppState>, id: i32) -> Result<(), String> {
        sqlx::query!("DELETE FROM items WHERE id=$1", id)
            .execute(&state.db)
            .await
            .map_err(|e| e.to_string())?;
        Ok(())
    }
}
