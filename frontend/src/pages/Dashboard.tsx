import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <React.Fragment>
      <div className="p-6 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">
                Total Tickets
              </h3>
              <span className="text-green-500 text-sm">+12.5%</span>
            </div>
            <div className="flex items-baseline">
              <p className="text-2xl font-semibold">1,482</p>
              <span className="ml-2 text-sm text-gray-500">tickets</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">
                Open Tickets
              </h3>
              <span className="text-yellow-500 text-sm">+5.2%</span>
            </div>
            <div className="flex items-baseline">
              <p className="text-2xl font-semibold">247</p>
              <span className="ml-2 text-sm text-gray-500">tickets</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">
                Avg. Response Time
              </h3>
              <span className="text-green-500 text-sm">-8.3%</span>
            </div>
            <div className="flex items-baseline">
              <p className="text-2xl font-semibold">2.5</p>
              <span className="ml-2 text-sm text-gray-500">hours</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">
                Satisfaction Rate
              </h3>
              <span className="text-green-500 text-sm">+3.1%</span>
            </div>
            <div className="flex items-baseline">
              <p className="text-2xl font-semibold">94.8%</p>
              <span className="ml-2 text-sm text-gray-500">satisfied</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Recent Tickets</h2>
              <button className="text-sm text-gray-500 hover:text-gray-700">
                View All
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ticket
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className="text-sm font-medium">#TK-2024</span>
                      <span className="ml-2 text-sm text-gray-500">
                        Login Issue
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src="https://avatar.iran.liara.run/public"
                        className="w-6 h-6 rounded-full transition-opacity duration-300 opacity-100"
                        loading="lazy"
                      />
                      <span className="ml-2 text-sm">John Doe</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      In Progress
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      High
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">2h ago</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className="text-sm font-medium">#TK-2023</span>
                      <span className="ml-2 text-sm text-gray-500">
                        Payment Failed
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src="https://avatar.iran.liara.run/public"
                        className="w-6 h-6 rounded-full transition-opacity duration-300 opacity-100"
                        loading="lazy"
                      />
                      <span className="ml-2 text-sm">Sarah Smith</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Resolved
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Medium
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">4h ago</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="flow-root">
              <ul className="-mb-8">
                <li className="relative pb-8">
                  <span
                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  ></span>
                  <div className="relative flex space-x-3">
                    <div>
                      <span className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div>
                        <div className="text-sm">
                          <a href="#" className="font-medium text-gray-900">
                            Ticket #TK-2024
                          </a>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Resolved by David Wilson
                        </p>
                      </div>
                      <div className="mt-2 text-sm text-gray-700">
                        <p>
                          Issue resolved: Login functionality restored after
                          server restart.
                        </p>
                      </div>
                    </div>
                    <div className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500">
                      30min ago
                    </div>
                  </div>
                </li>

                <li className="relative pb-8">
                  <div className="relative flex space-x-3">
                    <div>
                      <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          ></path>
                        </svg>
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div>
                        <div className="text-sm">
                          <a href="#" className="font-medium text-gray-900">
                            Ticket #TK-2023
                          </a>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Updated by Emily Brown
                        </p>
                      </div>
                      <div className="mt-2 text-sm text-gray-700">
                        <p>
                          Payment issue investigation in progress. Customer
                          contacted for additional details.
                        </p>
                      </div>
                    </div>
                    <div className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500">
                      1h ago
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
