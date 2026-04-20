import { Button } from "@/components/Button";
import { useAccount } from "../hooks/useAccount";

type DeleteAccountModalProps = {
  onClose?: () => void;
};

export const DeleteAccountModal = ({ onClose }: DeleteAccountModalProps) => {
  const { handleDeleteAccount } = useAccount();

  return (
    <div className="flex flex-col p-8 min-w-112.5 gap-5 bg-slate-50 rounded-2xl shadow-2xl border border-slate-100 font-sans">
      <h1 className="font-bold text-slate-700 text-lg">
        Are you sure you want to delete your account? <br />
        <span className="font-semibold text-base">
          This process cannot be reversed
        </span>
      </h1>

      <div className="flex items-center justify-end gap-3 mt-4 pt-5 border-t border-slate-200">
        <Button
          onClick={onClose}
          variant="secondary"
          className="w-fit bg-white border-slate-300 text-slate-700 hover:bg-slate-100 active:bg-slate-200 shadow-sm"
        >
          Cancel
        </Button>
        <Button
          onClick={handleDeleteAccount}
          variant="secondary"
          className="w-fit bg-red-600 border-transparent text-white hover:bg-red-700 active:bg-red-800 shadow-sm"
        >
          Proceed
        </Button>
      </div>
    </div>
  );
};
