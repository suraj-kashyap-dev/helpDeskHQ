const List = () => {
  return (
    <div className="bg-white rounded-lg border overflow-x-auto border-gray-200 shadow-sm">
      <div className="px-6 py-2 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="w-[360px] h-10 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ticket Details
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Reporter / Assignee
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Project
            </th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
            <tr key={item}>
              <td className="px-6 py-4 w-full">
                <div className="flex justify-between">
                  <div className="space-y-3 w-full">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
                      <div className="w-48 h-4 bg-gray-200 rounded animate-pulse" />
                      <div className="w-20 h-5 bg-gray-200 rounded-full animate-pulse" />
                    </div>

                    <div className="w-full max-w-2xl h-4 bg-gray-200 rounded animate-pulse" />

                    <div className="flex flex-wrap gap-4">
                      <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
                      <div className="w-28 h-4 bg-gray-200 rounded animate-pulse" />
                      <div className="w-32 h-4 bg-gray-200 rounded animate-pulse" />
                      <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
                      <div className="w-28 h-4 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4">
                <div className="flex gap-2 flex-col">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" />
                      <div className="space-y-1">
                        <div className="w-32 h-4 bg-gray-200 rounded animate-pulse" />
                        <div className="w-40 h-4 bg-gray-200 rounded animate-pulse" />
                      </div>
                    </div>
                    <div className="ml-11">
                      <div className="w-36 h-3 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" />
                      <div className="space-y-1">
                        <div className="w-32 h-4 bg-gray-200 rounded animate-pulse" />
                        <div className="w-40 h-4 bg-gray-200 rounded animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4">
                <div className="space-y-3">
                  <div className="flex justify-center items-start gap-2">
                    <div className="w-32 h-4 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              </td>

              <td className="px-6 py-4">
                <div className="flex justify-center items-center gap-3">
                  <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
