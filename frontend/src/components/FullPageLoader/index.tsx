import { Loader } from "../Loader";


export const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 z-9999 bg-slate-50/80 backdrop-blur-sm flex items-center justify-center">
      <Loader size="lg" showText={true} />
    </div>
  );
};