// features/registration/model/registrationModel.ts
import { useState } from "react";
import { registerUser } from "../api/registrationApi";

interface UserData {
  name: string;
  email: string;
  password: string;
}

export const useRegistration = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (userData: UserData) => {
    setLoading(true);
    setError(null);

    try {
      await registerUser(userData);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
};
