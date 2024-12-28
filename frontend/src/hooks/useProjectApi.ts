import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { httpClient } from '../utils/httpClient';
import { PROJECTS } from '../config/constant';
import { ApiState } from '../types/apiState.types';
import { ApiResponse } from '../types/apiResponse.types';
import { showToast } from '../utils/eventBus';
import { Project, ProjectFormValues } from '../types/projects.types';

interface ProjectApiState extends ApiState {
  projects: Project[] | null;
  project: Project | null;
}

export const useProjectApi = () => {
  const [state, setState] = useState<ProjectApiState>({
    loading: false,
    error: null,
    projects: null,
    project: null,
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

      const response = await httpClient.get<ApiResponse<Project[]>>(PROJECTS);

      setState((prev) => ({
        ...prev,
        projects: response.data.data,
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

      const response = await httpClient.get<ApiResponse<Project>>(
        `${PROJECTS}/${id}`,
      );

      setState((prev) => ({
        ...prev,
        project: response.data.data,
      }));
    } catch (error) {
      const errorMessage = handleError(error);
      setState((prev) => ({ ...prev, error: errorMessage }));
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  const create = async (payload: ProjectFormValues): Promise<Project> => {
    try {
      setState((prev) => ({
        ...prev,
        loading: true,
        error: null,
        project: null,
        projects: null,
      }));

      const formattedPayload = {
        ...payload,
        settings:
          typeof payload.settings === 'string'
            ? payload.settings
            : JSON.stringify(payload.settings),
      };

      const response = await httpClient.post<ApiResponse<Project>>(
        PROJECTS,
        formattedPayload,
      );

      const newProject = response.data.data;

      setState((prev) => ({
        ...prev,
        project: newProject,
        projects: prev.projects ? [...prev.projects, newProject] : [newProject],
      }));

      showToast('Project created successfully');

      return newProject;
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
    payload: ProjectFormValues,
  ): Promise<Project> => {
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

      const response = await httpClient.put<ApiResponse<Project>>(
        `${PROJECTS}/${id}`,
        formattedPayload,
      );

      const updatedProject = response.data.data;

      setState((prev) => ({
        ...prev,
        projects: prev.projects
          ? prev.projects.map((project) =>
              project.id === id ? updatedProject : project,
            )
          : null,
      }));

      showToast('Project updated successfully');

      return updatedProject;
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
      .delete(`${PROJECTS}/${id}`)
      .then(() => {
        setState((prev) => ({
          ...prev,
          projects: prev.projects
            ? prev.projects.filter((project) => project.id !== id)
            : null,
        }));

        showToast('Project delete successfully');
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
