import { ReactNode } from 'react';

interface ShimmerCardProps {
  title: string;
  children: ReactNode;
}

const ShimmerCard: React.FC<ShimmerCardProps> = ({ title, children }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
    <div className="border-b border-gray-200 p-4">
      <h3 className="font-medium text-gray-900">{title}</h3>
    </div>
    <div className="p-4">{children}</div>
  </div>
);

const ShimmerInfoItem = () => (
  <div className="flex items-start gap-3">
    <div className="relative w-5 h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full animate-[shimmer_1.5s_infinite] shimmer-element" />
    </div>
    <div className="flex-1 space-y-2">
      <div className="relative w-24 h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full animate-[shimmer_1.5s_infinite] shimmer-element" />
      </div>
      <div className="relative w-48 h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full animate-[shimmer_1.5s_infinite] shimmer-element" />
      </div>
    </div>
  </div>
);

const ShimmerButton = ({ width = 'w-24' }) => (
  <div
    className={`relative ${width} h-10 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded overflow-hidden`}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full animate-[shimmer_1.5s_infinite] shimmer-element" />
  </div>
);

const TicketViewShimmer = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 p-6 min-h-screen">
      <div className="lg:w-1/4 space-y-6">
        <ShimmerCard title="Ticket Overview">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <ShimmerInfoItem key={i} />
            ))}
          </div>
        </ShimmerCard>

        <ShimmerCard title="Project Information">
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <ShimmerInfoItem key={i} />
            ))}
          </div>
        </ShimmerCard>
      </div>

      <div className="lg:w-3/4 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <ShimmerButton width="w-48" />
          <div className="flex gap-3">
            <ShimmerButton />
            <ShimmerButton />
          </div>
        </div>

        <ShimmerCard title="General Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <ShimmerInfoItem key={i} />
            ))}
          </div>
        </ShimmerCard>

        <ShimmerCard title="Reporter Details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <ShimmerInfoItem key={i} />
            ))}
          </div>
        </ShimmerCard>

        <ShimmerCard title="Assignee Details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <ShimmerInfoItem key={i} />
            ))}
          </div>
        </ShimmerCard>
      </div>
    </div>
  );
};

export default TicketViewShimmer;
