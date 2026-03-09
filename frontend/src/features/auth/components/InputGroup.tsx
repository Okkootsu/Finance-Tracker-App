import { Input } from "@/components/Input";

type InputGroupProps = {
  variant?: "register" | "login";
};

export const InputGroup = ({ variant = "register" }: InputGroupProps) => {
  return (
    <div className="flex flex-col gap-1 mb-3">
      <Input label="E-mail" type="email" />
      <Input label="Password" type="password" />
      {variant === "register" && <Input label="Password (Again)" type="password" />}
    </div>
  );
};
