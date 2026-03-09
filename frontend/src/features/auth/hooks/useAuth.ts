import { useAuthStore } from "@/stores/authStore";
import { validateLoginForm, validateRegisterForm } from "@/utils/validators";
import { useState } from "react";

export type FormInputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const useAuth = () => {
  const INITIAL_FORM_STATE = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const selectedForm = useAuthStore((state) => state.selectedForm);
  const setSelectedForm = useAuthStore((state) => state.setSelectedForm);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formInputs, setFormInputs] = useState<FormInputs>(INITIAL_FORM_STATE);

  const handlePageSwitch = () => {
    setFormInputs(INITIAL_FORM_STATE);

    if (selectedForm === "login") {
      setSelectedForm("register");
    } else {
      setSelectedForm("login");
    }
  };

  const handleCheckboxClick = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = () => {
    const validation = validateRegisterForm(formInputs);

    if (!validation.isValid) {
      alert(validation.errorMessage);
      return;
    }

    console.log("Register");
    console.log(formInputs);
  };

  const handleLogin = () => {
    const validation = validateLoginForm(formInputs);

    if (!validation.isValid) {
      alert(validation.errorMessage);
      return;
    }

    console.log("Login");
    console.log(formInputs);
  };

  const handleSubmit = () => {
    if (selectedForm === "login") {
      handleLogin();
    } else {
      handleRegister();
    }
  };

  return {
    selectedForm,
    handlePageSwitch,
    handleCheckboxClick,
    showPassword,
    formInputs,
    handleInputChange,
    handleSubmit,
  };
};
