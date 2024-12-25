import React, { useEffect } from 'react';
import { toast, ToastContainer, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import eventBus from '../../utils/eventBus';

const Toast: React.FC = () => {
  useEffect(() => {
    const handleToast = ({ message, options }: { message: string; options: ToastOptions }) => {
      toast(message, options);
    };

    eventBus.on('show-toast', handleToast);

    return () => {
      eventBus.off('show-toast', handleToast);
    };
  }, []);

  return <ToastContainer />;
};

export default Toast;
