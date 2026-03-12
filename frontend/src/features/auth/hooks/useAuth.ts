import { useAuthStore } from "@/stores/authStore";
import { useUserStore, type User } from "@/stores/userStore";
import api from "@/utils/axios";
import { validateLoginForm, validateRegisterForm } from "@/utils/validators";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useNavigate } from "react-router";

export type FormInputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type MyJwtPayload = {
  sub: string;
  email: string;
};

export const useAuth = () => {
  const INITIAL_FORM_STATE = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const selectedForm = useAuthStore((state) => state.selectedForm);
  const setSelectedForm = useAuthStore((state) => state.setSelectedForm);
  const setUser = useUserStore((state) => state.setUser);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formInputs, setFormInputs] = useState<FormInputs>(INITIAL_FORM_STATE);

  const navigate = useNavigate();

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

  const handleRegister = async () => {
    const validation = validateRegisterForm(formInputs);

    if (!validation.isValid) {
      alert(validation.errorMessage);
      return;
    }

    try {
      await api.post("/Auth/register", formInputs);
      setFormInputs(INITIAL_FORM_STATE);

      alert("Successfully signed up, now you can sign in");

      setSelectedForm("login");
    } catch (err) {
      setFormInputs(INITIAL_FORM_STATE);

      if (axios.isAxiosError(err) && err.response) {
        const backendErrorMessage =
          err.response.data.errorMessage || "An unknown error occured";

        alert(backendErrorMessage);
      } else {
        alert("Server connection failed");
      }
    }
  };

  const createUser = (token: string) => {
    const decodedToken = jwtDecode<MyJwtPayload>(token);

    const newUser: User = {
      id: parseInt(decodedToken.sub),
      email: decodedToken.email,
    };

    setUser(newUser);
  };

  const handleLogin = async () => {
    const validation = validateLoginForm(formInputs);

    if (!validation.isValid) {
      alert(validation.errorMessage);
      return;
    }

    try {
      const response = await api.post("/Auth/login", formInputs);

      setFormInputs(INITIAL_FORM_STATE);

      const token = response.data.data.token;
      localStorage.setItem("token", token);
      createUser(token);

      navigate("/");
    } catch (err) {
      setFormInputs(INITIAL_FORM_STATE);

      if (axios.isAxiosError(err) && err.response) {
        const backendErrorMessage =
          err.response.data.errorMessage || "An unknown error occured";

        alert(backendErrorMessage);
      } else {
        alert("Server connection failed");
      }
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("token");
    setUser(null);

    window.location.href = "/";
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
