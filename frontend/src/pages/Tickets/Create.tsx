import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ErrorMessage } from '../../components/ui/form-controls/ErrorMessage';
import { Label } from '../../components/ui/form-controls/Label';
import { Textarea } from '../../components/ui/form-controls/Textarea';
import { Select } from '../../components/ui/form-controls/Select';
import { Input } from '../../components/ui/form-controls/Input';
import { Button } from '../../components/ui/form-controls/Button';
import Loading from '../../components/Loading';
import { TicketFormValues } from '../../types/tickets.types';
import { useTicketApi } from '../../hooks/useTickets';
import { useUserApi } from '../../hooks/useUserApi';
import { useProjectApi } from '../../hooks/useProjectApi';

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Ticket name is required')
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

const initialValues: TicketFormValues = {
  project_id: 0,
  reporter_id: 0,
  assignee_id: 0,
  title: '',
  description: '',
  type: 'BUG',
  priority: 'LOW',
  status: 'OPEN',
  impact: 'LOW',
  estimated_hours: 0,
  custom_fields: '',
  parent_ticket: null,
  position: 0,
  due_date: new Date().toISOString(),
  resolved_at: new Date().toISOString(),
};

const Create: React.FC = () => {
  const navigate = useNavigate();
  const { create } = useTicketApi();
  const {
    projects,
    loading: loadingProjects,
    fetch: fetchProjects,
  } = useProjectApi();
  const { users, loading: loadingUsers, fetch: fetchUsers } = useUserApi();

  useEffect(() => {
    fetchUsers();
    fetchProjects();
  }, []);

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    isSubmitting,
    setFieldValue,
  } = useFormik<TicketFormValues>({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);

      await create(values);

      navigate('/tickets');
    },
  });

  useEffect(() => {
    if (projects) {
      setFieldValue('project_id', projects[0].id);
    }

    if (users) {
      setFieldValue('reporter_id', users[0]?.id);
      setFieldValue('assignee_id', users[0].id);
    }
  }, [projects, users]);

  if (loadingUsers || loadingProjects) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Create Ticket</h2>
          <div className="flex gap-2">
            <Link
              to="/tickets"
              className="px-4 py-2 text-gray-700 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors flex items-center gap-2 border border-gray-200"
            >
              Cancel
            </Link>

            <Button
              disabled={isSubmitting}
              isLoading={isSubmitting}
              type="submit"
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center"
            >
              Save Ticket
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6 bg-white border shadow-sm border-neutral-200/30 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="title" className="required">
                  Ticket Title
                </Label>

                <Input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Enter ticket title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                  className={`mt-1 block w-full rounded-md shadow-sm ${errors.title && touched.title ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}`}
                />

                {errors.title && touched.title && (
                  <ErrorMessage error={errors.title} />
                )}
              </div>

              <div className="flex-1 space-y-2">
                <Label htmlFor="project_id" className="required">
                  Project
                </Label>

                <Select
                  id="project_id"
                  name="project_id"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.project_id}
                  className={`mt-1 block w-full rounded-md shadow-sm ${errors.project_id && touched.project_id ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}`}
                >
                  {projects?.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </Select>

                {errors.project_id && touched.project_id && (
                  <ErrorMessage error={errors.project_id} />
                )}
              </div>

              <div className="flex-1 space-y-2">
                <Label htmlFor="project_id" className="required">
                  Reporter
                </Label>

                <Select
                  id="reporter_id"
                  name="reporter_id"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.reporter_id}
                  className={`mt-1 block w-full rounded-md shadow-sm ${errors.reporter_id && touched.reporter_id ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}`}
                >
                  {users?.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.fullName}
                    </option>
                  ))}
                </Select>

                {errors.reporter_id && touched.reporter_id && (
                  <ErrorMessage error={errors.reporter_id} />
                )}
              </div>

              <div className="flex-1 space-y-2">
                <Label htmlFor="assignee_id" className="required">
                  Assignee
                </Label>

                <Select
                  id="assignee_id"
                  name="assignee_id"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.assignee_id}
                  className={`mt-1 block w-full rounded-md shadow-sm ${errors.assignee_id && touched.assignee_id ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}`}
                >
                  {users?.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.fullName}
                    </option>
                  ))}
                </Select>

                {errors.assignee_id && touched.assignee_id && (
                  <ErrorMessage error={errors.assignee_id} />
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>

                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter ticket description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  className={`h-32 resize-none mt-1 block w-full rounded-md shadow-sm ${errors.description && touched.description ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}`}
                />

                {errors.description && touched.description && (
                  <ErrorMessage error={errors.description} />
                )}
              </div>

              <div className="flex-1 space-y-2">
                <Label htmlFor="type" className="required">
                  Type
                </Label>
                <Select
                  id="type"
                  name="type"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.type}
                  className={`mt-1 block w-full rounded-md shadow-sm ${
                    errors.type && touched.type
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                  }`}
                >
                  <option value="BUG">BUG</option>
                  <option value="FEATURE">FEATURE</option>
                </Select>
                {errors.type && touched.type && (
                  <ErrorMessage error={errors.type} />
                )}
              </div>

              {/* Priority Field */}
              <div className="flex-1 space-y-2">
                <Label htmlFor="priority" className="required">
                  Priority
                </Label>
                <Select
                  id="priority"
                  name="priority"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.priority}
                  className={`mt-1 block w-full rounded-md shadow-sm ${
                    errors.priority && touched.priority
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                  }`}
                >
                  <option value="LOW">LOW</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HIGH">HIGH</option>
                  <option value="URGENT">URGENT</option>
                </Select>
                {errors.priority && touched.priority && (
                  <ErrorMessage error={errors.priority} />
                )}
              </div>

              {/* Status Field */}
              <div className="flex-1 space-y-2">
                <Label htmlFor="status" className="required">
                  Status
                </Label>
                <Select
                  id="status"
                  name="status"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.status}
                  className={`mt-1 block w-full rounded-md shadow-sm ${
                    errors.status && touched.status
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                  }`}
                >
                  <option value="OPEN">OPEN</option>
                  <option value="IN_PROGRESS">IN_PROGRESS</option>
                  <option value="CLOSED">CLOSED</option>
                </Select>
                {errors.status && touched.status && (
                  <ErrorMessage error={errors.status} />
                )}
              </div>

              {/* Impact Field */}
              <div className="flex-1 space-y-2">
                <Label htmlFor="impact" className="required">
                  Impact
                </Label>
                <Select
                  id="impact"
                  name="impact"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.impact}
                  className={`mt-1 block w-full rounded-md shadow-sm ${
                    errors.impact && touched.impact
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                  }`}
                >
                  <option value="LOW">LOW</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HIGH">HIGH</option>
                </Select>
                {errors.impact && touched.impact && (
                  <ErrorMessage error={errors.impact} />
                )}
              </div>

              {/* Estimated Hours Field */}
              <div className="flex-1 space-y-2">
                <Label htmlFor="estimated_hours" className="required">
                  Estimated Hours
                </Label>
                <Input
                  id="estimated_hours"
                  name="estimated_hours"
                  type="number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.estimated_hours}
                  className={`mt-1 block w-full rounded-md shadow-sm ${
                    errors.estimated_hours && touched.estimated_hours
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                  }`}
                />
                {errors.estimated_hours && touched.estimated_hours && (
                  <ErrorMessage error={errors.estimated_hours} />
                )}
              </div>

              {/* Due Date */}
              <div className="flex-1 space-y-2">
                <Label htmlFor="due_date">Due Date</Label>
                <Input
                  id="due_date"
                  name="due_date"
                  type="datetime-local"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.due_date || ''}
                  className={`mt-1 block w-full rounded-md shadow-sm ${
                    errors.due_date && touched.due_date
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                  }`}
                />
                {errors.due_date && touched.due_date && (
                  <ErrorMessage error={errors.due_date} />
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
