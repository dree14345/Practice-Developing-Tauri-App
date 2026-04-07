import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ItemsApi } from "../api/items";
import type { CreateItemDTO, UpdateItemDTO } from "../types/item";

export function useItems() {
    return useQuery({
        queryKey: ['items'],
        queryFn: () => ItemsApi.getAll(),
    })
}

export function useItem(id: number) {
    return useQuery({
        queryKey: ['items', id],
        queryFn: () => ItemsApi.getById(id),
        enabled: !!id,
    });
}

export function useCreateItem() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (dto: CreateItemDTO) => ItemsApi.create(dto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['items']});
        },
    });
}

export function useUpdateItem() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (dto: UpdateItemDTO) => ItemsApi.update(dto),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['items']})
        }
    })
}

export function useDeleteItem() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => ItemsApi.delete(id),
        onSuccess: () => {
           queryClient.invalidateQueries({queryKey: ['items']}) 
        }
    })
}