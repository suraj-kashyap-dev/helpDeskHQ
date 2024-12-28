import React from 'react';
import { useTranslation } from 'react-i18next';

const Loading: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100/70">
      <div className="flex flex-col items-center">
        <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-gray-800"></div>
        <span className="mt-4 text-lg font-medium text-gray-800">
          {t('Loading...')}
        </span>
      </div>
    </div>
  );
};

export default Loading;
