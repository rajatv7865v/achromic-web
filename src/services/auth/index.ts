import axiosObject from "../axios.config";

// Interface for signup request data
export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

// Interface for auth API response
export interface AuthResponse {
  statusCode: number;
  message: string;
  timestamp: string;
  status: boolean;
  data?: any;
}

// Signup function
export const signup = async (signupData: SignupData): Promise<AuthResponse> => {
  try {
    const response = await axiosObject.post("/auth/sign-up", signupData);
    return response.data;
  } catch (error) {
    console.error("Error during signup:", error);
    throw error;
  }
};

// Login function
export const login = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await axiosObject.post("/auth/sign-In", { email, password });
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};
