use crate::errors::AppError;
use crate::models::item::Item;
use sqlx::PgPool;

pub struct ItemRepository {
    pool: PgPool,
}

impl ItemRepository {
    pub fn new(pool: PgPool) -> Self { // Fixed: capital S
        Self { pool }
    }

    // CREATE - Removed State, added &self to use the pool
    pub async fn create_item(
        &self, 
        name: String,
        description: Option<String>,
    ) -> Result<Item, AppError> {
        sqlx::query_as!(
            Item,
            "INSERT INTO items(name, description) VALUES($1, $2) RETURNING id, name, description",
            name,
            description
        )
        .fetch_one(&self.pool)
        .await
        .map_err(AppError::Database)
    }

    // READ (all)
    pub async fn get_items(&self) -> Result<Vec<Item>, AppError> {
        sqlx::query_as!(Item, "SELECT id, name, description FROM items ORDER BY id")
            .fetch_all(&self.pool)
            .await
            .map_err(AppError::Database)
    }

    // Get Item By Id
    pub async fn get_item_by_id(
        &self,
        id: i32,
    ) -> Result<Option<Item>, AppError> {
        sqlx::query_as!(
            Item,
            "SELECT id, name, description FROM items WHERE id = $1",
            id
        )
        .fetch_optional(&self.pool)
        .await
        .map_err(AppError::Database)
    }

    // UPDATE
    pub async fn update_item(
        &self,
        id: i32,
        name: String,
        description: Option<String>,
    ) -> Result<Item, AppError> {
        sqlx::query_as!(
            Item, 
            "UPDATE items SET name = $2, description = $3 WHERE id = $1 RETURNING id, name, description", 
            id, 
            name, 
            description
        )
        .fetch_one(&self.pool)
        .await
        .map_err(AppError::Database)
    }

    // DELETE
    pub async fn delete_item(&self, id: i32) -> Result<(), AppError> {
        sqlx::query!("DELETE FROM items WHERE id=$1", id)
            .execute(&self.pool)
            .await
            .map_err(AppError::Database)?;
        Ok(())
    }
}