import { useCategories } from "@/features/categories/hooks/useCategories";
import { useTransactionStore } from "@/stores/transactionStore";
import api from "@/utils/axios";
import { validateTransactionForm } from "@/utils/validators";
import axios from "axios";
import { endOfDay, format, isWithinInterval, startOfDay } from "date-fns";
import { useEffect, useMemo, useState } from "react";

type Dialog = "transaction" | "category" | null;

export type TransactionForm = {
  name: string;
  category: string;
  description?: string;
  amount: number;
  time: string;
};

export const useTransactions = () => {
  const INITIAL_FORM = {
    name: "",
    category: "",
    description: "",
    amount: 0,
    time: "",
  };

  const transactions = useTransactionStore((state) => state.transactions);
  const setTransactions = useTransactionStore((state) => state.setTransactions);
  const addTransaction = useTransactionStore((state) => state.addTransaction);
  const filterRange = useTransactionStore((state) => state.filterRange);
  const setFilterRange = useTransactionStore((state) => state.setFilterRange);
  const startDate = useTransactionStore((state) => state.startDate);
  const endDate = useTransactionStore((state) => state.endDate);

  const { categories } = useCategories();

  const [transactionForm, setTransactionForm] =
    useState<TransactionForm>(INITIAL_FORM);
  const [openDialog, setOpenDialog] = useState<Dialog>(null);
  const [selectedTransactions, setSelectedTransactions] = useState<number[]>(
    [],
  );

  useEffect(() => {
    fetchTransactions();

    if (categories && categories.length > 0 && !transactionForm.category) {
      setTransactionForm((prev) => ({
        ...prev,
        category: categories[0].name,
      }));
    }
  }, [categories]);

  const filteredTransactions = useMemo(() => {
    if (!filterRange) return transactions;

    return transactions.filter((ta) => {
      const transactionDate = new Date(ta.time);

      return isWithinInterval(transactionDate, {
        start: startOfDay(filterRange.start),
        end: endOfDay(filterRange.end),
      });
    });
  }, [transactions, filterRange]);

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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setTransactionForm((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    const validation = validateTransactionForm(transactionForm);

    if (!validation.isValid) {
      alert(validation.errorMessage);
      return;
    }

    try {
      const response = await api.post("/Transaction/create", transactionForm);
      const data = response.data.data;

      addTransaction(data);
      alert("Transaction added");
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

  const formatTime = (time: string) => {
    return format(new Date(time), "d MMMM yyyy HH:mm");
  };

  const handleTransactionClick = (id: number) => {
    const isExists = selectedTransactions.find((t) => t === id);

    if (isExists) {
      const newList = selectedTransactions.filter((t) => t !== id);
      setSelectedTransactions(newList);
    } else {
      setSelectedTransactions((prev) => [...prev, id]);
    }
  };

  const handleDeleteTransactions = async () => {
    if (selectedTransactions.length === 0) {
      alert("Please select at least one transaction before deleting");
      return;
    }

    try {
      await api.post("/Transaction/delete-range", {
        transactions: selectedTransactions,
      });

      const updatedTransactions = transactions.filter(
        (t) => !selectedTransactions.includes(t.id),
      );

      setTransactions(updatedTransactions);
      setSelectedTransactions([]);
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

  const handleSelectAll = () => {
    if (selectedTransactions.length === transactions.length) {
      setSelectedTransactions([]);
    } else {
      let tempList: number[] = [];

      transactions.forEach((val) => {
        tempList.push(val.id);
      });

      setSelectedTransactions(tempList);
    }
  };

  const chartData = useMemo(() => {
    const incomesMap: Record<string, number> = {};
    const spendingsMap: Record<string, number> = {};

    filteredTransactions.forEach((ta) => {
      if (ta.amount > 0) {
        incomesMap[ta.category] = (incomesMap[ta.category] || 0) + ta.amount;
      } else if (ta.amount < 0) {
        spendingsMap[ta.category] =
          (spendingsMap[ta.category] || 0) + Math.abs(ta.amount);
      }
    });

    const incomeData = Object.keys(incomesMap).map((key) => ({
      name: key,
      value: incomesMap[key],
    }));

    const spendingData = Object.keys(spendingsMap).map((key) => ({
      name: key,
      value: spendingsMap[key],
    }));

    return { incomeData, spendingData };
  }, [filteredTransactions]);

  const handleDialogClose = () => {
    setOpenDialog(null);
  };

  return {
    openDialog,
    setOpenDialog,
    handleChange,
    handleSubmit,
    formatTime,
    handleTransactionClick,
    selectedTransactions,
    handleDeleteTransactions,
    handleSelectAll,
    filteredTransactions,
    setFilterRange,
    chartData,
    transactions,
    startDate,
    endDate,
    handleDialogClose,
  };
};
