import { Overview } from "./Overview";
import { Transactions } from "./Transactions";

export const TransactionsInterface = () => {
  return (
    <div className=" flex-1 flex flex-col items-center">
      <div className=" w-[65%] flex flex-1 flex-col p-8 gap-8">
        <Overview />

        <Transactions />
      </div>
    </div>
  );
};
