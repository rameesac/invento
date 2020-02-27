import { toast } from 'react-toastify';

export default function showToast(data) {
    const TOAST_TYPE_SUCCESS = 'SUCCESS';
    const TOAST_TYPE_ERROR = 'ERROR';
    const config = {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
    };
    if (data.type === TOAST_TYPE_SUCCESS) {
        toast.success(data.message, config);
    } else if (data.type === TOAST_TYPE_ERROR) {
        toast.error(data.message, config);
    }
}
