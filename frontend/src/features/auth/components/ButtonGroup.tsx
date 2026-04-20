import { Button } from "@/components/Button";

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
  return (
    <div className="flex flex-col gap-3">
      <Button
        onClick={handleSubmit}
        variant="secondary"
        className="bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 border-none shadow-lg shadow-blue-500/20"
      >
        {variant === "register" ? "Sign Up" : "Sign In"}
      </Button>

      <Button
        onClick={handlePageSwitch}
        variant="secondary"
        className="border-blue-200 hover:bg-blue-100 active:bg-blue-200 text-blue-800"
      >
        {variant === "register" ? "Sign In" : "Sign Up"}
      </Button>
    </div>
  );
};
