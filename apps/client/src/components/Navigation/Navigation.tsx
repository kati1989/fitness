import { useAuth } from "@/contexts/AuthContext";
import { AuthNavigation } from "./AuthNavigation";
import { NonAuthNavigation } from "./NonAuthNavigation";

export const Navigation = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <AuthNavigation />;
  }

  return <NonAuthNavigation />;
};
