import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { X } from "lucide-react";
import { useCategories } from "../hooks/useCategories";

type CreateCategoryModalProps = {
  onClose?: () => void;
};

export const CreateCategoryModal = ({ onClose }: CreateCategoryModalProps) => {
  const {
    categories,
    categoryName,
    setCategoryName,
    selectedEmoji,
    setSelectedEmoji,
    handleCreateCategory,
    handleDeleteCategory,
    EMOJI_LIST,
  } = useCategories();

  return (
    <div className="flex flex-col p-8 w-125 bg-slate-50 rounded-2xl shadow-2xl border border-slate-100 font-sans max-h-[75vh] overflow-y-auto">
      <div className="flex flex-col gap-5 p-5 bg-white border border-slate-200 rounded-xl shadow-sm mb-6">
        <Input
          label="Category Name"
          variant="modal"
          placeholder="e.g. Gaming, Groceries..."
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />

        {/* Emoji Selector */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm text-slate-700">
            Select Icon
          </label>
          <div className="grid grid-cols-6 gap-2">
            {EMOJI_LIST.map((emoji) => (
              <button
                key={emoji}
                onClick={() => setSelectedEmoji(emoji)}
                className={`flex items-center justify-center text-2xl h-12 w-full rounded-lg transition-all duration-200 ease-in-out cursor-pointer
                  ${
                    selectedEmoji === emoji
                      ? "bg-blue-50 border-2 border-blue-500 shadow-inner scale-105"
                      : "bg-slate-50 border border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                  }
                `}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Existing Categories */}
      <div className="flex flex-col gap-3">
        <h3 className="font-semibold text-slate-800 text-sm">
          Your Categories
        </h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className={`flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-full shadow-sm text-sm font-medium
                 text-slate-700 group cursor-default hover:border-slate-300 transition-colors`}
            >
              <span className="text-base">{cat.icon}</span>
              <span>{cat.name}</span>

              <button
                onClick={() => handleDeleteCategory(cat.id)}
                className="ml-1 text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 mt-8 pt-5 border-t border-slate-200">
        <Button
          onClick={onClose}
          variant="secondary"
          className="w-fit bg-white border-slate-300 text-slate-700 hover:bg-slate-100 shadow-sm"
        >
          Close
        </Button>
        <Button
          onClick={handleCreateCategory}
          variant="secondary"
          className={`w-fit bg-blue-600 border-transparent text-white hover:bg-blue-700 active:bg-blue-800
             shadow-sm disabled:opacity-50 disabled:cursor-not-allowed`}
          disabled={!categoryName.trim()}
        >
          Add Category
        </Button>
      </div>
    </div>
  );
};
