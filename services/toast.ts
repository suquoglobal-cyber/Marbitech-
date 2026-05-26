type ToastType = 'success' | 'info' | 'warning' | 'error';

interface ToastEventDetail {
  message: string;
  type: ToastType;
}

export const toast = {
  show: (message: string, type: ToastType = 'success') => {
    const event = new CustomEvent('marbitech-toast', {
      detail: { message, type }
    });
    window.dispatchEvent(event);
  },
  success: (message: string) => toast.show(message, 'success'),
  info: (message: string) => toast.show(message, 'info'),
  warning: (message: string) => toast.show(message, 'warning'),
  error: (message: string) => toast.show(message, 'error'),
};
