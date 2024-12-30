interface ShimmerElementProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  className?: string;
  rounded?: 'sm' | 'md' | 'lg' | 'full' | 'none';
  duration?: number;
}

const Shimmer: React.FC<ShimmerElementProps> = ({
  width = 'w-48',
  height = 'h-4',
  className = '',
  rounded = 'md',
  duration = 1.5,
  ...props
}) => {
  const roundedMap = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  const baseClasses = `relative bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 overflow-hidden ${
    typeof width === 'number' ? `w-[${width}px]` : width
  } ${typeof height === 'number' ? `h-[${height}px]` : height} ${
    roundedMap[rounded]
  } ${className}`;

  return (
    <div className={baseClasses} {...props}>
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full shimmer-element"
        style={{ animation: `shimmer ${duration}s infinite` }}
      />
    </div>
  );
};

export default Shimmer;
