import { Button } from "@/components/Button";
import { Checkbox } from "@/components/Checkbox";
import { Input } from "@/components/Input";
import { useAccount } from "../hooks/useAccount";

type ChangePasswordModalProps = {
  onClose?: () => void;
};

export const ChangePasswordModal = ({ onClose }: ChangePasswordModalProps) => {
  const {
    handleShowPassword,
    handleFormChange,
    handleSubmitPasswordChange,
    showPassword,
  } = useAccount();

  return (
    <div className="flex flex-col p-8 w-112.5 gap-5 bg-slate-50 rounded-2xl shadow-2xl border border-slate-100 font-sans">
      <Input
        name="oldPassword"
        onChange={handleFormChange}
        label="Current Password"
        variant="modal"
        type={showPassword ? "text" : "password"}
      />

      <Input
        name="newPassword"
        onChange={handleFormChange}
        label="New Password"
        variant="modal"
        type={showPassword ? "text" : "password"}
      />

      <div className="text-slate-700 font-semibold flex justify-end items-center gap-3 py-1 px-1">
        <Checkbox onClick={handleShowPassword} label="Show Password" />
      </div>

      <div className="flex items-center justify-end gap-3 mt-4 pt-5 border-t border-slate-200">
        <Button
          onClick={onClose}
          className="w-fit bg-white border-slate-300 text-slate-700 hover:bg-slate-100 active:bg-slate-200 shadow-sm"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmitPasswordChange}
          className="w-fit bg-blue-600 border-transparent text-white hover:bg-blue-700 active:bg-blue-800 shadow-sm"
        >
          Change
        </Button>
      </div>
    </div>
  );
};
