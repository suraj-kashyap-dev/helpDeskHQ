import mitt, { Emitter } from 'mitt';

type ConfirmOptions = {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void;
};

type Events = {
  'open-confirm': ConfirmOptions;
  'show-toast': {
    message: string;
    options: any;
  };
};

const eventBus: Emitter<Events> = mitt<Events>();

export const confirmDialog = (options: ConfirmOptions) => {
  eventBus.emit('open-confirm', options);
};

export const showToast = (
  message: string,
  options?: any,
) => {
  eventBus.emit('show-toast', { message, options });
};

export default eventBus;