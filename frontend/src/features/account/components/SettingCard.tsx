import { Button } from "@/components/Button";
import { cn } from "@/utils/cn";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

type SettingCardProps = {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
};

export const SettingCard = ({ title, icon, children }: SettingCardProps) => {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between">
        <div className="flex relative gap-3 items-center">
          <h1 className="font-bold text-xl flex items-center gap-2">
            {icon}
            {title}
          </h1>
          <Button
            variant="iconOutline"
            icon={
              <ChevronDown
                className={cn(
                  "transition-transform duration-300 text-slate-600",
                  open ? "rotate-180" : "rotate-0",
                )}
              />
            }
            onClick={() => setOpen(!open)}
          />
        </div>
      </div>

      <div
        className={cn(
          "grid transition-all duration-500 ease-in-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className={cn(open ? "overflow-visible" : "overflow-hidden")}>
          <div className="bg-white border rounded-2xl shadow-sm border-slate-300 transition-all hover:shadow-md duration-300 mt-2 p-6 flex flex-col">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
