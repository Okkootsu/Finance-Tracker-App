import { Button } from "@/components/Button";
import { Dialog } from "@/components/Dialog";
import { CreateTransactionModal } from "@/features/transactions/components/CreateTransactionModal";
import { useTransactions } from "@/features/transactions/hooks/useTransactions";
import { cn } from "@/utils/cn";
import { ArrowDownNarrowWide, ChevronDown, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Goal } from "./Goal";

export const Goals = () => {
  const [open, setOpen] = useState<boolean>(true);

  const { setOpenDialog, openDialog, selectedTransactions } = useTransactions();

  return (
    <div className=" flex flex-col gap-1 ">
      <div className="flex relative items-center gap-3 ">
        <h1 className="font-bold text-xl text-slate-900">Goals</h1>
        <Button
          className="bg-transparent border-0 w-fit rounded-full mt-1 h-fit p-2"
          icon={
            <ChevronDown
              className={cn(
                "transition-transform duration-300",
                open ? "rotate-180" : "rotate-0",
              )}
            />
          }
          onClick={() => setOpen(!open)}
        />
      </div>

      <div
        className={cn(
          "grid transition-all duration-500 ease-in-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className={cn(open ? "overflow-visible" : "overflow-hidden")}>
          <div
            className={`bg-white border flex flex-col rounded-2xl min-h-60 shadow-xl shadow-slate-100 border-slate-300 transition-all
               hover:shadow-2xl hover:shadow-slate-200 duration-300 mt-2`}
          >
            <div className=" border-b border-slate-300 flex px-2 py-1 items-center justify-between">
              <div className="flex items-center gap-4 py-2">
                <Button
                  onClick={() => setOpenDialog("transaction")}
                  className="gap-3 w-fit h-fit bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg text-white border-blue-300 text-sm"
                >
                  ADD GOAL
                  <Plus />
                </Button>
              </div>

              <div
                className={cn(
                  "grid transition-all duration-500 ease-in-out",
                  selectedTransactions.length > 0
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0",
                )}
              >
                <div className="overflow-hidden">
                  <div className=" flex gap-4 items-center duration-300 transition-all">
                    <Button className="gap-3 w-fit h-fit bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg text-white border-blue-300 text-sm">
                      SELECT ALL
                      <ArrowDownNarrowWide />
                    </Button>
                    <Button className="gap-3 w-fit h-fit bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-lg text-white border-transparent text-sm">
                      DELETE TRANSACTION
                      <Trash2 />
                    </Button>
                  </div>
                </div>
              </div>

              <Dialog
                title="Add New Transaction"
                isOpen={openDialog === "transaction"}
                onClose={() => setOpenDialog(null)}
              >
                <CreateTransactionModal />
              </Dialog>
            </div>

            <div className=" flex-1 p-3 gap-2 flex flex-col ">
              <Goal
                name="Deneme1"
                category="deneme"
                startTime="12 Nisan 2026"
                endTime="30 Nisan 2026"
                savedAmount={250}
                targetAmount={500}
              />
              <Goal
                name="Deneme2"
                category="deneme"
                startTime="12 Nisan 2026"
                endTime="30 Nisan 2026"
                savedAmount={750}
                targetAmount={1450}
              />
              <Goal
                name="Deneme3"
                category="deneme"
                startTime="12 Nisan 2026"
                endTime="30 Nisan 2026"
                savedAmount={1100}
                targetAmount={5685}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
