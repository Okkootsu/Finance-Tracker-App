import { Button } from "@/components/Button";
import { useAuth } from "@/features/auth/hooks/useAuth";

export const AboutPage = () => {
  const { handleLogout } = useAuth();

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-amber-50 ">
      <h1>Hakkımızda Sayfası</h1>
      <p>Test</p>

      <div style={{ marginTop: "20px" }}>
        <Button onClick={handleLogout}>Çıkış yap</Button>
      </div>
    </div>
  );
};
