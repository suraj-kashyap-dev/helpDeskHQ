const OrganizationTableShimmer: React.FC = () => {
    return (
      <div className="bg-white border border-neutral-200/30 rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200/30">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-neutral-500">Name</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-neutral-500">Domain</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-neutral-500">Subscription Type</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-neutral-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200/30">
              {[...Array(10)].map((_, index) => (
                <tr key={index} className="hover:bg-neutral-50">
                  <td className="px-6 py-4 text-sm">
                    <div className="h-4 bg-neutral-200 rounded animate-pulse"></div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="h-4 bg-neutral-200 rounded animate-pulse"></div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="h-4 bg-neutral-200 rounded animate-pulse"></div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex space-x-3">
                      <div className="h-8 w-20 bg-neutral-200 rounded animate-pulse"></div>
                      <div className="h-8 w-20 bg-neutral-200 rounded animate-pulse"></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        <div className="px-6 py-4 border-t border-neutral-200/30">
          <div className="flex items-center justify-between">
            <div className="h-4 w-32 bg-neutral-200 rounded animate-pulse"></div>
            <div className="flex space-x-2">
              <div className="h-8 w-20 bg-neutral-200 rounded animate-pulse"></div>
              <div className="h-8 w-20 bg-neutral-200 rounded animate-pulse"></div>
              <div className="h-8 w-20 bg-neutral-200 rounded animate-pulse"></div>
              <div className="h-8 w-20 bg-neutral-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default OrganizationTableShimmer;
  