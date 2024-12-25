import React, { useEffect, useCallback } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import eventBus from '../../utils/eventBus';
import { Events } from '../../types/events.types';

const Toast: React.FC = () => {
  const handleToast = useCallback(
    ({ message, options }: Events['show-toast']) => {
      const { type, ...restOptions } = options || {};

      switch (type) {
        case 'success':
          toast.success(message, restOptions);
          break;
        case 'error':
          toast.error(message, restOptions);
          break;
        case 'info':
          toast.info(message, restOptions);
          break;
        case 'warning':
          toast.warning(message, restOptions);
          break;
        default:
          toast(message, restOptions);
      }
    },
    [],
  );

  useEffect(() => {
    eventBus.on('show-toast', handleToast);
    return () => {
      eventBus.off('show-toast', handleToast);
    };
  }, [handleToast]);

  return <ToastContainer />;
};

export default Toast;
