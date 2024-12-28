import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { httpClient } from '../utils/httpClient';
import { ORGANIZATIONS } from '../config/constant';
import { ApiState } from '../types/apiState.types';
import {
  Organization,
  OrganizationFormValues,
} from '../types/organization.types';
import { ApiResponse } from '../types/apiResponse.types';
import { showToast } from '../utils/eventBus';

interface OrganizationApiState extends ApiState {
  organizations: Organization[] | null;
  createdOrganization: Organization | null;
}

export const useOrganizationApi = () => {
  const [state, setState] = useState<OrganizationApiState>({
    loading: false,
    error: null,
    organizations: null,
    createdOrganization: null,
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

  const fetchOrganization = async (): Promise<void> => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      const response =
        await httpClient.get<ApiResponse<Organization[]>>(ORGANIZATIONS);

      setState((prev) => ({
        ...prev,
        organizations: response.data.data,
      }));
    } catch (error) {
      const errorMessage = handleError(error);
      setState((prev) => ({ ...prev, error: errorMessage }));
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  const createOrganization = async (
    payload: OrganizationFormValues,
  ): Promise<Organization> => {
    try {
      setState((prev) => ({
        ...prev,
        loading: true,
        error: null,
        createdOrganization: null,
      }));

      const formattedPayload = {
        ...payload,
        settings:
          typeof payload.settings === 'string'
            ? payload.settings
            : JSON.stringify(payload.settings),
      };

      const response = await httpClient.post<ApiResponse<Organization>>(
        ORGANIZATIONS,
        formattedPayload,
      );

      const newOrganization = response.data.data;

      setState((prev) => ({
        ...prev,
        createdOrganization: newOrganization,
        organizations: prev.organizations
          ? [...prev.organizations, newOrganization]
          : [newOrganization],
      }));

      showToast('Organization created successfully');

      return newOrganization;
    } catch (error) {
      const errorMessage = handleError(error);
      setState((prev) => ({ ...prev, error: errorMessage }));
      throw error;
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  const deleteOrganization = (id: number) => {
    httpClient
      .delete(`${ORGANIZATIONS}/${id}`)
      .then(() => {
        setState((prev) => ({
          ...prev,
          organizations: prev.organizations
            ? prev.organizations.filter((org) => org.id !== id)
            : null,
        }));

        showToast('Organization delete successfully');
      })
      .catch((error) => {
        const errorMessage = handleError(error);
        setState((prev) => ({ ...prev, error: errorMessage }));
      });
  };

  const clearCreatedOrganization = () => {
    setState((prev) => ({
      ...prev,
      createdOrganization: null,
    }));
  };

  return {
    ...state,
    fetchOrganization,
    createOrganization,
    clearCreatedOrganization,
    deleteOrganization,
  };
};
