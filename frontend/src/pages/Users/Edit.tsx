import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTeamApi } from '../../hooks/useTeam';
import { TeamFormValues } from '../../types/team.types';
import { ErrorMessage } from '../../components/ui/form-controls/ErrorMessage';
import { Label } from '../../components/ui/form-controls/Label';
import { Textarea } from '../../components/ui/form-controls/Textarea';
import { Select } from '../../components/ui/form-controls/Select';
import { Input } from '../../components/ui/form-controls/Input';
import { Button } from '../../components/ui/form-controls/Button';
import Loading from '../../components/Loading';
import { ROUTES } from '../../routes/paths';
import { useWorkspaceApi } from '../../hooks/useWorkspace';

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Team name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters'),
  workspace_id: Yup.number().required('Organization is required'),
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

const Edit: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { edit, show, team } = useTeamApi();
  const { workspaces, loading, fetch } = useWorkspaceApi();

  useEffect(() => {
    fetch();

    if (id) {
      show(parseInt(id));
    }
  }, []);

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    isSubmitting,
  } = useFormik<TeamFormValues>({
    enableReinitialize: true,
    initialValues: {
      name: team?.name || '',
      workspace_id: team?.workspace.id || 0,
      settings: JSON.stringify({ theme: 'light', language: 'en' }, null, 2),
      description: team?.description || '',
    },
    validationSchema,
    onSubmit: async (values) => {
      if (id) {
        await edit(parseInt(id), values);

        navigate('/teams');
      }
    },
  });

  if (loading || !team) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Edit Team</h2>
          <div className="flex gap-2">
            <Link
              to={ROUTES.TEAM.LIST}
              className="px-4 py-2 text-gray-800 rounded-lg transition-colors flex items-center"
            >
              Cancel
            </Link>

            <Link
              to={ROUTES.TEAM.VIEW(team.id)}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center"
            >
              View
            </Link>

            <Button
              disabled={isSubmitting}
              type="submit"
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center"
              isLoading={loading}
            >
              Save Team
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6 bg-white border shadow-sm border-neutral-200/30 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-6">
              <div className="flex-1 space-y-2">
                <Label htmlFor="name" className="required">
                  Team Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter team name"
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
                <Label htmlFor="workspace_id" className="required">
                  Workspace
                </Label>
                <Select
                  id="workspace_id"
                  name="workspace_id"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.workspace_id}
                  className={`mt-1 block w-full rounded-md shadow-sm ${errors.workspace_id && touched.workspace_id ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}`}
                >
                  {workspaces?.map((workspace) => (
                    <option key={workspace.id} value={workspace.id}>
                      {workspace.name}
                    </option>
                  ))}
                </Select>
                {errors.workspace_id && touched.workspace_id && (
                  <ErrorMessage error={errors.workspace_id} />
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter team description"
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

export default Edit;
