import { useCategories } from "@/features/categories/hooks/useCategories";
import { useWallet } from "@/hooks/useWallet";
import { useGoalStore } from "@/stores/goalStore";
import {
  useTransactionStore,
  type Transaction,
} from "@/stores/transactionStore";
import { handleApiError } from "@/utils/apiFormatter";
import api from "@/utils/axios";
import { validateGoalForm } from "@/utils/validators";
import { endOfDay, isWithinInterval, startOfDay } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

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

  const { t } = useTranslation();

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
      toast.error(validation.errorMessage);
      return;
    }

    try {
      const response = await api.post("/Goal/create", {
        ...goalForm,
        desiredFinish: goalForm.desiredFinish || null,
      });
      const data = response.data.data;

      addGoal(data);
      setOpenDialog(null);
      toast.success(t("toast.success.goal"));
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
      toast.error(t("toast.error.deleteGoal"));
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
      toast.error(t("toast.error.selectMain"));
      return;
    }
    const selected = goals.find((g) => g.id === selectedGoals[0]);
    if (selected) setCurrentGoal(selected);
  };

  const handleAddSaving = async () => {
    if (savingAmount <= 0) {
      toast.error(t("toast.error.invalidSaving"));
      return;
    }

    if (netWorth < savingAmount) {
      toast.error(t("toast.error.insufficientFunds"));
      return;
    }

    try {
      const response = await api.post("/Goal/add-saving", {
        id: selectedGoals[0],
        amountToAdd: savingAmount,
      });

      const data = response.data.data;
      updateGoalSavings(selectedGoals[0], data.savedAmount);

      addTransaction(data.transaction);

      setSavingAmount(0);
      setOpenDialog(null);
      toast.success(t("toast.success.saving"));
    } catch (err) {
      handleApiError(err);
    }
  };

  const handleAddSavingModal = () => {
    if (selectedGoals.length > 1) {
      toast.error(t("toast.error.selectGoal"));
      return;
    }

    setOpenDialog("saving");
  };

  const handleSavingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSavingAmount(Number(e.target.value));
  };

  const handleDialogClose = () => {
    setOpenDialog(null);
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
