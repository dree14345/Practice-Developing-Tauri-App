use crate::{AppError, AppState};
use serde::{Deserialize, Serialize};
use tauri::State;

#[derive(Serialize)]
pub struct AuthResponse {
    pub token: String,
    pub user_id: i32,
    pub username: String,
}

#[tauri::command]
pub async fn login(
    state: State<'_, AppState>,
    username: String,
    password: String,
) -> Result<AuthResponse, AppError> {
    state.auth_service.login(username, password).await
}

#[tauri::command]
pub async fn logout(state: State<'_, AppState>) -> Result<(), AppError> {
    Ok(())
}

#[tauri::command]
pub async fn validate_token(state: State<'_, AppState>, token: String) -> Result<bool, AppError> {
    state.auth_service.validate_token(token).await
}
