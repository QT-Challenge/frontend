import toast from 'react-hot-toast';

/**
 * Toast notification utility functions with consistent styling
 */

export const showToast = {
  /**
   * Show a success toast notification
   */
  success: (message: string, options?: { id?: string; duration?: number }) => {
    return toast.success(message, {
      id: options?.id,
      duration: options?.duration,
    });
  },

  /**
   * Show an error toast notification
   */
  error: (message: string, options?: { id?: string; duration?: number }) => {
    return toast.error(message, {
      id: options?.id,
      duration: options?.duration,
    });
  },

  /**
   * Show a loading toast notification
   */
  loading: (message: string, options?: { id?: string }) => {
    return toast.loading(message, {
      id: options?.id,
    });
  },

  /**
   * Show a promise-based toast that updates based on promise state
   * @param promise - Promise to track
   * @param messages - Messages for loading, success, and error states
   */
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

  /**
   * Dismiss a specific toast or all toasts
   */
  dismiss: (toastId?: string) => {
    toast.dismiss(toastId);
  },
};

/**
 * Helper to handle API errors and show toast notifications
 */
export const handleApiError = (error: unknown, defaultMessage = 'An error occurred') => {
  const message = error instanceof Error ? error.message : defaultMessage;
  showToast.error(message);
  return message;
};
