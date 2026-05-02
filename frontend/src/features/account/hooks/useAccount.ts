import { useAuthStore } from "@/stores/authStore";
import { useSettingsStore, type Currency } from "@/stores/settingsStore";
import { handleApiError } from "@/utils/apiFormatter";
import { createUser } from "@/utils/auth";
import api from "@/utils/axios";
import i18n from "@/utils/i18n";
import { isValidMail } from "@/utils/validators";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
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
  const currency = useSettingsStore((state) => state.currency);
  const setCurrency = useSettingsStore((state) => state.setCurrency);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [form, setForm] = useState<ChangePasswordForm>(INITIAL_STATE);
  const [openDialog, setOpenDialog] = useState<
    "changePassword" | "deleteAccount" | null
  >(null);
  const [email, setEmail] = useState<string>(userEmail);

  const navigate = useNavigate();

  const { t } = useTranslation()

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
      toast.error(t("toast.error.noPassword"));
      return;
    }

    try {
      await api.post("/Account/change-password", form);

      toast.success(t("toast.success.passwordUpdate"));
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
      toast.error(t("toast.error.notValid"));
      return;
    }

    try {
      const response = await api.post("/Account/update-info", { email });

      const token = response.data.data.accessToken;
      const user = createUser(token);

      setEmail(user.email);
      setAuth(token, user);

      toast.success(t("toast.success.emailUpdated"));
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

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value as Currency);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

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
    handleLanguageChange,
  };
};
