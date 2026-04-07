import { useEffect } from "react";
import { useTransactionStore } from "@/stores/transactionStore";
import api from "@/utils/axios";
import axios from "axios";

export const useInitializeApp = () => {
  const setTransactions = useTransactionStore((state) => state.setTransactions);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
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
};
