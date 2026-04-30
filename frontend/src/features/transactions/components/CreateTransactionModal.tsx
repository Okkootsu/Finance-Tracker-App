import { Button } from "@/components/Button";
import { Combobox } from "@/components/Combobox";
import { Input } from "@/components/Input";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { useTransactions } from "../hooks/useTransactions";
import { useTranslation } from "react-i18next";

type CreateTransactionModalProps = {
  onClose?: () => void;
};

export const CreateTransactionModal = ({
  onClose,
}: CreateTransactionModalProps) => {
  const { categories } = useCategories();
  const { handleChange, handleSubmit } = useTransactions();

  const { t } = useTranslation();

  return (
    <div className="flex flex-col p-8 w-112.5 gap-5 bg-slate-50 rounded-2xl shadow-2xl border border-slate-100 font-sans">
      <Input
        name="name"
        onChange={handleChange}
        label={t("dialog.transaction.name")}
        variant="modal"
        placeholder={t("dialog.transaction.namePlaceholder")}
      />

      <div className="flex flex-col gap-1.5">
        <label className="font-semibold text-sm text-slate-700">
          {t("dialog.transaction.category")}
        </label>
        <Combobox
          name="category"
          onChange={handleChange}
          options={categories}
          className="w-full"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="font-semibold text-sm text-slate-700">
          {t("dialog.transaction.description")}
        </label>
        <textarea
          name="description"
          onChange={handleChange}
          rows={3}
          placeholder={t("dialog.transaction.descriptionPlaceholder")}
          className={`w-full px-4 py-2.5 text-slate-700 font-medium bg-white border border-slate-300 rounded-lg
             shadow-sm resize-none transition-all duration-200 ease-in-out hover:border-slate-400 hover:shadow-md
              focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10`}
        />
      </div>

      <Input
        name="amount"
        onChange={handleChange}
        label={t("dialog.transaction.amount")}
        variant="modal"
        type="number"
        placeholder="0.00 $"
      />

      <Input
        name="time"
        onChange={handleChange}
        label={t("dialog.transaction.time")}
        type="datetime-local"
        variant="modal"
      />

      <div className="flex items-center justify-end gap-3 mt-4 pt-5 border-t border-slate-200">
        <Button
          onClick={onClose}
          variant="secondary"
          className="w-fit bg-white border-slate-300 text-slate-700 hover:bg-slate-100 active:bg-slate-200 shadow-sm"
        >
          {t("dialog.cancel")}
        </Button>
        <Button
          onClick={handleSubmit}
          variant="secondary"
          className="w-fit bg-blue-600 border-transparent text-white hover:bg-blue-700 active:bg-blue-800 shadow-sm"
        >
          {t("dialog.create")}
        </Button>
      </div>
    </div>
  );
};
