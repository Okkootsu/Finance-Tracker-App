import { GoalOverview } from "./GoalOverview";
import { Goals } from "./Goals";

export const SavingsInterface = () => {
  return (
    <div className=" flex-1 flex flex-col items-center">
      <div className=" w-[65%] flex flex-1 flex-col p-8 gap-16">
        <GoalOverview />

        <Goals />
      </div>
    </div>
  );
};
