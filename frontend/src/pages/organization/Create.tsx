import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useOrganizationApi } from '../../hooks/useOrganization';
import { OrganizationFormValues } from '../../types/organization.types';
import { ErrorMessage } from '../../components/ui/form-controls/ErrorMessage';
import { Label } from '../../components/ui/form-controls/Label';
import { Textarea } from '../../components/ui/form-controls/Textarea';
import { Select } from '../../components/ui/form-controls/Select';
import { ArrowLeft } from 'lucide-react';
import { Input } from '../../components/ui/form-controls/Input';
import { showToast } from '../../utils/toast';
import { Button } from '../../components/ui/form-controls/Button';

const subscriptionTypes = [
  { value: 'Free', label: 'Free Plan' },
  { value: 'Standard', label: 'Standard Plan' },
  { value: 'Premium', label: 'Premium Plan' },
];

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Organization name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters'),
  domain: Yup.string()
    .required('Organization domain is required')
    .matches(
      /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/,
      'Please enter a valid domain'
    ),
  subscriptionType: Yup.string()
    .required('Subscription type is required')
    .oneOf(['Free', 'Standard', 'Premium'], 'Invalid subscription type'),
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

const initialValues: OrganizationFormValues = {
  name: '',
  domain: '',
  subscriptionType: 'Free',
  settings: JSON.stringify({ theme: 'light', language: 'en' }, null, 2),
};

const CreateOrganization: React.FC = () => {
  const navigate = useNavigate();
  const { createOrganization, loading, error } = useOrganizationApi();

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    isSubmitting,
  } = useFormik<OrganizationFormValues>({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await createOrganization(values);
        navigate('/dashboard/organizations');
        showToast('Organization created successfully', { type: 'success' });
      } catch (error) {
        showToast('Something went wrong', { type: 'warning' });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <React.Fragment>
      <div className="space-y-6 ">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link
                to="/dashboard/organizations"
                className="flex items-center space-x-2 text-neutral-500 hover:text-neutral-700"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back</span>
              </Link>
              <h2 className="text-2xl font-semibold">Create Organization</h2>
            </div>
          </div>

          <div className="bg-white border shadow-sm  border-neutral-200/30 rounded-lg">
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="domain">Organization Name</Label>

                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter organization name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    className={`mt-1 block w-full rounded-md shadow-sm ${
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
                  <Label htmlFor="domain">Domain</Label>
                  <Input
                    id="domain"
                    name="domain"
                    type="text"
                    placeholder="Enter organization domain"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.domain}
                    className={`mt-1 block w-full rounded-md shadow-sm ${
                      errors.name && touched.domain
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                    }`}
                  />
                  {errors.domain && touched.domain && (
                    <ErrorMessage error={errors.domain} />
                  )}
                </div>

                {/* Subscription Type Field */}
                <div className="space-y-2">
                  <Label htmlFor="subscriptionType">Subscription Type</Label>

                  <Select
                    name="subscriptionType"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.subscriptionType}
                    className={`mt-1 block w-full rounded-md shadow-sm ${
                      errors.subscriptionType && touched.subscriptionType
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                    }`}
                    required
                    options={subscriptionTypes}
                  ></Select>
                  {errors.subscriptionType && touched.subscriptionType && (
                    <ErrorMessage error={errors.subscriptionType} />
                  )}
                </div>

                {/* Settings Field */}
                <div className="space-y-2">
                  <Label htmlFor="settings">Settings (JSON)</Label>

                  <Textarea
                    name="settings"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.settings}
                    className={`h-32 resize-none mt-1 block w-full rounded-md shadow-sm ${
                      errors.settings && touched.settings
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                    }`}
                  />
                  {errors.settings && touched.settings && (
                    <ErrorMessage error={errors.settings} />
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Link
                  to="/dashboard/organizations"
                  className="px-4 py-2 mr-4 border border-neutral-200/30 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  Cancel
                </Link>
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Organization
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreateOrganization;
