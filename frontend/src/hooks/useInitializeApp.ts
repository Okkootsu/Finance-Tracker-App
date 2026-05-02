import { useEffect, useState } from "react";
import { useTransactionStore } from "@/stores/transactionStore";
import api from "@/utils/axios";
import { handleApiError } from "@/utils/apiFormatter";


export const useInitializeApp = () => {
  const setTransactions = useTransactionStore((state) => state.setTransactions);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const response = await api.get("/Transaction/get-all");
      const data = response.data.data.transactions;

      setTransactions(data);
      setIsLoading(false);
    } catch (err) {
      handleApiError(err)
    }
  };

  return { isLoading };
};
