// src-tauri/src/main.rs
mod commands;
mod errors;
mod models;
mod repositories;
mod services;

use repositories::user_repo::UserRepository;
use services::auth_service::AuthService;
use sqlx::postgres::PgPoolOptions;
use std::sync::Arc;

pub use errors::AppError;

pub struct AppState {
    pub auth_service: Arc<AuthService>,
    // you'll add item_service here too later
}

#[tokio::main]
async fn main() {
    dotenv::dotenv().ok();

    let db_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    let pool = PgPoolOptions::new()
        .max_connections(10)
        .connect(&db_url)
        .await
        .expect("Failed to connect to database");

    // run migrations automatically on startup

    // wire up the dependency chain:
    // pool → repo → service → AppState
    let user_repo = Arc::new(UserRepository::new(pool.clone()));
    let auth_service = Arc::new(AuthService::new(user_repo));

    tauri::Builder::default()
        .manage(AppState { auth_service })
        .invoke_handler(tauri::generate_handler![
            commands::auth::login,
            commands::auth::logout,
            commands::auth::validate_token,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
