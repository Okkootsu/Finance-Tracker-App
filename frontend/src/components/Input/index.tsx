import { cn } from "@/utils/cn";
import type React from "react";

type InputVariant = "auth" | "modal";

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
  const baseStyles = "bg-white rounded py-1 px-3 border-2 focus:bg-gray-100 ";

  const variants = {
    auth: "bg-blue-50/30 border-slate-500/80 text-white focus:bg-blue-50/30 outline-none focus:ring-2 focus:ring-gray-700/60",
    modal: `border-2 border-slate-300 rounded-lg 
      [color-scheme:light] 
      [&::-webkit-calendar-picker-indicator]:cursor-pointer 
      [&::-webkit-calendar-picker-indicator]:opacity-50 
      hover:[&::-webkit-calendar-picker-indicator]:opacity-100
      [&::-webkit-calendar-picker-indicator]:transition-opacity`,
  };

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={label}
        className={cn(
          "font-bold text-sm text-[#e9ecf0]",
          variant === "modal"
            ? "text-slate-700 font-semibold"
            : "text-[#e9ecf0]",
        )}
      >
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
