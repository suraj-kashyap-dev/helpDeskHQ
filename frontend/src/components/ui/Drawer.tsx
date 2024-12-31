import React, { useEffect, ReactNode } from 'react';
import { X } from 'lucide-react';

type Position = 'top' | 'right' | 'bottom' | 'left';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  position?: Position;
  width?: string;
  children: ReactNode;
}

interface DrawerHeaderProps {
  children: ReactNode;
  onClose: () => void;
}

interface DrawerBodyProps {
  children: ReactNode;
}

interface DrawerFooterProps {
  children: ReactNode;    
}

interface DrawerComposition {
  Header: React.FC<DrawerHeaderProps>;
  Body: React.FC<DrawerBodyProps>;
  Footer: React.FC<DrawerFooterProps>;
}

const Drawer: React.FC<DrawerProps> & DrawerComposition = ({
  isOpen,
  onClose,
  position = 'right',
  width = '500px',
  children,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const getTranslateClass = (): string => {
    switch (position) {
      case 'top':
        return 'translate-y-[-100%]';
      case 'bottom':
        return 'translate-y-[100%]';
      case 'left':
        return 'translate-x-[-100%]';
      case 'right':
        return 'translate-x-[100%]';
      default:
        return 'translate-x-[100%]';
    }
  };

  const getPositionClasses = (): string => {
    switch (position) {
      case 'top':
        return 'inset-x-0 top-0';
      case 'bottom':
        return 'inset-x-0 bottom-0';
      case 'left':
        return 'inset-y-0 left-0';
      case 'right':
        return 'inset-y-0 right-0';
      default:
        return 'inset-y-0 right-0';
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-[10002] bg-gray-500 bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ease-in-out
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <div
        className={`fixed z-[10003]  bg-white dark:bg-gray-900 transition-transform duration-200 ease-in-out
          ${getPositionClasses()}
          ${isOpen ? 'translate-x-0' : getTranslateClass()}
          max-sm:!w-full`}
        style={{ width }}
      >
        <div className="pointer-events-auto h-full w-full overflow-auto rounded-lg bg-white dark:bg-gray-900">
          <div className="flex h-full w-full flex-col">{children}</div>
        </div>
      </div>
    </>
  );
};

// Header Component
const Header: React.FC<DrawerHeaderProps> = ({ children, onClose }) => {
  return (
    <div className="grid gap-y-2.5 border-b p-3 dark:border-gray-800 max-sm:px-4 relative">
      {children}
      <div className="absolute top-3 right-3">
        <X
          className="cursor-pointer text-3xl hover:rounded-md hover:bg-gray-100 dark:hover:bg-gray-950"
          onClick={onClose}
          size={24}
        />
      </div>
    </div>
  );
};

// Body Component
const Body: React.FC<DrawerBodyProps> = ({ children }) => {
  return <div className="flex-1 overflow-auto p-3 max-sm:px-4">{children}</div>;
};

// Footer Component
const Footer: React.FC<DrawerFooterProps> = ({ children }) => {
  return <div className="pb-8">{children}</div>;
};

// Attach sub-components
Drawer.Header = Header;
Drawer.Body = Body;
Drawer.Footer = Footer;

export default Drawer;
