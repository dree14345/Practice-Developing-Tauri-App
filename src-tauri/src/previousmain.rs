// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use serde::{Deserialize, Serialize};
use sqlx::{postgres::PgPoolOptions, PgPool};
use tauri::State;

#[derive(Serialize, Deserialize, sqlx::FromRow)]
struct Item {
    id: i32,
    name: String,
    description: Option<String>,
}

struct AppState {
    db: PgPool,
}
// CREATE
#[tauri::command]
async fn create_item(
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

#[tokio::main]
async fn main() {
    dotenv::dotenv().ok();
    let db_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(&db_url)
        .await
        .expect("Failed to connect to database");

    tauri::Builder::default()
        .manage(AppState { db: pool })
        .invoke_handler(tauri::generate_handler![
            create_item,
            get_items,
            update_item,
            delete_item,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
