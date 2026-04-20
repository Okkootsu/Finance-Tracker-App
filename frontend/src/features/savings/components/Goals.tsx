import { Button } from "@/components/Button";
import { Dialog } from "@/components/Dialog";
import { cn } from "@/utils/cn";
import {
  ArrowDownNarrowWide,
  ChevronDown,
  CirclePlus,
  HandCoins,
  Plus,
  Target,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { Goal } from "./Goal";
import { CreateGoalModal } from "./CreateGoalModal";
import { useGoals } from "../hooks/useGoals";
import { AddSavingModal } from "./AddSavingModal";

export const Goals = () => {
  const [open, setOpen] = useState<boolean>(true);

  const {
    openDialog,
    setOpenDialog,
    filteredGoals,
    selectedGoals,
    handleGoalClick,
    handleSelectAll,
    handleDeleteGoals,
    handleCurrentGoalChange,
    handleAddSavingModal,
    handleDialogClose,
  } = useGoals();

  return (
    <div className=" flex flex-col gap-1 ">
      <div className="flex relative items-center gap-3 ">
        <h1 className="font-bold text-xl flex items-center gap-2 text-slate-900">
          <Target className="w-5 h-5 text-amber-500" />
          Goals
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
            <div className=" border-b border-slate-300 flex px-2 py-1 items-center gap-4">
              <div className="flex items-center py-2">
                <Button onClick={() => setOpenDialog("goal")}>
                  <Plus />
                  Add Goal
                </Button>
              </div>

              <div
                className={cn(
                  "grid transition-all duration-500 ease-in-out",
                  selectedGoals.length > 0
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0",
                )}
              >
                <div className="overflow-hidden">
                  <div className=" flex gap-4 items-center duration-300 transition-all">
                    <Button onClick={handleAddSavingModal}>
                      <HandCoins />
                      Add Money
                    </Button>

                    <Button onClick={handleCurrentGoalChange}>
                      <CirclePlus />
                      Select as Current Goal
                    </Button>

                    <Button onClick={handleSelectAll}>
                      <ArrowDownNarrowWide />
                      Select All
                    </Button>

                    <Button onClick={handleDeleteGoals} variant="primaryDanger">
                      <Trash2 />
                      Delete Goal
                    </Button>
                  </div>
                </div>
              </div>

              <Dialog
                title="Add New Goal"
                isOpen={openDialog === "goal"}
                onClose={handleDialogClose}
              >
                <CreateGoalModal onClose={handleDialogClose} />
              </Dialog>

              <Dialog
                title="Add New Saving"
                isOpen={openDialog === "saving"}
                onClose={handleDialogClose}
              >
                <AddSavingModal onClose={handleDialogClose} />
              </Dialog>
            </div>

            <div className=" flex-1 p-3 gap-2 flex flex-col ">
              {filteredGoals.map((goal) => (
                <Goal
                  key={`go-${goal.id}`}
                  name={goal.name}
                  category={goal.category}
                  startTime={goal.startTime}
                  endTime={goal.desiredFinish}
                  savedAmount={goal.savedAmount}
                  targetAmount={goal.targetAmount}
                  isActive={!!selectedGoals.find((g) => g === goal.id)}
                  onClick={() => handleGoalClick(goal.id)}
                />
              ))}

              {filteredGoals.length === 0 && (
                <div className="text-center font-bold text-xl py-10 text-slate-800">
                  No goals found for the selected date range.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
