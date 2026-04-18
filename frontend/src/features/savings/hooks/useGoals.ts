import { useCategories } from "@/features/categories/hooks/useCategories";
import { useWallet } from "@/hooks/useWallet";
import { useGoalStore } from "@/stores/goalStore";
import {
  useTransactionStore,
  type Transaction,
} from "@/stores/transactionStore";
import api from "@/utils/axios";
import { validateGoalForm } from "@/utils/validators";
import axios from "axios";
import { endOfDay, format, isWithinInterval, startOfDay } from "date-fns";
import { useEffect, useMemo, useState } from "react";

export type GoalForm = {
  name: string;
  category: string;
  targetAmount: number;
  desiredFinish?: string;
};

const INITIAL_FORM: GoalForm = {
  name: "",
  category: "",
  targetAmount: 0,
  desiredFinish: undefined,
};

export const useGoals = () => {
  const goals = useGoalStore((state) => state.goals);
  const setGoals = useGoalStore((state) => state.setGoals);
  const addGoal = useGoalStore((state) => state.addGoal);
  const filterRange = useGoalStore((state) => state.filterRange);
  const setFilterRange = useGoalStore((state) => state.setFilterRange);
  const currentGoal = useGoalStore((state) => state.currentGoal);
  const setCurrentGoal = useGoalStore((state) => state.setCurrentGoal);
  const selectedGoals = useGoalStore((state) => state.selectedGoals);
  const setSelectedGoals = useGoalStore((state) => state.setSelectedGoals);
  const addToSelectedGoals = useGoalStore((state) => state.addToSelectedGoals);
  const updateGoalSavings = useGoalStore((state) => state.updateGoalSavings);
  const startDate = useGoalStore((state) => state.startDate);
  const endDate = useGoalStore((state) => state.endDate);

  const transactions = useTransactionStore((state) => state.transactions);
  const addTransaction = useTransactionStore((state) => state.addTransaction);

  const { categories } = useCategories();
  const { netWorth } = useWallet();

  const [goalForm, setGoalForm] = useState<GoalForm>(INITIAL_FORM);
  const [openDialog, setOpenDialog] = useState<"goal" | "saving" | null>(null);
  const [savingAmount, setSavingAmount] = useState<number>(0);

  useEffect(() => {
    if (goals.length === 0) {
      fetchGoals();
    }
  }, []);

  useEffect(() => {
    if (categories && categories.length > 0 && !goalForm.category) {
      setGoalForm((prev) => ({
        ...prev,
        category: categories[0].name,
      }));
    }
  }, [categories]);

  const handleDialogClose = () => {
    setOpenDialog(null);
  };

  const fetchGoals = async () => {
    try {
      const response = await api.get("/Goal/get-all");
      const data = response.data.data.goals;
      setGoals(data);

      if (data && data.length > 0 && !currentGoal) {
        setCurrentGoal(data[0]);
      }
    } catch (err) {
      handleApiError(err);
    }
  };

  const filteredGoals = useMemo(() => {
    if (!filterRange) return goals;

    return goals.filter((go) => {
      const startDate = new Date(go.startTime);

      const startResult = isWithinInterval(startDate, {
        start: startOfDay(filterRange.start),
        end: endOfDay(filterRange.end),
      });

      let endResult = false;
      if (go.desiredFinish) {
        const endDate = new Date(go.desiredFinish);

        endResult = isWithinInterval(endDate, {
          start: startOfDay(filterRange.start),
          end: endOfDay(filterRange.end),
        });
      }

      return startResult || endResult;
    });
  }, [goals, filterRange]);

  const filteredTransactions = useMemo(() => {
    if (!filterRange) return transactions;

    return transactions.filter((ta) => {
      return isWithinInterval(new Date(ta.time), {
        start: startOfDay(filterRange.start),
        end: endOfDay(filterRange.end),
      });
    });
  }, [transactions, filterRange]);

  const { topIncomes, topExpenses } = useMemo(() => {
    let incomeTransactions: Transaction[] = [];
    let expenseTransactions: Transaction[] = [];

    filteredTransactions.forEach((ta) => {
      if (ta.amount > 0) {
        incomeTransactions.push(ta);
      } else {
        expenseTransactions.push(ta);
      }
    });

    const topIncomes = incomeTransactions
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 3);

    const topExpenses = expenseTransactions
      .sort((a, b) => a.amount - b.amount)
      .slice(0, 3);

    return { topIncomes, topExpenses };
  }, [filteredTransactions]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setGoalForm((prev) => ({
      ...prev,
      [name]: name === "targetAmount" ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    const validation = validateGoalForm(goalForm);

    if (!validation.isValid) {
      alert(validation.errorMessage);
      return;
    }

    try {
      const response = await api.post("/Goal/create", goalForm);
      const data = response.data.data;

      addGoal(data);
      setOpenDialog(null);
      alert("Goal added");
      setGoalForm(INITIAL_FORM);
    } catch (err) {
      handleApiError(err);
    }
  };

  const handleGoalClick = (id: number) => {
    // if already selected remove from list otherwise add to the list
    addToSelectedGoals(id);
  };

  const handleDeleteGoals = async () => {
    if (selectedGoals.length === 0) {
      alert("Please select at least one goal before deleting");
      return;
    }

    try {
      await api.post("/Goal/delete-range", {
        goals: selectedGoals,
      });

      const updatedGoals = goals.filter((t) => !selectedGoals.includes(t.id));

      setGoals(updatedGoals);
      setSelectedGoals([]);
    } catch (err) {
      handleApiError(err);
    }
  };

  const handleSelectAll = () => {
    setSelectedGoals(
      selectedGoals.length === goals.length ? [] : goals.map((val) => val.id),
    );
  };

  const handleCurrentGoalChange = () => {
    if (selectedGoals.length !== 1) {
      alert("Please select exactly one goal to set as main");
      return;
    }
    const selected = goals.find((g) => g.id === selectedGoals[0]);
    if (selected) setCurrentGoal(selected);
  };

  const handleAddSaving = async () => {
    if (savingAmount <= 0) {
      alert("You cannot add negative numbers or zero as savings");
      return;
    }

    if (netWorth < savingAmount) {
      alert("Insufficient funds to perform this operation");
      return;
    }

    try {
      await api.post("/Goal/add-saving", {
        id: selectedGoals[0],
        amountToAdd: savingAmount,
      });

      updateGoalSavings(selectedGoals[0], savingAmount);

      const selectedGoal = goals.find((g) => g.id === selectedGoals[0]);

      addTransaction({
        id: Date.now(),
        name: `Transfer to ${selectedGoal?.name}`,
        category: "Goal Transfer",
        amount: -Math.abs(savingAmount),
        time: new Date().toISOString(),
      });

      setSavingAmount(0);
      setOpenDialog(null);
      alert("Saving added successfully!");
    } catch (err) {
      handleApiError(err);
    }
  };

  const handleAddSavingModal = () => {
    if (selectedGoals.length > 1) {
      alert("Please select only one goal to add money");
      return;
    }

    setOpenDialog("saving");
  };

  const formatTime = (time: string) => {
    if (!time) return "-";

    return format(new Date(time), "d MMMM yyyy");
  };

  const handleSavingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSavingAmount(Number(e.target.value));
  };

  const handleApiError = (err: unknown) => {
    if (axios.isAxiosError(err) && err.response) {
      alert(err.response.data.errorMessage || "An unknown error occurred");
    } else {
      alert("Server connection failed");
    }
  };

  return {
    handleChange,
    handleSubmit,
    openDialog,
    setOpenDialog,
    handleGoalClick,
    selectedGoals,
    handleSelectAll,
    handleDeleteGoals,
    formatTime,
    setFilterRange,
    filteredGoals,
    handleCurrentGoalChange,
    currentGoal,
    handleSavingChange,
    handleAddSaving,
    filteredTransactions,
    topIncomes,
    topExpenses,
    handleAddSavingModal,
    startDate,
    endDate,
    handleDialogClose,
  };
};
