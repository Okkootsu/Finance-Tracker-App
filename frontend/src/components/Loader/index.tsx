import { Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";
import { useTranslation } from "react-i18next";

type LoaderProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
};

export const Loader = ({ className, size = "md", showText = false }: LoaderProps) => {
  const { t } = useTranslation();

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
      <Loader2 className={cn("animate-spin text-blue-600", sizeClasses[size])} />
      {showText && (
        <span className="text-slate-500 font-medium animate-pulse">
          {t("common.loading")}
        </span>
      )}
    </div>
  );
};