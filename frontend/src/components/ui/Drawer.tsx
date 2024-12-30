import { useState, useEffect } from 'react';
import { X, GripVertical } from 'lucide-react';

const Drawer = ({
  isOpen,
  onClose,
  children,
  position = 'left',
  initialWidth = 320,
  minWidth = 280,
  maxWidth = 800,
  header,
  footer,
  className,
}) => {
  const [width, setWidth] = useState(initialWidth);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;

      let newWidth;
      if (position === 'left') {
        newWidth = e.clientX;
      } else if (position === 'right') {
        newWidth = window.innerWidth - e.clientX;
      }

      if (newWidth >= minWidth && newWidth <= maxWidth) {
        setWidth(newWidth);
      }
    };

    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, position, minWidth, maxWidth]);

  const positionClasses = {
    left: 'left-0 h-screen',
    right: 'right-0 h-screen',
    bottom: 'bottom-0 w-full',
  };

  const transformClasses = {
    left: isOpen ? 'translate-x-0' : '-translate-x-full',
    right: isOpen ? 'translate-x-0' : 'translate-x-full',
    bottom: isOpen ? 'translate-y-0' : 'translate-y-full',
  };

  const resizeHandle = position !== 'bottom' && (
    <div
      className={`absolute top-0 ${position === 'left' ? 'right-0' : 'left-0'} h-full w-1 cursor-col-resize 
        hover:bg-blue-200 active:bg-blue-300 group flex items-center justify-center`}
      onMouseDown={() => setIsDragging(true)}
    >
      <div className="absolute h-16 w-6 flex items-center justify-center opacity-0 group-hover:opacity-100">
        <GripVertical className="w-4 h-4 text-blue-500" />
      </div>
    </div>
  );

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity z-40"
          onClick={onClose}
        />
      )}

      <div
        style={{ width: position !== 'bottom' ? width : '100%' }}
        className={`
          fixed
          h-screen
          bg-white
          shadow-2xl
          transition-transform
          duration-300
          ease-in-out
          z-50
          flex
          flex-col
          ${positionClasses[position]}
          ${transformClasses[position]}
          ${className || ''}
        `}
      >
        {header && (
          <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
            <div className="font-semibold">{header}</div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          <div className="p-4">{children}</div>
        </div>

        {footer && <div className="p-4 border-t bg-gray-50">{footer}</div>}

        {resizeHandle}
      </div>
    </>
  );
};

export default Drawer;
