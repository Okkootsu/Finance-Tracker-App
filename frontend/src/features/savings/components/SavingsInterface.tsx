import { GoalOverview } from "./GoalOverview";

export const SavingsInterface = () => {
  return (
    <div className=" flex-1 flex flex-col items-center">
      <div className=" w-[65%] flex flex-1 flex-col p-8 gap-8">
        <GoalOverview />
      </div>
    </div>
  );
};
