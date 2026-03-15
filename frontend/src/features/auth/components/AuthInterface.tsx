import { Checkbox } from "@/components/Checkbox";
import { ButtonGroup } from "./ButtonGroup";
import { InputGroup } from "./InputGroup";
import { useAuth } from "../hooks/useAuth";

export const AuthInterface = () => {
  const {
    selectedForm,
    handlePageSwitch,
    handleCheckboxClick,
    handleInputChange,
    showPassword,
    formInputs,
    handleSubmit,
  } = useAuth();

  return (
    <div className="w-full max-w-sm p-2">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Welcome to Finance.App
        </h1>
        <p className="text-sm text-[#CBD5E1] mt-2">
          {selectedForm === "register"
            ? "Let's create your personal account."
            : "Please sign in before continuing."}
        </p>
      </div>

      <InputGroup
        showPassword={showPassword}
        onChange={handleInputChange}
        formInputs={formInputs}
        variant={selectedForm}
      />

      <div className="mb-6 flex justify-end items-center gap-3 py-1 text-white font-bold px-1">
        <Checkbox onClick={handleCheckboxClick} label="Show Password" />
      </div>

      <ButtonGroup
        variant={selectedForm}
        handlePageSwitch={handlePageSwitch}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};
