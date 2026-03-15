import { Input } from "@/components/Input";
import type { FormInputs } from "../hooks/useAuth";

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
  return (
    <div className="flex flex-col gap-1 mb-3">
      <Input
        onChange={onChange}
        value={formInputs.email}
        name="email"
        label="E-mail"
        type="email"
      />
      <Input
        onChange={onChange}
        value={formInputs.password}
        name="password"
        label="Password"
        type={showPassword ? "text" : "password"}
      />
      {variant === "register" && (
        <Input
          onChange={onChange}
          value={formInputs.confirmPassword}
          name="confirmPassword"
          label="Password (Again)"
          type={showPassword ? "text" : "password"}
        />
      )}
    </div>
  );
};
