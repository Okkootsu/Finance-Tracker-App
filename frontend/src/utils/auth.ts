import type { MyJwtPayload } from "@/features/auth/hooks/useAuth";
import type { User } from "@/stores/authStore";
import { jwtDecode } from "jwt-decode";

export const createUser = (token: string) => {
  const decodedToken = jwtDecode<MyJwtPayload>(token);

  const newUser: User = {
    id: parseInt(decodedToken.sub),
    email: decodedToken.email,
  };

  return newUser;
};
