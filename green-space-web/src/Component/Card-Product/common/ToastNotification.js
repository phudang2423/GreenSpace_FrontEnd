import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS của toastify

// Cấu hình toast một lần duy nhất
export const showToast = (type, message) => {
  if (type === "success") {
    toast.success(` ${message}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  } else if (type === "error") {
    toast.error(` ${message}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  } else if (type === "info") {
    toast.info(` ${message}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  } else if (type === "warning") {
    toast.warn(` ${message}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }
};