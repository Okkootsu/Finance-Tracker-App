import { cn } from "@/utils/cn";
import React from "react";

type ButtonVariant = "primary";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  icon?: React.ReactNode;
};

export const Button = ({
  className,
  variant = "primary",
  icon,
  children,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "flex justify-center items-center gap-4 px-4 py-2 rounded font-bold transition cursor-pointer";

  const variants = {
    primary:
      "w-full bg-white text-black border border-border hover:bg-gray-300 ",
  };

  return (
    <button className={cn(baseStyles, variants[variant], className)} {...props}>
      {icon && <span className="shrink-0">{icon}</span>}

      {children}
    </button>
  );
};
