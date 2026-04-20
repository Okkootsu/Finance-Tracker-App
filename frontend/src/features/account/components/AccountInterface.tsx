import { Button } from "@/components/Button";
import { Globe, Lock, LogOut, Trash2, User } from "lucide-react";
import { useState } from "react";
import { SettingRow } from "./SettingRow";
import { SettingCard } from "./SettingCard";
import { Dialog } from "@/components/Dialog";
import { ChangePasswordModal } from "./ChangePasswordModal";
import { useAccount } from "../hooks/useAccount";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { DeleteAccountModal } from "./DeleteAccountModal";

export const AccountInterface = () => {
  const [language, setLanguage] = useState("en");

  const {
    openDialog,
    setOpenDialog,
    email,
    handleInputChange,
    handleSubmitInfoChange,
    handleDialogClose,
  } = useAccount();

  const { handleLogout } = useAuth();

  return (
    <div className="flex-1 flex flex-col items-center pb-20">
      <div className="w-[65%] flex flex-col p-8 gap-8">
        <SettingCard
          title="Profile Settings"
          icon={<User className="w-5 h-5 text-blue-600" />}
        >
          <SettingRow
            title="Email Address"
            description="The email associated with your account."
          >
            <input
              type="email"
              value={email}
              onChange={handleInputChange}
              className="w-full sm:w-64 px-4 py-2 text-slate-700 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </SettingRow>

          <SettingRow
            title="Password"
            description="Change your account password securely."
          >
            <Button
              onClick={() => setOpenDialog("changePassword")}
              className="w-full sm:w-fit bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200 gap-2"
            >
              <Lock className="w-4 h-4" /> Change Password
            </Button>
          </SettingRow>

          <SettingRow
            title="Sign Out"
            description="Log out of your account on this device."
          >
            <Button
              onClick={handleLogout}
              className="w-full sm:w-fit bg-rose-50 text-rose-600 border-rose-200 hover:bg-rose-100 hover:border-rose-300 gap-2"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </Button>
          </SettingRow>

          <SettingRow
            title="Delete Account"
            description="Permanently remove your account and all associated data."
            isLast
          >
            <Button
              onClick={() => setOpenDialog("deleteAccount")}
              className="w-full sm:w-fit bg-red-600 text-white border-transparent hover:bg-red-700 active:bg-red-800 shadow-sm gap-2"
            >
              <Trash2 className="w-4 h-4" /> Delete Account
            </Button>
          </SettingRow>

          <div className="mt-4 pt-4 border-t border-slate-200 flex justify-end">
            <Button
              onClick={handleSubmitInfoChange}
              variant="secondary"
              className="bg-blue-600 hover:bg-blue-700 text-white border-transparent px-6"
            >
              Save Changes
            </Button>
          </div>
        </SettingCard>

        <SettingCard
          title="App Preferences"
          icon={<Globe className="w-5 h-5 text-emerald-500" />}
        >
          <SettingRow
            title="Language"
            description="Select your preferred language for the interface."
          >
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full sm:w-64 px-4 py-2 text-slate-700 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
            >
              <option value="en">English (US)</option>
              <option value="tr">Türkçe (TR)</option>
              <option value="de">Deutsch (DE)</option>
            </select>
          </SettingRow>

          <SettingRow
            title="Currency"
            description="Your primary currency for transactions and goals."
            isLast
          >
            <select className="w-full sm:w-64 px-4 py-2 text-slate-700 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 cursor-pointer">
              <option value="usd">USD ($)</option>
              <option value="eur">EUR (€)</option>
              <option value="try">TRY (₺)</option>
            </select>
          </SettingRow>
        </SettingCard>

        <Dialog
          title="Change Password"
          isOpen={openDialog === "changePassword"}
          onClose={handleDialogClose}
        >
          <ChangePasswordModal onClose={handleDialogClose} />
        </Dialog>

        <Dialog
          title="Delete Account"
          isOpen={openDialog === "deleteAccount"}
          onClose={handleDialogClose}
        >
          <DeleteAccountModal onClose={handleDialogClose} />
        </Dialog>
      </div>
    </div>
  );
};
