import axios from "axios";
import toast from "react-hot-toast";

export const handleApiError = (err: unknown) => {
  if (axios.isAxiosError(err) && err.response) {
    toast.error(err.response.data.errorMessage || "An unknown error occurred");
  } else {
    toast.error("Server connection failed");
  }
};
