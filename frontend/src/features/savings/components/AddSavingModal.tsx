import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useGoals } from "../hooks/useGoals";
import { useWallet } from "@/hooks/useWallet";
import { useSettingsStore } from "@/stores/settingsStore";
import { formatCurrency } from "@/utils/currencyFormatter";
import { useTranslation } from "react-i18next";

type AddSavingModalProps = {
  onClose?: () => void;
};

export const AddSavingModal = ({ onClose }: AddSavingModalProps) => {
  const { netWorth } = useWallet();
  const { handleSavingChange, handleAddSaving } = useGoals();

  const currency = useSettingsStore((state) => state.currency);
  const formattedNetWorth = formatCurrency(netWorth, currency);

  const { t } = useTranslation();

  return (
    <div className="flex flex-col p-8 w-112.5 gap-5 bg-slate-50 rounded-2xl shadow-2xl border border-slate-100 font-sans">
      <Input
        name="savedAmount"
        onChange={handleSavingChange}
        label={t("dialog.saving.title")}
        variant="modal"
        type="number"
        placeholder="0.00 $"
      />

      <h1>
        {t("dialog.saving.current")} <span className="font-bold">{formattedNetWorth}</span>
      </h1>

      <div className="flex items-center justify-end gap-3 mt-4 pt-5 border-t border-slate-200">
        <Button
          onClick={onClose}
          variant="secondary"
          className="w-fit bg-white border-slate-300 text-slate-700 hover:bg-slate-100 active:bg-slate-200 shadow-sm"
        >
          {t("dialog.cancel")}
        </Button>
        <Button
          onClick={handleAddSaving}
          variant="secondary"
          className="w-fit bg-blue-600 border-transparent text-white hover:bg-blue-700 active:bg-blue-800 shadow-sm"
        >
          {t("dialog.add")}
        </Button>
      </div>
    </div>
  );
};
