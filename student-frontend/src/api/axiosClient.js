import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000, // 15s se badha kar 60s kar diya taaki time out na ho
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      return Promise.reject({
        status: 0,
        message:
          error.code === "ECONNABORTED"
            ? "Request timed out. Server is taking too long to respond."
            : "Cannot reach the server. Please check your connection.",
        fieldErrors: null,
        isNetworkError: true,
      });
    }

    const { status, data } = error.response;
    let message = "Something went wrong. Please try again.";
    let fieldErrors = null;

    if (data) {
      if (typeof data === "string") {
        message = data;
      } else {
        if (data.message) message = data.message;
        if (data.errors && typeof data.errors === "object") {
          fieldErrors = data.errors;
        }
      }
    }

    if (!data || (!data.message && !fieldErrors)) {
      switch (status) {
        case 400: message = "Invalid input. Please check the fields."; break;
        case 404: message = "The requested resource was not found."; break;
        case 409: message = "This record already exists."; break;
        case 500: message = "Server error. Please try again later."; break;
        default: message = `Request failed (${status}).`;
      }
    }

    return Promise.reject({ status, message, fieldErrors, isNetworkError: false });
  }
);

export default axiosClient;