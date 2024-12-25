import mitt, { Emitter } from 'mitt';
import { ConfirmOptions, Events, ToastOptions } from '../types/events.types';

const eventBus: Emitter<Events> = mitt<Events>();

const defaultToastOptions: ToastOptions = {
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  type: 'success',
  position: 'bottom-center',
};

export const showToast = (message: string, options?: ToastOptions) => {
  eventBus.emit('show-toast', {
    message,
    options: { ...defaultToastOptions, ...options },
  });
};

export const confirmDialog = (options: ConfirmOptions) => {
  eventBus.emit('open-confirm', options);
};

export default eventBus;