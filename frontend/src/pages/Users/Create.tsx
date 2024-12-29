import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ErrorMessage } from '../../components/ui/form-controls/ErrorMessage';
import { Label } from '../../components/ui/form-controls/Label';
import { Input } from '../../components/ui/form-controls/Input';
import { Button } from '../../components/ui/form-controls/Button';
import Loading from '../../components/Loading';
import { ROUTES } from '../../routes/paths';
import { UserFormValues } from '../../types/user.types';
import { useUserApi } from '../../hooks/useUserApi';
import { useOrganizationApi } from '../../hooks/useOrganization';
import { Select } from '../../components/ui/form-controls/Select';

const validationSchema = Yup.object({
  full_name: Yup.string()
    .required('Full name is required')
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must not exceed 100 characters'),
  organization_id: Yup.number().required('Organization is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  status: Yup.string().required('Status is required'),
  password: Yup.string().required('Password is required'),
  confirmation_password: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Confirmation password is required'),
  notification_settings: Yup.string().test(
    'valid-json',
    'Invalid JSON format',
    (value) => {
      if (!value) return true;
      try {
        JSON.parse(value);
        return true;
      } catch {
        return false;
      }
    },
  ),
});

const initialValues: UserFormValues = {
  full_name: '',
  organization_id: 0,
  notification_settings: '',
  email: '',
  password: '',
  confirmation_password: '',
  phone: '',
  status: 'ACTIVE',
  preferences: JSON.stringify({ theme: 'light', language: 'en' }, null, 2),
};

const Create: React.FC = () => {
  const navigate = useNavigate();
  const { loading, create } = useUserApi();
  const { organizations, fetchOrganization } = useOrganizationApi();

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
    setFieldValue,
  } = useFormik<UserFormValues>({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      await create(values);

      navigate(ROUTES.USER.LIST);
    },
  });

  useEffect(() => {
    if (organizations) {
      setFieldValue('organization_id', organizations[0].id);
    }
  }, [organizations]);

  if (loading) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Create User</h2>
          <div className="flex gap-2">
            <Link
              to={ROUTES.USER.LIST}
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
              Save User
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6 bg-white border shadow-sm border-neutral-200/30 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">
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
                  {organizations?.map((organization) => (
                    <option key={organization.id} value={organization.id}>
                      {organization.name}
                    </option>
                  ))}
                </Select>

                {errors.organization_id && touched.organization_id && (
                  <ErrorMessage error={errors.organization_id} />
                )}
              </div>

              <div className="flex-1 space-y-2">
                <Label htmlFor="full_name" className="required">
                  Full Name
                </Label>

                <Input
                  id="full_name"
                  name="full_name"
                  type="text"
                  placeholder="Enter full name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.full_name}
                  className={`mt-1 block w-full rounded-md shadow-sm ${errors.full_name && touched.full_name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}`}
                />

                {errors.full_name && touched.full_name && (
                  <ErrorMessage error={errors.full_name} />
                )}
              </div>

              <div className="flex-1 space-y-2">
                <Label htmlFor="email" className="required">
                  Email
                </Label>

                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter full name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className={`mt-1 block w-full rounded-md shadow-sm ${errors.email && touched.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}`}
                />

                {errors.email && touched.email && (
                  <ErrorMessage error={errors.email} />
                )}
              </div>

              <div className="flex-1 space-y-2">
                <Label htmlFor="phone" className="required">
                  Phone
                </Label>

                <Input
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="Enter phone number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone}
                  className={`mt-1 block w-full rounded-md shadow-sm ${errors.phone && touched.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}`}
                />

                {errors.phone && touched.phone && (
                  <ErrorMessage error={errors.phone} />
                )}
              </div>

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
                  className={`mt-1 block w-full rounded-md shadow-sm ${errors.status && touched.status ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}`}
                >
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                  <option value="SUSPENDED">Suspended</option>
                </Select>

                {errors.status && touched.status && (
                  <ErrorMessage error={errors.status} />
                )}
              </div>

              <div className="flex-1 space-y-2">
                <Label htmlFor="password" className="required">
                  Password
                </Label>

                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className={`mt-1 block w-full rounded-md shadow-sm ${errors.password && touched.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}`}
                />

                {errors.password && touched.password && (
                  <ErrorMessage error={errors.password} />
                )}
              </div>

              <div className="flex-1 space-y-2">
                <Label htmlFor="confirmation_password">Confirm Password</Label>

                <Input
                  id="confirmation_password"
                  name="confirmation_password"
                  type="confirmation_password"
                  placeholder="Enter confirmation Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmation_password}
                  className={`mt-1 block w-full rounded-md shadow-sm ${errors.confirmation_password && touched.confirmation_password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}`}
                />

                {errors.confirmation_password &&
                  touched.confirmation_password && (
                    <ErrorMessage error={errors.confirmation_password} />
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
