import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useWorkspaceApi } from '../../hooks/useWorkspace';
import { WorkspaceFormValues } from '../../types/workspace.types';
import { ErrorMessage } from '../../components/ui/form-controls/ErrorMessage';
import { Label } from '../../components/ui/form-controls/Label';
import { Textarea } from '../../components/ui/form-controls/Textarea';
import { Select } from '../../components/ui/form-controls/Select';
import { Input } from '../../components/ui/form-controls/Input';
import { Button } from '../../components/ui/form-controls/Button';
import { useOrganizationApi } from '../../hooks/useOrganization';
import Loading from '../../components/Loading';

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Workspace name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters'),
  organization_id: Yup.number().required('Organization is required'),
  description: Yup.string().max(
    255,
    'Description must not exceed 255 characters',
  ),
  settings: Yup.string().test('valid-json', 'Invalid JSON format', (value) => {
    if (!value) return true;
    try {
      JSON.parse(value);
      return true;
    } catch {
      return false;
    }
  }),
});

const initialValues: WorkspaceFormValues = {
  name: '',
  organization_id: 0,
  settings: JSON.stringify({ theme: 'light', language: 'en' }, null, 2),
  description: '',
};

const Create: React.FC = () => {
  const navigate = useNavigate();
  const { create } = useWorkspaceApi();
  const { organizations, loading, fetchOrganization } = useOrganizationApi();

  useEffect(() => {
    fetchOrganization();
  }, []);

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    isSubmitting,
  } = useFormik<WorkspaceFormValues>({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      await create(values);

      navigate('/workspaces');
    },
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Create Workspace
          </h2>
          <div className="flex gap-2">
            <Link
              to="/workspaces"
              className="px-4 py-2 text-gray-800 rounded-lg transition-colors flex items-center"
            >
              Cancel
            </Link>

            <Button
              disabled={isSubmitting}
              type="submit"
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center"
              isLoading={loading}
            >
              Save Workspace
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6 bg-white border shadow-sm border-neutral-200/30 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="name" className="required">
                  Workspace Name
                </Label>

                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter workspace name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  className={`mt-1 block w-full rounded-md shadow-sm ${errors.name && touched.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}`}
                />

                {errors.name && touched.name && (
                  <ErrorMessage error={errors.name} />
                )}
              </div>

              <div className="flex-1 space-y-2">
                <Label htmlFor="organization_id" className="required">
                  Organization
                </Label>

                <Select
                  id="organization_id"
                  name="organization_id"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.organization_id}
                  className={`mt-1 block w-full rounded-md shadow-sm ${errors.organization_id && touched.organization_id ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}`}
                >
                  {organizations?.map((org) => (
                    <option key={org.id} value={org.id}>
                      {org.name}
                    </option>
                  ))}
                </Select>

                {errors.organization_id && touched.organization_id && (
                  <ErrorMessage error={errors.organization_id} />
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>

                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter workspace description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  className={`h-32 resize-none mt-1 block w-full rounded-md shadow-sm ${errors.description && touched.description ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}`}
                />

                {errors.description && touched.description && (
                  <ErrorMessage error={errors.description} />
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default Create;
