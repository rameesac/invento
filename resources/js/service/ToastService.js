import { toast } from "react-toastify";

export default function showToast(toast) {
  const TOAST_TYPE_SUCCESS = "SUCCESS";
  const TOAST_TYPE_ERROR = "ERROR";
  const config = {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  };
  if (toast.type === TOAST_TYPE_SUCCESS) {
    toast.success(toast.message, config);
  } else if (toast.type === TOAST_TYPE_ERROR) {
    toast.error(toast.message, config);
  }
}
