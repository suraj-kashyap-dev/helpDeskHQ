import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CirclePlus, Edit, PencilIcon, Trash, Trash2 } from 'lucide-react';
import { useOrganizationApi } from '../../hooks/useOrganization';
import { Button } from '../../components/ui/form-controls/Button';
import { ButtonGroup } from '../../components/ui/form-controls/ButtonGroup';
import { number } from 'yup';
import { showToast } from '../../utils/toast';
import Confirm from '../../components/alert/Confirm';

const Index: React.FC = () => {
  const {
    organizations,
    loading,
    error,
    fetchOrganization,
    deleteOrganization,
  } = useOrganizationApi();
  const [isConfirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    fetchOrganization();
  }, []);

  const handleDelete = (id: number) => {
    setConfirmOpen(true);
    deleteOrganization(id);
  };

  useEffect(() => {
    if (error) {
      showToast(error, {
        type: 'error',
      });
    }
  }, [error]);

  return (
    <React.Fragment>
      <div className="space-y-6">
        <div id="employee_management" className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Organizations</h2>
            <Link
              to="create"
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <CirclePlus className="h-5 w-5" />
              <span>Create Organization</span>
            </Link>
          </div>

          <div className="bg-white border border-neutral-200/30 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search organization..."
                  className="w-full px-4 py-2 border border-neutral-200/30 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search domain..."
                  className="w-full px-4 py-2 border border-neutral-200/30 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <select className="px-4 py-2 border border-neutral-200/30 rounded-lg focus:outline-none focus:border-blue-500">
                <option value="">Subscription Type</option>
                <option value="developer">Premium</option>
                <option value="designer">Standard</option>
                <option value="manager">Enterprise</option>
                <option value="manager">Free</option>
              </select>
            </div>
          </div>

          <div className="bg-white border border-neutral-200/30 rounded-lg">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b border-neutral-200/30">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-neutral-500">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-neutral-500">
                      Domain
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-neutral-500">
                      Subscription Type
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-neutral-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200/30">
                  {organizations && organizations.length > 0 ? (
                    organizations.map((organization) => (
                      <tr key={organization.id} className="hover:bg-neutral-50">
                        {/* Organization Name */}
                        <td className="px-6 py-4 text-sm">
                          {organization.name}
                        </td>

                        {/* Organization Domain */}
                        <td className="px-6 py-4 text-sm">
                          {organization.domain}
                        </td>

                        {/* Subscription Type */}
                        <td className="px-6 py-4 text-sm">
                          {organization.subscriptionType}
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 text-sm">
                          <div className="flex space-x-3">
                            <ButtonGroup alignment="center" gap="md">
                              <Button
                                variant="primary"
                                size="sm"
                                leftIcon={<Edit className="h-4 w-4" />}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="danger"
                                size="sm"
                                leftIcon={<Trash2 className="h-4 w-4" />}
                                onClick={() => handleDelete(organization.id)}
                              >
                                Delete
                              </Button>
                            </ButtonGroup>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 py-4 text-sm text-center text-neutral-500"
                      >
                        No organizations found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 border-t border-neutral-200/30">
              <div className="flex items-center justify-between">
                <div className="text-sm text-neutral-500">
                  Showing 1 to 3 of 50 entries
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 border border-neutral-200/30 rounded hover:bg-neutral-50">
                    Previous
                  </button>
                  <button className="px-3 py-1 bg-blue-600 text-white rounded">
                    1
                  </button>
                  <button className="px-3 py-1 border border-neutral-200/30 rounded hover:bg-neutral-50">
                    2
                  </button>
                  <button className="px-3 py-1 border border-neutral-200/30 rounded hover:bg-neutral-50">
                    3
                  </button>
                  <button className="px-3 py-1 border border-neutral-200/30 rounded hover:bg-neutral-50">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Confirm
        isOpen={isConfirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => handleDelete()}
        title="Confirm Logout?"
        description="This action is logout and redirect to login page."
        confirmText="Logout"
        cancelText="Cancel"
      />
    </React.Fragment>
  );
};

export default Index;
