import { Combobox } from "@/components/Combobox";
import { Input } from "@/components/Input";
import { useGoals } from "../hooks/useGoals";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { Button } from "@/components/Button";

export const CreateGoalModal = () => {
  const { categories } = useCategories();
  const { handleChange, handleSubmit } = useGoals();

  return (
    <div className="flex flex-col p-8 w-112.5 gap-5 bg-slate-50 rounded-2xl shadow-2xl border border-slate-100 font-sans">
      <Input
        name="name"
        onChange={handleChange}
        label="Name"
        variant="modal"
        placeholder="e.g. Grocery Shopping"
      />

      <div className="flex flex-col gap-1.5">
        <label className="font-semibold text-sm text-slate-700">Category</label>
        <Combobox
          name="category"
          onChange={handleChange}
          options={categories}
          className="w-full"
        />
      </div>

      <Input
        name="targetAmount"
        onChange={handleChange}
        label="Target Amount"
        variant="modal"
        type="number"
        placeholder="0.00 $"
      />

      <Input
        name="desiredFinish"
        onChange={handleChange}
        label="Desired Finish Time (Optional)"
        type="date"
        variant="modal"
      />

      <div className="flex items-center justify-end gap-3 mt-4 pt-5 border-t border-slate-200">
        <Button className="w-fit bg-white border-slate-300 text-slate-700 hover:bg-slate-100 active:bg-slate-200 shadow-sm">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          className="w-fit bg-blue-600 border-transparent text-white hover:bg-blue-700 active:bg-blue-800 shadow-sm"
        >
          Create
        </Button>
      </div>
    </div>
  );
};
