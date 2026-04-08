use crate::models::item::{CreateItemDto, Item, ItemFilters, PaginatedItems, UpdateItemDto};
use crate::services::auth_service::Claims;
use crate::{AppError, AppState};
use tauri::State;

// helper — pulls the user_id out of the JWT in every command
// so the service always knows WHO is making the request
fn user_id_from_token(token: &str) -> Result<i32, AppError> {
    Claims::decode(token)
        .map(|c| c.sub)
        .map_err(|_| AppError::Unauthorized("Invalid or expired token".into()))
}

#[tauri::command]
pub async fn get_items(
    state: State<'_, AppState>,
    token: String,
    filters: Option<ItemFilters>,
) -> Result<PaginatedItems, AppError> {
    user_id_from_token(&token)?; // verify token is valid first
    state
        .item_service
        .get_all(filters.unwrap_or_default())
        .await
}

#[tauri::command]
pub async fn get_item(
    state: State<'_, AppState>,
    token: String,
    id: i32,
) -> Result<Item, AppError> {
    user_id_from_token(&token)?;
    state.item_service.get_by_id(id).await
}

#[tauri::command]
pub async fn create_item(
    state: State<'_, AppState>,
    token: String,
    dto: CreateItemDto,
) -> Result<Item, AppError> {
    let user_id = user_id_from_token(&token)?;
    state.item_service.create(dto, user_id).await
}

#[tauri::command]
pub async fn update_item(
    state: State<'_, AppState>,
    token: String,
    id: i32,
    dto: UpdateItemDto,
) -> Result<Item, AppError> {
    let user_id = user_id_from_token(&token)?;
    state.item_service.update(id, dto, user_id).await
}

#[tauri::command]
pub async fn delete_item(
    state: State<'_, AppState>,
    token: String,
    id: i32,
) -> Result<(), AppError> {
    let user_id = user_id_from_token(&token)?;
    state.item_service.delete(id, user_id).await
}
