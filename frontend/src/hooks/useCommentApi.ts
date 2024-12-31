import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { httpClient } from '../utils/httpClient';
import { COMMENTS } from '../config/constant';
import { ApiState } from '../types/apiState.types';
import { ApiResponse } from '../types/apiResponse.types';
import { showToast } from '../utils/eventBus';
import { Comment } from '../types/comment.types';

interface CommentApiState extends ApiState {
  comments: Comment[] | null;
  comment: Comment | null;
}

export const useCommentApi = () => {
  const [state, setState] = useState<CommentApiState>({
    loading: false,
    error: null,
    comments: null,
    comment: null,
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
        await httpClient.get<ApiResponse<Comment[]>>(COMMENTS);

      setState((prev) => ({
        ...prev,
        comments: response.data.data,
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

      const response = await httpClient.get<ApiResponse<Comment>>(
        `${COMMENTS}/${id}`,
      );

      setState((prev) => ({
        ...prev,
        comment: response.data.data,
      }));
    } catch (error) {
      const errorMessage = handleError(error);
      setState((prev) => ({ ...prev, error: errorMessage }));
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

//   const createComment = async (
//     payload: CommentFormValues,
//   ): Promise<Comment> => {
//     try {
//       setState((prev) => ({
//         ...prev,
//         loading: true,
//         error: null,
//         comment: null,
//       }));

//       const formattedPayload = {
//         ...payload,
//         settings:
//           typeof payload.settings === 'string'
//             ? payload.settings
//             : JSON.stringify(payload.settings),
//       };

//       const response = await httpClient.post<ApiResponse<Comment>>(
//         COMMENTS,
//         formattedPayload,
//       );

//       const newComment = response.data.data;

//       setState((prev) => ({
//         ...prev,
//         comment: newComment,
//         comments: prev.comments
//           ? [...prev.comments, newComment]
//           : [newComment],
//       }));

//       showToast('Comment created successfully');

//       return newComment;
//     } catch (error) {
//       const errorMessage = handleError(error);

//       setState((prev) => ({ ...prev, error: errorMessage }));

//       throw error;
//     } finally {
//       setState((prev) => ({ ...prev, loading: false }));
//     }
//   };

//   const editComment = async (
//     id: number,
//     payload: CommentFormValues,
//   ): Promise<Comment> => {
//     try {
//       setState((prev) => ({
//         ...prev,
//         loading: true,
//         error: null,
//       }));

//       const formattedPayload = {
//         ...payload,
//         settings:
//           typeof payload.settings === 'string'
//             ? payload.settings
//             : JSON.stringify(payload.settings),
//       };

//       const response = await httpClient.put<ApiResponse<Comment>>(
//         `${COMMENTS}/${id}`,
//         formattedPayload,
//       );

//       const updatedComment = response.data.data;

//       setState((prev) => ({
//         ...prev,
//         comments: prev.comments
//           ? prev.comments.map((org) =>
//               org.id === id ? updatedComment : org,
//             )
//           : null,
//       }));

//       showToast('Comment updated successfully');

//       return updatedComment;
//     } catch (error) {
//       const errorMessage = handleError(error);

//       setState((prev) => ({ ...prev, error: errorMessage }));

//       throw error;
//     } finally {
//       setState((prev) => ({ ...prev, loading: false }));
//     }
//   };

  const destroy = (id: number) => {
    httpClient
      .delete(`${COMMENTS}/${id}`)
      .then(() => {
        setState((prev) => ({
          ...prev,
          comments: prev.comments
            ? prev.comments.filter((org) => org.id !== id)
            : null,
        }));

        showToast('Comment delete successfully');
      })
      .catch((error) => {
        const errorMessage = handleError(error);
        setState((prev) => ({ ...prev, error: errorMessage }));
      });
  };

  const clearCreatedComment = () => {
    setState((prev) => ({
      ...prev,
      comment: null,
    }));
  };

  return {
    ...state,
    fetch,
    // createComment,
    show,
    // editComment,
    clearCreatedComment,
    destroy,
  };
};
