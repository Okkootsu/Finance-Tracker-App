import api from "@/utils/axios";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get("/Category/get-all");
      const data = response.data.data.categories;

      setCategories(data);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const backendErrorMessage =
          err.response.data.errorMessage || "An unknown error occured";

        alert(backendErrorMessage);
      } else {
        alert("Server connection failed");
      }
    }
  };

  const handleCreateCategory = async () => {
    if (!categoryName || !selectedEmoji) {
      toast.error("Category Name or Icon cannot be empty");
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
      if (axios.isAxiosError(err) && err.response) {
        const backendErrorMessage =
          err.response.data.errorMessage || "An unknown error occured";

        alert(backendErrorMessage);
      } else {
        alert("Server connection failed");
      }
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      await api.delete(`/Category/${id}`);

      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const backendErrorMessage =
          err.response.data.errorMessage || "An unknown error occured";

        alert(backendErrorMessage);
      } else {
        alert("Server connection failed");
      }
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
