import React, { useState, useEffect } from 'react';
import eventBus from '../../utils/eventBus';
import { Button } from '../ui/form-controls/Button';

const Confirm: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<{
    title: string;
    description: string;
    confirmText: string;
    cancelText: string;
    onConfirm: () => void | Promise<void>;
    onCancel?: () => void;
  }>({
    title: 'Are you sure?',
    description: 'This action cannot be undone.',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    onConfirm: () => {},
  });

  useEffect(() => {
    const handleOpenConfirm = (confirmOptions: any) => {
      setOptions({
        ...options,
        ...confirmOptions,
      });
      setIsOpen(true);
    };

    eventBus.on('open-confirm', handleOpenConfirm);

    return () => {
      eventBus.off('open-confirm', handleOpenConfirm);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    options.onCancel?.();
  };

  const handleConfirm = async () => {
    try {
      await options.onConfirm();
      setIsOpen(false);
    } catch (error) {
      console.error('Error in confirmation action:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-gray-800">{options.title}</h2>
        <p className="mt-2 text-sm text-gray-600">{options.description}</p>

        <div className="mt-6 flex justify-end gap-4">
          <Button size="sm" variant="outline" onClick={handleClose}>
            {options.cancelText}
          </Button>
          <Button size="sm" variant="danger" onClick={handleConfirm}>
            {options.confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
