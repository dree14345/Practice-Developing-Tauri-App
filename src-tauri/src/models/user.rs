use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, sqlx::FromRow)]
pub struct User {
    pub user_id: i32,
    pub username: String,
    pub password_hash: String,
    pub email: Option<String>,
}
