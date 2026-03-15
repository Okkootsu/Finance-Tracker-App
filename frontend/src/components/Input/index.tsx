import { cn } from "@/utils/cn";
import type React from "react";

type InputVariant = "auth";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  variant?: InputVariant;
};

export const Input = ({
  label,
  variant = "auth",
  type = "text",
  className,
  ...props
}: InputProps) => {
  const baseStyles =
    "bg-white rounded py-1 px-3 border-2 focus:bg-gray-100 border-border";

  const variants = {
    auth: "bg-blue-50/30 border-slate-500/80 text-white focus:bg-blue-50/30 outline-none focus:ring-2 focus:ring-gray-700/60",
  };

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={label} className="font-bold text-sm text-[#e9ecf0]">
        {label}
      </label>
      <input
        id={label}
        type={type}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      />
    </div>
  );
};
