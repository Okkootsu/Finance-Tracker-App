import api from "@/utils/axios";
import axios from "axios";
import { useEffect, useState } from "react";

type Transaction = {
  name: string;
  category: string;
  description?: string;
  amount: number;
  time: string;
};

type Dialog = "transaction" | "category" | null;

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [openDialog, setOpenDialog] = useState<Dialog>(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await api.get("/Transaction/get-all");
      const data = response.data.data.transactions;

      setTransactions(data);
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

  return {
    transactions,
    openDialog,
    setOpenDialog,
  };
};
