import { type FormInputs } from "@/features/auth/hooks/useAuth";
import type { GoalForm } from "@/features/savings/hooks/useGoals";
import type { TransactionForm } from "@/features/transactions/hooks/useTransactions";
import { isBefore, parseISO, startOfToday } from "date-fns";

type validation = {
  isValid: boolean;
  errorMessage: string | null;
};

export const isValidMail = (email: string) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
};

export const validateRegisterForm = (form: FormInputs) => {
  const validation: validation = {
    isValid: true,
    errorMessage: null,
  };

  if (!form.email || !form.password) {
    validation.isValid = false;
    validation.errorMessage = "No field can be left blank";
    return validation;
  }

  if (form.password !== form.confirmPassword) {
    validation.isValid = false;
    validation.errorMessage = "Entered passwords do not match";
    return validation;
  }

  if (!isValidMail(form.email)) {
    validation.isValid = false;
    validation.errorMessage = "Please enter a valid e-mail";
    return validation;
  }

  return validation;
};

export const validateLoginForm = (form: FormInputs) => {
  const validation: validation = {
    isValid: true,
    errorMessage: null,
  };

  if (!form.email || !form.password) {
    validation.isValid = false;
    validation.errorMessage = "No field can be left blank";
    return validation;
  }

  if (!isValidMail(form.email)) {
    validation.isValid = false;
    validation.errorMessage = "Please enter a valid e-mail";
    return validation;
  }

  return validation;
};

export const validateTransactionForm = (form: TransactionForm) => {
  const validation: validation = {
    isValid: true,
    errorMessage: null,
  };

  if (!form.name || !form.category || !form.time || !form.amount) {
    validation.isValid = false;
    validation.errorMessage = "No field can be left blank";
    return validation;
  }

  return validation;
};

export const validateGoalForm = (form: GoalForm) => {
  const validation: validation = {
    isValid: true,
    errorMessage: null,
  };

  if (!form.name || !form.category || !form.targetAmount) {
    validation.isValid = false;
    validation.errorMessage = "No field can be left blank";
    return validation;
  }

  if (form.targetAmount <= 0) {
    validation.isValid = false;
    validation.errorMessage = "Target amount cannot be negative or zero";
    return validation;
  }

  if (form.desiredFinish) {
    if (isBefore(parseISO(form.desiredFinish), startOfToday())) {
      validation.isValid = false;
      validation.errorMessage = "Invalid date selected.";
      return validation;
    }
  }

  return validation;
};
