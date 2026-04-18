import { Button } from "@/components/Button";
import { Dialog } from "@/components/Dialog";
import { cn } from "@/utils/cn";
import {
  ArrowDownNarrowWide,
  ChevronDown,
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
                  onClick={() => setOpenDialog("goal")}
                  className="gap-3 w-fit h-fit bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg text-white border-blue-300 text-sm"
                >
                  ADD GOAL
                  <Plus />
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
                    <Button
                      onClick={handleAddSavingModal}
                      className="gap-3 w-fit h-fit bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg text-white border-blue-300 text-sm"
                    >
                      ADD MONEY
                      <HandCoins />
                    </Button>

                    <Button
                      onClick={handleCurrentGoalChange}
                      className="gap-3 w-fit h-fit bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg text-white border-blue-300 text-sm"
                    >
                      SELECT AS CURRENT GOAL
                      <Target />
                    </Button>

                    <Button
                      onClick={handleSelectAll}
                      className="gap-3 w-fit h-fit bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg text-white border-blue-300 text-sm"
                    >
                      SELECT ALL
                      <ArrowDownNarrowWide />
                    </Button>

                    <Button
                      onClick={handleDeleteGoals}
                      className="gap-3 w-fit h-fit bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-lg text-white border-transparent text-sm"
                    >
                      DELETE GOAL
                      <Trash2 />
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
