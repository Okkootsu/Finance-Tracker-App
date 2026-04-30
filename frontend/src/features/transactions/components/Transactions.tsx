import { Button } from "@/components/Button";
import {
  ArrowDownNarrowWide,
  ArrowLeftRight,
  BookPlus,
  ChevronDown,
  Plus,
  Trash2,
} from "lucide-react";
import { Transaction } from "./Transaction";
import { useState } from "react";
import { cn } from "@/utils/cn";
import { useTransactions } from "../hooks/useTransactions";
import { Dialog } from "@/components/Dialog";
import { CreateTransactionModal } from "./CreateTransactionModal";
import { CreateCategoryModal } from "../../categories/components/CreateCategoryModal";
import { useTranslation } from "react-i18next";

export const Transactions = () => {
  const [open, setOpen] = useState<boolean>(true);

  const {
    openDialog,
    setOpenDialog,
    handleTransactionClick,
    selectedTransactions,
    handleSelectAll,
    handleDeleteTransactions,
    filteredTransactions,
    handleDialogClose,
  } = useTransactions();

  const { t } = useTranslation();

  return (
    <div className=" flex flex-col gap-1 ">
      <div className="flex relative items-center gap-3 ">
        <h1 className="font-bold text-xl flex items-center gap-2">
          <ArrowLeftRight className="w-5 h-5 text-blue-500" /> 
          {t("transactions.data.title")}
        </h1>
        <Button
          variant="iconOutline"
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
                  onClick={() => setOpenDialog("category")}
                  variant="primary"
                >
                  <BookPlus />
                  {t("transactions.data.addCategory")}
                </Button>
                <Button
                  onClick={() => setOpenDialog("transaction")}
                  variant="primary"
                >
                  <Plus />
                  {t("transactions.data.addTransaction")}
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
                    <Button onClick={handleSelectAll} variant="primary">
                      <ArrowDownNarrowWide />
                      {t("transactions.data.select")}
                    </Button>
                    <Button
                      onClick={handleDeleteTransactions}
                      variant="primaryDanger"
                    >
                      <Trash2 />
                      {t("transactions.data.delete")}
                    </Button>
                  </div>
                </div>
              </div>

              <Dialog
                title={t("dialog.transaction.title")}
                isOpen={openDialog === "transaction"}
                onClose={handleDialogClose}
              >
                <CreateTransactionModal onClose={handleDialogClose} />
              </Dialog>

              <Dialog
                title={t("dialog.category.title")}
                isOpen={openDialog === "category"}
                onClose={handleDialogClose}
              >
                <CreateCategoryModal onClose={handleDialogClose} />
              </Dialog>
            </div>

            <div className=" flex-1 p-3 gap-2 flex flex-col ">
              {filteredTransactions.map((ta) => (
                <Transaction
                  onClick={() => handleTransactionClick(ta.id)}
                  key={ta.id}
                  amount={ta.amount}
                  category={ta.category}
                  name={ta.name}
                  time={ta.time}
                  description={ta.description}
                  isActive={!!selectedTransactions.find((t) => t === ta.id)}
                />
              ))}

              {filteredTransactions.length === 0 && (
                <div className="text-center font-bold text-xl py-10 text-slate-800">
                  {t("transactions.data.noTransaction")}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
