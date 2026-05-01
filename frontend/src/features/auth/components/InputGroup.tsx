import { Input } from "@/components/Input";
import type { FormInputs } from "../hooks/useAuth";
import { useTranslation } from "react-i18next";

type InputGroupProps = {
  variant?: "register" | "login";
  showPassword: boolean;
  formInputs: FormInputs;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputGroup = ({
  variant = "register",
  formInputs,
  showPassword,
  onChange,
}: InputGroupProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-1 mb-3">
      <Input
        onChange={onChange}
        value={formInputs.email}
        name="email"
        label={t("auth.email")}
        type="email"
      />
      <Input
        onChange={onChange}
        value={formInputs.password}
        name="password"
        label={t("auth.password")}
        type={showPassword ? "text" : "password"}
      />
      {variant === "register" && (
        <Input
          onChange={onChange}
          value={formInputs.confirmPassword}
          name="confirmPassword"
          label={t("auth.confirm")}
          type={showPassword ? "text" : "password"}
        />
      )}
    </div>
  );
};
