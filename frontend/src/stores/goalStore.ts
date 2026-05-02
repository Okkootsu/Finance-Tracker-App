import { create } from "zustand";
import type { Range } from "./transactionStore";

export type Goal = {
  id: number;
  name: string;
  category: string;
  savedAmount: number;
  targetAmount: number;
  startTime: string;
  desiredFinish?: string;
};

type GoalStore = {
  goals: Goal[];
  selectedGoals: number[];
  filterRange: Range | null;
  currentGoal: Goal | null;
  startDate: Date;
  endDate: Date;

  setGoals: (goals: Goal[]) => void;
  addGoal: (goal: Goal) => void;

  setFilterRange: (obj: Range) => void;

  setCurrentGoal: (goal: Goal) => void;

  updateGoalSavings: (id: number, addedAmount: number) => void;

  setSelectedGoals: (selectedGoals: number[]) => void;
  addToSelectedGoals: (id: number) => void;
};

export const useGoalStore = create<GoalStore>((set) => ({
  goals: [],
  selectedGoals: [],
  filterRange: null,
  currentGoal: null,
  startDate: new Date(),
  endDate: new Date(),

  setGoals: (goals) => set({ goals: goals }),
  addGoal: (goal) => set((state) => ({ goals: [goal, ...state.goals] })),

  setFilterRange: (obj) =>
    set({ filterRange: obj, startDate: obj.start, endDate: obj.end }),

  setCurrentGoal: (goal) => set({ currentGoal: goal }),

  updateGoalSavings: (id, addedAmount) =>
    set((state) => ({
      goals: state.goals.map((g) =>
        g.id === id ? { ...g, savedAmount: g.savedAmount + addedAmount } : g,
      ),

      currentGoal:
        state.currentGoal?.id === id
          ? {
              ...state.currentGoal,
              savedAmount: state.currentGoal.savedAmount + addedAmount,
            }
          : state.currentGoal,
    })),

  setSelectedGoals: (selectedGoals) => set({ selectedGoals: selectedGoals }),

  addToSelectedGoals: (id) =>
    set((state) => ({
      selectedGoals: state.selectedGoals.includes(id)
        ? state.selectedGoals.filter((t) => t !== id)
        : [...state.selectedGoals, id],
    })),
}));
