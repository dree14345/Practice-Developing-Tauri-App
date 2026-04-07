import { useItems, useDeleteItem } from "../../hooks/useItems";
import { useItemUIStore } from "../../stores/ItemUIStore";
import { ItemForm } from "../../components/items/ItemForm";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react"; // Optional: npm i lucide-react

export function Index() {
  const { data: items, isLoading, isError } = useItems();
  const deleteItem = useDeleteItem();
  const { openCreateModal, openEditModal, isModalOpen } = useItemUIStore();

  if (isLoading)
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );

  if (isError)
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-800 border border-red-200">
        Failed to load items. Please try again later.
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Inventory
          </h1>
          <p className="text-gray-500 mt-1">
            Manage and track your items efficiently.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all shadow-md active:scale-95"
        >
          <Plus size={18} />
          <span>New Item</span>
        </button>
      </div>

      {/* Table Section */}
      <div className="overflow-hidden bg-white rounded-xl border border-gray-200 shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-200">
              <th className="px-6 py-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-700 uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items?.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50/80 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {item.name}
                </td>
                <td className="px-6 py-4 text-gray-500 max-w-md truncate">
                  {item.description || (
                    <span className="text-gray-300 italic">No description</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => openEditModal(item.id)}
                      className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                      title="Edit Item"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      disabled={deleteItem.isPending}
                      onClick={() => deleteItem.mutate(item.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
                      title="Delete Item"
                    >
                      {deleteItem.isPending ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <Trash2 size={18} />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items?.length === 0 && (
          <div className="py-12 text-center text-gray-400">
            No items found. Click "New Item" to start.
          </div>
        )}
      </div>

      {isModalOpen && <ItemForm />}
    </div>
  );
}
