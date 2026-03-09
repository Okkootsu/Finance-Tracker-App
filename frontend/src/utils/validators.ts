import { type FormInputs } from "@/features/auth/hooks/useAuth";

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
