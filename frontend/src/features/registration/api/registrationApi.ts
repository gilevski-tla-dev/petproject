import axios from "axios";
import { UserData } from "../model/registrationModel";

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
