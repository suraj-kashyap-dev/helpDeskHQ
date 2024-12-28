import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { httpClient } from '../utils/httpClient';
import { WORKSPACES } from '../config/constant';
import { ApiState } from '../types/apiState.types';
import { Workspace, WorkspaceFormValues } from '../types/workspace.types';
import { ApiResponse } from '../types/apiResponse.types';
import { showToast } from '../utils/eventBus';

interface WorkspaceApiState extends ApiState {
  workspaces: Workspace[] | null;
  workspace: Workspace | null;
}

export const useWorkspaceApi = () => {
  const [state, setState] = useState<WorkspaceApiState>({
    loading: false,
    error: null,
    workspaces: null,
    workspace: null,
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

      const response =
        await httpClient.get<ApiResponse<Workspace[]>>(WORKSPACES);

      setState((prev) => ({
        ...prev,
        workspaces: response.data.data,
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

      const response = await httpClient.get<ApiResponse<Workspace>>(
        `${WORKSPACES}/${id}`,
      );

      setState((prev) => ({
        ...prev,
        workspace: response.data.data,
      }));
    } catch (error) {
      const errorMessage = handleError(error);
      setState((prev) => ({ ...prev, error: errorMessage }));
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  const create = async (payload: WorkspaceFormValues): Promise<Workspace> => {
    try {
      setState((prev) => ({
        ...prev,
        loading: true,
        error: null,
        organization: null,
      }));

      const formattedPayload = {
        ...payload,
        settings:
          typeof payload.settings === 'string'
            ? payload.settings
            : JSON.stringify(payload.settings),
      };

      const response = await httpClient.post<ApiResponse<Workspace>>(
        WORKSPACES,
        formattedPayload,
      );

      const newWorkspace = response.data.data;

      setState((prev) => ({
        ...prev,
        workspace: newWorkspace,
        workspaces: prev.workspaces
          ? [...prev.workspaces, newWorkspace]
          : [newWorkspace],
      }));

      showToast('Organization created successfully');

      return newWorkspace;
    } catch (error) {
      const errorMessage = handleError(error);

      setState((prev) => ({ ...prev, error: errorMessage }));

      throw error;
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  const edit = async (
    id: number,
    payload: WorkspaceFormValues,
  ): Promise<Workspace> => {
    try {
      setState((prev) => ({
        ...prev,
        loading: true,
        error: null,
      }));

      const formattedPayload = {
        ...payload,
        settings:
          typeof payload.settings === 'string'
            ? payload.settings
            : JSON.stringify(payload.settings),
      };

      const response = await httpClient.put<ApiResponse<Workspace>>(
        `${WORKSPACES}/${id}`,
        formattedPayload,
      );

      const updatedWorkspace = response.data.data;

      setState((prev) => ({
        ...prev,
        workspaces: prev.workspaces
          ? prev.workspaces.map((org) =>
              org.id === id ? updatedWorkspace : org,
            )
          : null,
      }));

      showToast('Organization updated successfully');

      return updatedWorkspace;
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
      .delete(`${WORKSPACES}/${id}`)
      .then(() => {
        setState((prev) => ({
          ...prev,
          workspaces: prev.workspaces
            ? prev.workspaces.filter((org) => org.id !== id)
            : null,
        }));

        showToast('Organization delete successfully');
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
