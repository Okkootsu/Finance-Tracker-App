import type { Category } from "@/features/categories/hooks/useCategories";
import { cn } from "@/utils/cn";
import { ChevronDown } from "lucide-react";

type ComboboxProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: Category[];
  className?: string;
};

export const Combobox = ({
  options = [],
  className,
  ...props
}: ComboboxProps) => {
  return (
    <div className={cn("relative", className)}>
      <select
        value={options[0]?.name}
        className={`appearance-none 
          w-full
          h-full
          px-4 py-2.5 
          pr-10 
          text-slate-700
          font-medium
          bg-white
          border border-slate-300 
          rounded-lg
          shadow-sm
          transition-all duration-200 ease-in-out
          hover:border-slate-400
          hover:shadow-md
          focus:outline-none
          focus:border-blue-500
          focus:ring-4 focus:ring-blue-500/10
          cursor-pointer
          `}
        {...props}
      >
        {options.map((option, index) => (
          <option
            key={index}
            value={option?.name}
            className="text-slate-700 font-medium bg-white py-1"
          >
            {option?.name}
          </option>
        ))}
      </select>

      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
        <ChevronDown />
      </div>
    </div>
  );
};
