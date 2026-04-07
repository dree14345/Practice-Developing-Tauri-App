import { invoke } from "@tauri-apps/api/core";
import type { Item, CreateItemDTO, UpdateItemDTO } from "../types/item";

export const ItemsApi = {
  getAll: () => invoke<Item[]>("get_items"),
  getById: (id: number) => invoke<Item>("get_item_by_id", { id }),
  create: (dto: CreateItemDTO) =>
    invoke<Item>("create_item", {
      name: dto.name,
      description: dto.description,
    }),
  update: (dto: UpdateItemDTO) =>
    invoke<Item>("update_item", {
      id: dto.id,
      name: dto.name,
      description: dto.description,
    }),
  delete: (id: number) => invoke<Item[]>("delete_item", { id }),
};
