import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { httpClient } from '../utils/httpClient';
import { TEAMS } from '../config/constant';
import { ApiState } from '../types/apiState.types';
import { Team, TeamFormValues } from '../types/team.types';
import { ApiResponse } from '../types/apiResponse.types';
import { showToast } from '../utils/eventBus';

interface TeamApiState extends ApiState {
  teams: Team[] | null;
  team: Team | null;
}

export const useTeamApi = () => {
  const [state, setState] = useState<TeamApiState>({
    loading: false,
    error: null,
    teams: null,
    team: null,
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

      const response = await httpClient.get<ApiResponse<Team[]>>(TEAMS);

      setState((prev) => ({
        ...prev,
        teams: response.data.data,
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

      const response = await httpClient.get<ApiResponse<Team>>(
        `${TEAMS}/${id}`,
      );

      setState((prev) => ({
        ...prev,
        team: response.data.data,
      }));
    } catch (error) {
      const errorMessage = handleError(error);
      setState((prev) => ({ ...prev, error: errorMessage }));
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  const create = async (payload: TeamFormValues): Promise<Team> => {
    try {
      setState((prev) => ({
        ...prev,
        loading: true,
        error: null,
        teams: null,
        team: null,
      }));

      const formattedPayload = {
        ...payload,
        settings:
          typeof payload.settings === 'string'
            ? payload.settings
            : JSON.stringify(payload.settings),
      };

      const response = await httpClient.post<ApiResponse<Team>>(
        TEAMS,
        formattedPayload,
      );

      const newTeam = response.data.data;

      setState((prev) => ({
        ...prev,
        team: newTeam,
        teams: prev.teams ? [...prev.teams, newTeam] : [newTeam],
      }));

      showToast('Team created successfully');

      return newTeam;
    } catch (error) {
      const errorMessage = handleError(error);

      setState((prev) => ({ ...prev, error: errorMessage }));

      throw error;
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  const edit = async (id: number, payload: TeamFormValues): Promise<Team> => {
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

      const response = await httpClient.put<ApiResponse<Team>>(
        `${TEAMS}/${id}`,
        formattedPayload,
      );

      const updatedTeam = response.data.data;

      setState((prev) => ({
        ...prev,
        teams: prev.teams
          ? prev.teams.map((org) => (org.id === id ? updatedTeam : org))
          : null,
      }));

      showToast('Team updated successfully');

      return updatedTeam;
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
      .delete(`${TEAMS}/${id}`)
      .then(() => {
        setState((prev) => ({
          ...prev,
          teams: prev.teams ? prev.teams.filter((org) => org.id !== id) : null,
        }));

        showToast('Team delete successfully');
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
