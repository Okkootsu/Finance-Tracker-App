import { Button } from "@/components/Button";
import { useTranslation } from "react-i18next";

type ButtonGroupProps = {
  variant?: "register" | "login";
  handlePageSwitch: () => void;
  handleSubmit: () => void;
};

export const ButtonGroup = ({
  variant = "register",
  handlePageSwitch,
  handleSubmit,
}: ButtonGroupProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-3">
      <Button
        onClick={handleSubmit}
        variant="secondary"
        className="bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 border-none shadow-lg shadow-blue-500/20"
      >
        {variant === "register" ? `${t("auth.register")}` : `${t("auth.login")}`}
      </Button>

      <Button
        onClick={handlePageSwitch}
        variant="secondary"
        className="border-blue-200 hover:bg-blue-100 active:bg-blue-200 text-blue-800"
      >
        {variant === "register" ? `${t("auth.login")}` : `${t("auth.register")}`}
      </Button>
    </div>
  );
};
