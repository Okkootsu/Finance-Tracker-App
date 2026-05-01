import { Button } from "@/components/Button";
import { Globe, Lock, LogOut, Trash2, User } from "lucide-react";
import { SettingRow } from "./SettingRow";
import { SettingCard } from "./SettingCard";
import { Dialog } from "@/components/Dialog";
import { ChangePasswordModal } from "./ChangePasswordModal";
import { useAccount } from "../hooks/useAccount";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { DeleteAccountModal } from "./DeleteAccountModal";
import i18n from "@/utils/i18n";
import { useTranslation } from "react-i18next";

export const AccountInterface = () => {
  const {
    openDialog,
    setOpenDialog,
    email,
    handleInputChange,
    handleSubmitInfoChange,
    handleDialogClose,
    handleCurrencyChange,
    currency,
    handleLanguageChange,
  } = useAccount();

  const { handleLogout } = useAuth();

  const { t } = useTranslation()

  return (
    <div className="flex-1 flex flex-col items-center pb-20">
      <div className="w-[65%] flex flex-col p-8 gap-8">
        <SettingCard
          title={t("account.profile.title")}
          icon={<User className="w-5 h-5 text-blue-600" />}
        >
          <SettingRow
            title={t("account.profile.email")}
            description={t("account.profile.emailDescription")}
          >
            <input
              type="email"
              value={email}
              onChange={handleInputChange}
              className="w-full sm:w-64 px-4 py-2 text-slate-700 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </SettingRow>

          <SettingRow
            title={t("account.profile.password")}
            description={t("account.profile.passwordDescription")}
          >
            <Button
              onClick={() => setOpenDialog("changePassword")}
              variant="secondary"
              className="w-full sm:w-fit bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200 gap-2"
            >
              <Lock className="w-4 h-4" /> {t("account.profile.change")}
            </Button>
          </SettingRow>

          <SettingRow
            title={t("account.profile.logout")}
            description={t("account.profile.logoutDescription")}
          >
            <Button
              onClick={handleLogout}
              variant="secondary"
              className="w-full sm:w-fit bg-rose-50 text-rose-600 border-rose-200 hover:bg-rose-100 hover:border-rose-300 gap-2"
            >
              <LogOut className="w-4 h-4" /> {t("account.profile.logout")}
            </Button>
          </SettingRow>

          <SettingRow
            title={t("account.profile.delete")}
            description={t("account.profile.deleteDescription")}
            isLast
          >
            <Button
              onClick={() => setOpenDialog("deleteAccount")}
              variant="secondary"
              className="w-full sm:w-fit bg-red-600 text-white border-transparent hover:bg-red-700 active:bg-red-800 shadow-sm gap-2"
            >
              <Trash2 className="w-4 h-4" /> {t("account.profile.delete")}
            </Button>
          </SettingRow>

          <div className="mt-4 pt-4 border-t border-slate-200 flex justify-end">
            <Button
              onClick={handleSubmitInfoChange}
              variant="secondary"
              className="bg-blue-600 hover:bg-blue-700 text-white border-transparent px-6"
            >
              {t("account.profile.save")}
            </Button>
          </div>
        </SettingCard>

        <SettingCard
          title={t("account.app.title")}
          icon={<Globe className="w-5 h-5 text-emerald-500" />}
        >
          <SettingRow
            title={t("account.app.language")}
            description={t("account.app.languageDescription")}
          >
            <select
              value={i18n.language}
              onChange={handleLanguageChange}
              className="w-full sm:w-64 px-4 py-2 text-slate-700 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
            >
              <option value="en">English (US)</option>
              <option value="tr">Türkçe (TR)</option>
            </select>
          </SettingRow>

          <SettingRow
            title={t("account.app.currency")}
            description={t("account.app.currencyDescription")}
            isLast
          >
            <select
              value={currency}
              onChange={handleCurrencyChange}
              className="w-full sm:w-64 px-4 py-2 text-slate-700 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
            >
              <option value="usd">USD ($)</option>
              <option value="eur">EUR (€)</option>
              <option value="try">TRY (₺)</option>
            </select>
          </SettingRow>
        </SettingCard>

        <Dialog
          title={t("account.profile.changeDialogTitle")}
          isOpen={openDialog === "changePassword"}
          onClose={handleDialogClose}
        >
          <ChangePasswordModal onClose={handleDialogClose} />
        </Dialog>

        <Dialog
          title={t("account.profile.deleteDialogTitle")}
          isOpen={openDialog === "deleteAccount"}
          onClose={handleDialogClose}
        >
          <DeleteAccountModal onClose={handleDialogClose} />
        </Dialog>
      </div>
    </div>
  );
};
