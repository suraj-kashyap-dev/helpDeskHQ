import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useWorkspaceApi } from '../../hooks/useWorkspace';
import { ErrorMessage } from '../../components/ui/form-controls/ErrorMessage';
import { Label } from '../../components/ui/form-controls/Label';
import { Textarea } from '../../components/ui/form-controls/Textarea';
import { Select } from '../../components/ui/form-controls/Select';
import { Input } from '../../components/ui/form-controls/Input';
import { Button } from '../../components/ui/form-controls/Button';
import { useProjectApi } from '../../hooks/useProjectApi';
import { ProjectFormValues } from '../../types/projects.types';
import { ROUTES } from '../../routes/paths';
import Loading from '../../components/Loading';

const validationSchema = Yup.object({
  workspace_id: Yup.number().required('Workspace is required'),
  name: Yup.string()
    .required('Project name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters'),
  description: Yup.string().max(
    255,
    'Description must not exceed 255 characters',
  ),
  status: Yup.string().required('Status is required'),
  start_date: Yup.date(),
  end_date: Yup.date(),
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

const Create: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { edit, loading, show, project } = useProjectApi();
  const { fetch: fetchWorkspace, workspaces } = useWorkspaceApi();

  useEffect(() => {
    fetchWorkspace();

    if (id) {
      show(parseInt(id));
    }

    if (workspaces) {
      setFieldValue('workspace_id', workspaces[0].id);
    }
  }, []);

  const formatDate = (date: string) => {
    const formattedDate = new Date(date);
    formattedDate.setHours(12, 0, 0);
    return formattedDate.toISOString();
  };

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    setFieldValue,
    handleBlur,
    isSubmitting,
  } = useFormik<ProjectFormValues>({
    enableReinitialize: true,
    initialValues: {
      workspace_id: project?.workspace?.id || 0,
      name: project?.name || '',
      description: project?.description || '',
      status: project?.status || 'ACTIVE',
      start_date: project?.startDate
        ? new Date(project?.startDate).toISOString().split('T')[0]
        : '',
      end_date: project?.endDate
        ? new Date(project?.endDate).toISOString().split('T')[0]
        : '',
      settings: JSON.stringify({ theme: 'light', language: 'en' }, null, 2),
    },
    validationSchema,
    onSubmit: async (values) => {
      if (id) {
        await edit(parseInt(id), {
          ...values,
          start_date: values.start_date ? formatDate(values.start_date) : '',
          end_date: values.end_date ? formatDate(values.end_date) : '',
        });
      }

      navigate(`${ROUTES.PROJECTS.LIST}`);
    },
  });

  useEffect(() => {
    if (workspaces) {
      setFieldValue('workspace_id', workspaces[0].id);
    }
  }, [workspaces]);

  if (loading) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Create Projects
          </h2>
          <div className="flex gap-2">
            <Link
              to={ROUTES.PROJECTS.LIST}
              className="px-4 py-2 text-gray-800 rounded-lg transition-colors flex items-center"
            >
              Cancel
            </Link>

            {project?.id && (
              <Link
                to={ROUTES.PROJECTS.VIEW(project.id)}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center"
              >
                View
              </Link>
            )}
            <Button
              disabled={isSubmitting}
              type="submit"
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center"
              isLoading={loading}
            >
              Save Project
            </Button>
          </div>
        </div>

        <div className="p-6 bg-white border shadow-sm border-neutral-200/30 rounded-lg">
          <div className="flex">
            {/* Left side containing inputs */}
            <div className="w-full lg:w-1/2">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="required">
                    Project Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter project name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    className={`${
                      errors.name && touched.name
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                    }`}
                  />
                  {errors.name && touched.name && (
                    <ErrorMessage error={errors.name} />
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="workspace_id" className="required">
                    Workspace
                  </Label>
                  <Select
                    id="workspace_id"
                    name="workspace_id"
                    onChange={(e) =>
                      handleChange({
                        target: {
                          name: 'workspace_id',
                          value: parseInt(e.target.value, 10),
                        },
                      })
                    }
                    onBlur={handleBlur}
                    value={values.workspace_id}
                    className={`${
                      errors.workspace_id && touched.workspace_id
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                    }`}
                  >
                    {workspaces?.map((org) => (
                      <option key={org.id} value={org.id}>
                        {org.name}
                      </option>
                    ))}
                  </Select>
                  {errors.workspace_id && touched.workspace_id && (
                    <ErrorMessage error={errors.workspace_id} />
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status" className="required">
                    Status
                  </Label>
                  <Select
                    id="status"
                    name="status"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.status}
                    className={`${
                      errors.status && touched.status
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                    }`}
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                    <option value="COMPLETED">Completed</option>
                  </Select>
                  {errors.status && touched.status && (
                    <ErrorMessage error={errors.status} />
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="start_date" className="required">
                    Start Date
                  </Label>
                  <Input
                    id="start_date"
                    name="start_date"
                    type="date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.start_date}
                    className={`${
                      errors.start_date && touched.start_date
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                    }`}
                  />
                  {errors.start_date && touched.start_date && (
                    <ErrorMessage error={errors.start_date} />
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="end_date" className="required">
                    End Date
                  </Label>
                  <Input
                    id="end_date"
                    name="end_date"
                    type="date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.end_date}
                    className={`${
                      errors.end_date && touched.end_date
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                    }`}
                  />
                  {errors.end_date && touched.end_date && (
                    <ErrorMessage error={errors.end_date} />
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
                    className={`h-32 resize-none ${
                      errors.description && touched.description
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                    }`}
                  />
                  {errors.description && touched.description && (
                    <ErrorMessage error={errors.description} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default Create;
