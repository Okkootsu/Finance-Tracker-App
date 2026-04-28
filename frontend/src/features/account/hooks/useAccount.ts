import { useAuthStore } from "@/stores/authStore";
import { useSettingsStore, type Currency } from "@/stores/settingsStore";
import { createUser } from "@/utils/auth";
import api from "@/utils/axios";
import { isValidMail } from "@/utils/validators";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

type ChangePasswordForm = {
  oldPassword: string;
  newPassword: string;
};

const INITIAL_STATE = {
  oldPassword: "",
  newPassword: "",
};

export const useAccount = () => {
  const userEmail = useAuthStore((state) => state.user!.email);
  const setAuth = useAuthStore((state) => state.setAuth);
  const logout = useAuthStore((state) => state.logout);
  const currency = useSettingsStore(state => state.currency);
  const setCurrency = useSettingsStore(state => state.setCurrency);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [form, setForm] = useState<ChangePasswordForm>(INITIAL_STATE);
  const [openDialog, setOpenDialog] = useState<
    "changePassword" | "deleteAccount" | null
  >(null);
  const [email, setEmail] = useState<string>(userEmail);

  const navigate = useNavigate();

  const handleDialogClose = () => {
    setOpenDialog(null);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmitPasswordChange = async () => {
    if (!form.oldPassword || !form.newPassword) {
      toast.error("Please enter a password to continue");
      return;
    }

    try {
      await api.post("/Account/change-password", form);

      toast.success("Your password has been updated");
      setOpenDialog(null);
    } catch (err) {
      handleApiError(err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmitInfoChange = async () => {
    if (!isValidMail(email)) {
      toast.error("Please enter a valid e-mail to continue");
      return;
    }

    try {
      const response = await api.post("/Account/update-info", { email });

      const token = response.data.data.accessToken;
      const user = createUser(token);

      setEmail(user.email);
      setAuth(token, user);

      toast.success("E-mail updated");
    } catch (err) {
      handleApiError(err);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await api.delete("/Account");
      logout();
      navigate("/auth");
    } catch (err) {
      handleApiError(err);
    }
  };

  const handleApiError = (err: unknown) => {
    if (axios.isAxiosError(err) && err.response) {
      alert(err.response.data.errorMessage || "An unknown error occurred");
    } else {
      alert("Server connection failed");
    }
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value as Currency)
  }

  return {
    handleFormChange,
    handleShowPassword,
    handleSubmitPasswordChange,
    openDialog,
    setOpenDialog,
    showPassword,
    handleInputChange,
    handleSubmitInfoChange,
    email,
    handleDeleteAccount,
    handleDialogClose,
    handleCurrencyChange,
    currency,
  };
};
