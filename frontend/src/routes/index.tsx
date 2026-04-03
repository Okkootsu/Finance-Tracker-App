import { AuthLayout } from "@/layouts/AuthLayout";
import { MainLayout } from "@/layouts/MainLayout";
import { HomePage } from "@/pages/HomePage";
import { AuthPage } from "@/pages/AuthPage";
import { Route, Routes } from "react-router";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ProtectedRoute } from "@/pages/ProtectedRoute";
import { TransactionsPage } from "@/pages/TransactionsPage";
import { SavingsPage } from "@/pages/SavingsPage";
import { AccountPage } from "@/pages/AccountPage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/auth" element={<AuthPage />} />
      </Route>

      <Route path="/*" element={<NotFoundPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/savings" element={<SavingsPage />} />
          <Route path="/my-account" element={<AccountPage />} />
        </Route>
      </Route>
    </Routes>
  );
};
