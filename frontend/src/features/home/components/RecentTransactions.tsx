import { Transaction } from "@/features/transactions/components/Transaction";
import { useTransactions } from "@/features/transactions/hooks/useTransactions";

export const RecentTransactions = () => {
  const {
    transactions,
  } = useTransactions();

  return (
    <div className=" flex flex-col gap-1 ">
      <div className="flex relative items-center gap-3 ">
        <h1 className="font-bold text-xl text-slate-900">
          Recent Transactions
        </h1>
      </div>

      <div
        className={`bg-white border flex flex-col rounded-2xl min-h-60 shadow-xl shadow-slate-100 border-slate-300 transition-all
               hover:shadow-2xl hover:shadow-slate-200 duration-300 mt-2`}
      >
        <div className=" flex-1 p-3 gap-2 flex flex-col ">
          {transactions.slice(0, 3).map((ta) => (
            <Transaction
              
              key={ta.id}
              amount={ta.amount}
              category={ta.category}
              name={ta.name}
              time={ta.time}
              description={ta.description}
              variant="default"
            />
          ))}

          {transactions.length === 0 && (
            <div className="text-center font-bold text-xl py-10 text-slate-800">
              No transactions found for the selected date range.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
