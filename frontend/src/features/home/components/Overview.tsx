import { GoalProgressChart } from "@/features/savings/components/GoalProgressChart";
import { useWallet } from "@/hooks/useWallet";
import { useGoalStore } from "@/stores/goalStore";

export const Overview = () => {
  const currentGoal = useGoalStore((state) => state.currentGoal);

  const { netWorth } = useWallet();

  return (
    <div className="flex flex-col gap-1">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Welcome back</h1>
        <p className="text-slate-500">Here’s your financial overview</p>
      </div>

      <div
        className={`bg-white border flex flex-col rounded-2xl min-h-60 shadow-xl shadow-slate-100 border-slate-300 transition-all
               hover:shadow-2xl hover:shadow-slate-200 duration-300 mt-4`}
      >
        <div className="flex h-full">
          <div className="w-[50%] flex flex-col border-r border-slate-300 p-6 ">
            <div className="flex flex-1 flex-col gap-1 items-center">
              <h2 className="text-slate-600 font-bold self-start text-xl">
                Total Balance
              </h2>
              <p className="text-5xl flex-1 flex items-center justify-center font-extrabold text-slate-900">
                {netWorth}
              </p>
            </div>
          </div>

          <div className="w-[50%] flex flex-col justify-center p-2">
            {currentGoal ? (
              <GoalProgressChart
                title={currentGoal.name}
                savedAmount={currentGoal.savedAmount}
                targetAmount={currentGoal.targetAmount}
                variant="compact"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-slate-400 font-medium">
                No active goal selected.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
