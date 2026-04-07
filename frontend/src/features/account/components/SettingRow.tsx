import { cn } from "@/utils/cn";

type SettingRowProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  isLast?: boolean; 
};

export const SettingRow = ({
  title,
  description,
  children,
  isLast = false,
}: SettingRowProps) => (
  <div
    className={cn(
      "flex flex-col sm:flex-row sm:items-center justify-between py-5 gap-4",
      !isLast && "border-b border-slate-200",
    )}
  >
    <div className="flex flex-col gap-1 sm:w-1/2">
      <span className="font-bold text-slate-800">{title}</span>
      {description && (
        <span className="text-sm text-slate-500">{description}</span>
      )}
    </div>
    <div className="sm:w-1/2 flex sm:justify-end">{children}</div>
  </div>
);
