import { ToastOptions as ToastifyOptions } from 'react-toastify';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastOptions extends Partial<ToastifyOptions> {
  type?: ToastType;
  position?:
    | 'top-right'
    | 'top-center'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-center'
    | 'bottom-left';
  autoClose?: number;
  hideProgressBar?: boolean;
  closeOnClick?: boolean;
  pauseOnHover?: boolean;
  draggable?: boolean;
  progress?: number;
}

export interface ConfirmOptions {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void;
}

export type Events = {
  'open-confirm': ConfirmOptions;
  'show-toast': {
    message: string;
    options?: ToastOptions;
  };
};
