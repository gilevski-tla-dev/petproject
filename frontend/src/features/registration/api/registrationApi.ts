import axios from "axios";

interface UserData {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async (userData: UserData) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/sign_up",
      userData
    );
    return response.data;
  } catch {
    throw new Error("Registration failed");
  }
};
