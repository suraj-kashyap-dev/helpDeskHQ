import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { httpClient } from '../utils/httpClient';
import { USERS } from '../config/constant';
import { ApiState } from '../types/apiState.types';
import { User, UserFormValues } from '../types/user.types';
import { ApiResponse } from '../types/apiResponse.types';
import { showToast } from '../utils/eventBus';

interface UserApiState extends ApiState {
  users: User[] | null;
  user: User | null;
}

export const useUserApi = () => {
  const [state, setState] = useState<UserApiState>({
    loading: false,
    error: null,
    users: null,
    user: null,
  });

  useEffect(() => {
    if (state.error) {
      showToast(state.error, {
        type: 'error',
      });
    }
  }, [state.error]);

  const handleError = (error: any) => {
    if (error instanceof AxiosError && error.response?.data?.message) {
      return error.response.data.message;
    }

    return error.message ?? 'An error occurred';
  };

  const fetch = async (): Promise<void> => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      const response = await httpClient.get<ApiResponse<User[]>>(USERS);

      setState((prev) => ({
        ...prev,
        users: response.data.data,
      }));
    } catch (error) {
      const errorMessage = handleError(error);
      setState((prev) => ({ ...prev, error: errorMessage }));
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  const show = async (id: number): Promise<void> => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      const response = await httpClient.get<ApiResponse<User>>(
        `${USERS}/${id}`,
      );

      setState((prev) => ({
        ...prev,
        user: response.data.data,
      }));
    } catch (error) {
      const errorMessage = handleError(error);
      setState((prev) => ({ ...prev, error: errorMessage }));
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  const create = async (payload: UserFormValues): Promise<User> => {
    try {
      setState((prev) => ({
        ...prev,
        loading: true,
        error: null,
        users: null,
        user: null,
      }));

      const formattedPayload = {
        ...payload,
        notification_settings:
          typeof payload.notification_settings === 'string'
            ? payload.notification_settings
            : JSON.stringify(payload.notification_settings),
      };

      const response = await httpClient.post<ApiResponse<User>>(
        USERS,
        formattedPayload,
      );

      const newUser = response.data.data;

      setState((prev) => ({
        ...prev,
        user: newUser,
        users: prev.users ? [...prev.users, newUser] : [newUser],
      }));

      showToast('User created successfully');

      return newUser;
    } catch (error) {
      const errorMessage = handleError(error);

      setState((prev) => ({ ...prev, error: errorMessage }));

      throw error;
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  const edit = async (id: number, payload: UserFormValues): Promise<User> => {
    try {
      setState((prev) => ({
        ...prev,
        loading: true,
        error: null,
      }));

      const formattedPayload = {
        ...payload,
        notification_settings:
          typeof payload.notification_settings === 'string'
            ? payload.notification_settings
            : JSON.stringify(payload.notification_settings),
      };

      const response = await httpClient.put<ApiResponse<User>>(
        `${USERS}/${id}`,
        formattedPayload,
      );

      const updateUser = response.data.data;

      setState((prev) => ({
        ...prev,
        users: prev.users
          ? prev.users.map((org) => (org.id === id ? updateUser : org))
          : null,
      }));

      showToast('User updated successfully');

      return updateUser;
    } catch (error) {
      const errorMessage = handleError(error);

      setState((prev) => ({ ...prev, error: errorMessage }));

      throw error;
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  const destroy = async (id: number) => {
    httpClient
      .delete(`${USERS}/${id}`)
      .then(() => {
        setState((prev) => ({
          ...prev,
          users: prev.users
            ? prev.users.filter((user) => user.id !== id)
            : null,
        }));

        showToast('User delete successfully');
      })
      .catch((error) => {
        const errorMessage = handleError(error);
        setState((prev) => ({ ...prev, error: errorMessage }));
      });
  };

  return {
    ...state,
    fetch,
    create,
    show,
    edit,
    destroy,
  };
};
