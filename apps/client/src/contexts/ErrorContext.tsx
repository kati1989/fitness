import { createContext, useContext, useState, ReactNode } from "react";

type ErrorState = {
  message: string | null;
  type: "error" | "success" | null;
};

type ErrorContextType = {
  error: ErrorState;
  setError: (message: string, type: "error" | "success") => void;
  clearError: () => void;
};

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
  const [error, setErrorState] = useState<ErrorState>({
    message: null,
    type: null,
  });

  const setError = (message: string, type: "error" | "success") => {
    setErrorState({ message, type });
  };

  const clearError = () => {
    setErrorState({ message: null, type: null });
  };

  return (
    <ErrorContext.Provider value={{ error, setError, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useError must be used within an ErrorProvider");
  }
  return context;
};
