import toast from 'react-hot-toast';

export const showToast = {
  success: (message: string, options?: { id?: string; duration?: number }) => {
    return toast.success(message, {
      id: options?.id,
      duration: options?.duration,
    });
  },

  error: (message: string, options?: { id?: string; duration?: number }) => {
    return toast.error(message, {
      id: options?.id,
      duration: options?.duration,
    });
  },

  loading: (message: string, options?: { id?: string }) => {
    return toast.loading(message, {
      id: options?.id,
    });
  },

  promise: <T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: Error) => string);
    },
    options?: { id?: string }
  ) => {
    return toast.promise(
      promise,
      {
        loading: messages.loading,
        success: messages.success,
        error: messages.error,
      },
      {
        id: options?.id,
      }
    );
  },

  dismiss: (toastId?: string) => {
    toast.dismiss(toastId);
  },
};

export const handleApiError = (error: unknown, defaultMessage = 'An error occurred') => {
  const message = error instanceof Error ? error.message : defaultMessage;
  showToast.error(message);
  return message;
};
