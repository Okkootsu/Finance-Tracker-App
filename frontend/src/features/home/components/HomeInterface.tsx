import { Overview } from "./Overview";
import { RecentTransactions } from "./RecentTransactions";

export const HomeInterface = () => {
  return (
    <div className="flex-1 flex flex-col items-center pb-20">
      <div className="w-[65%] flex flex-col p-8 gap-8">
        <Overview />

        <RecentTransactions />
      </div>
    </div>
  );
};
