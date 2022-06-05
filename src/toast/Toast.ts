import { Id, toast, ToastOptions } from 'react-toastify';

const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
} as ToastOptions;

const success = (message: string) => toast.success(message, toastOptions);
const error = (message: string) => toast.error(message, toastOptions);
const loading = (message: string) => toast.loading(message, toastOptions);
const setSuccess = (id: Id, message: string) => toast.update(id, {
    render: message,
    type: 'success',
    isLoading: false,
    ...toastOptions
});
const setError = (id: Id, message: string) => toast.update(id, {
    render: message,
    type: 'error',
    isLoading: false,
    ...toastOptions
});

export {success, error, loading, setSuccess, setError};


