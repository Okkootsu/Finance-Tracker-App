import { Button } from "@/components/Button";
import { BookPlus, ChevronDown, Plus } from "lucide-react";
import { Transaction } from "./Transaction";
import { DatePicker } from "@/components/DatePicker";
import { useState } from "react";
import { cn } from "@/utils/cn";
import { useTransactions } from "../hooks/useTransactions";
import { Dialog } from "@/components/Dialog";
import { CreateTransactionModal } from "./CreateTransactionModal";
import { CreateCategoryModal } from "./CreateCategoryModal";

export const Transactions = () => {
  const [open, setOpen] = useState<boolean>(true);

  const { transactions, openDialog, setOpenDialog } = useTransactions();

  return (
    <div className=" flex flex-col gap-1 ">
      <div className="flex relative items-center gap-3 ">
        <h1 className="font-bold text-xl text-slate-900">Transactions</h1>
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
        <div className="overflow-hidden">
          <div
            className={`bg-white border flex flex-col rounded-2xl min-h-60 shadow-xl shadow-slate-100 border-slate-300 transition-all
               hover:shadow-2xl hover:shadow-slate-200 duration-300 mt-2`}
          >
            <div className=" border-b border-slate-300 flex  px-2 py-1 items-center justify-between">
              <DatePicker />
              <div className="flex items-center gap-8">
                <Button
                  onClick={() => setOpenDialog("category")}
                  className="gap-3 w-fit h-fit bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg text-white border-blue-300 text-sm"
                >
                  ADD NEW CATEGORY
                  <BookPlus />
                </Button>
                <Button
                  onClick={() => setOpenDialog("transaction")}
                  className="gap-3 w-fit h-fit bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg text-white border-blue-300 text-sm"
                >
                  ADD NEW TRANSACTION
                  <Plus />
                </Button>
              </div>

              <Dialog
                title="Add New Transaction"
                isOpen={openDialog === "transaction"}
                onClose={() => setOpenDialog(null)}
              >
                <CreateTransactionModal />
              </Dialog>

              <Dialog
                title="Add New Category"
                isOpen={openDialog === "category"}
                onClose={() => setOpenDialog(null)}
              >
                <CreateCategoryModal />
              </Dialog>
            </div>
            <div className=" flex-1 p-3 gap-2 flex flex-col">
              {transactions.map((ta, index) => (
                <Transaction
                  key={`ta-${index}`}
                  amount={ta.amount}
                  category={ta.category}
                  name={ta.name}
                  time={ta.time}
                  description={ta.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
