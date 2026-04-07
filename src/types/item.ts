export interface Item {
    id: number;
    name: string;
    description: string | null;
    created_at: string;
}

export interface CreateItemDTO {
    name: string;
    description: string;
}

export interface UpdateItemDTO {
    id: number;
    name?: string;
    description?: string;
}