import { handleApiError } from "@/utils/apiFormatter";
import api from "@/utils/axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export type Category = {
  id: number;
  name: string;
  icon: string;
};

export const useCategories = () => {
  const EMOJI_LIST = [
    "💵",
    "🍔",
    "🚕",
    "✈️",
    "🎬",
    "💻",
    "📱",
    "🏥",
    "💊",
    "🎓",
    "🎮",
    "⚽",
    "👗",
    "🏠",
    "💡",
    "💧",
    "🔥",
    "🎁",
  ];

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedEmoji, setSelectedEmoji] = useState<string>("💵");
  const [categoryName, setCategoryName] = useState("");

  const { t } = useTranslation()

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get("/Category/get-all");
      const data = response.data.data.categories;

      setCategories(data);
    } catch (err) {
      handleApiError(err);
    }
  };

  const handleCreateCategory = async () => {
    if (!categoryName || !selectedEmoji) {
      toast.error(t("toast.error.emptyCategory"));
      return;
    }

    try {
      const response = await api.post("/Category/create", {
        name: categoryName,
        icon: selectedEmoji,
      });
      const data = response.data.data;

      setCategories((prev) => [...prev, data]);
    } catch (err) {
      handleApiError(err);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      await api.delete(`/Category/${id}`);

      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      handleApiError(err);
    }
  };

  const findIcon = (category: string) => {
    if (!categories) {
      return "💵";
    }

    const matchedCategory = categories.find((c) => c.name === category);
    return matchedCategory?.icon || "💵";
  };

  return {
    categories,
    categoryName,
    setCategoryName,
    selectedEmoji,
    setSelectedEmoji,
    handleCreateCategory,
    handleDeleteCategory,
    findIcon,
    EMOJI_LIST,
  };
};
