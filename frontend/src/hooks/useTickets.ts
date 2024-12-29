import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { httpClient } from '../utils/httpClient';
import { ApiState } from '../types/apiState.types';
import { ApiResponse } from '../types/apiResponse.types';
import { showToast } from '../utils/eventBus';
import { Ticket, TicketFormValues } from '../types/tickets.types';
import { TICKETS } from '../config/constant';

interface TicketApiState extends ApiState {
  tickets: Ticket[] | null;
  ticket: Ticket | null;
}

export const useTicketApi = () => {
  const [state, setState] = useState<TicketApiState>({
    loading: false,
    error: null,
    tickets: null,
    ticket: null,
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

      const response = await httpClient.get<ApiResponse<Ticket[]>>(TICKETS);

      setState((prev) => ({
        ...prev,
        tickets: response.data.data,
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

      const response = await httpClient.get<ApiResponse<Ticket>>(
        `${TICKETS}/${id}`,
      );

      setState((prev) => ({
        ...prev,
        ticket: response.data.data,
      }));
    } catch (error) {
      const errorMessage = handleError(error);
      setState((prev) => ({ ...prev, error: errorMessage }));
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  const create = async (payload: TicketFormValues): Promise<Ticket> => {
    try {
      setState((prev) => ({
        ...prev,
        loading: true,
        error: null,
        tickets: null,
        ticket: null,
      }));

      const response = await httpClient.post<ApiResponse<Ticket>>(
        TICKETS,
        payload,
      );

      const newTicket = response.data.data;

      setState((prev) => ({
        ...prev,
        ticket: newTicket,
        tickets: prev.tickets ? [...prev.tickets, newTicket] : [newTicket],
      }));

      showToast('Ticket created successfully');

      return newTicket;
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
    payload: TicketFormValues,
  ): Promise<Ticket> => {
    try {
      setState((prev) => ({
        ...prev,
        loading: true,
        error: null,
      }));

      const response = await httpClient.put<ApiResponse<Ticket>>(
        `${TICKETS}/${id}`,
        payload,
      );

      const updatedTicket = response.data.data;

      setState((prev) => ({
        ...prev,
        tickets: prev.tickets
          ? prev.tickets.map((org) => (org.id === id ? updatedTicket : org))
          : null,
      }));

      showToast('Ticket updated successfully');

      return updatedTicket;
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
      .delete(`${TICKETS}/${id}`)
      .then(() => {
        setState((prev) => ({
          ...prev,
          tickets: prev.tickets
            ? prev.tickets.filter((org) => org.id !== id)
            : null,
        }));

        showToast('Ticket delete successfully');
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
