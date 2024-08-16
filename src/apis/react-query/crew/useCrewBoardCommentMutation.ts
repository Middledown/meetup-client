import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import crewBoardCommentQueryKey from '@/apis/query-key/crewBoardCommentQueryKey';
import {
  DeleteBoardCommentAPI,
  PostCreateBoardCommentAPI,
  PutUpdateBoardCommentAPI,
} from '@/apis/server/crew/crewBoardCommentAPI';
import { PostBoardCommentRequestBody } from '@/types/crew/crewBoardCommentType';

export const useCrewBoardCommentMutation = () => {
  const queryClient = useQueryClient();

  const PostCreateBoardComment = useMutation({
    mutationFn: (params: {
      crewId: string;
      boardId: string;
      body: PostBoardCommentRequestBody;
    }) => PostCreateBoardCommentAPI(params.crewId, params.boardId, params.body),
    onSuccess: async (_, params) => {
      await queryClient.invalidateQueries({
        queryKey: crewBoardCommentQueryKey.crewBoardCommentList(
          params.crewId,
          params.boardId,
        ),
      });

      toast.success('댓글이 작성되었습니다.');
    },
    onError: () => {},
  });

  const PutUpdateBoardComment = useMutation({
    mutationFn: (params: {
      crewId: string;
      boardId: string;
      commentId: string;
      body: PostBoardCommentRequestBody;
    }) =>
      PutUpdateBoardCommentAPI(
        params.crewId,
        params.boardId,
        params.commentId,
        params.body,
      ),
    onSuccess: async (_, params) => {
      await queryClient.invalidateQueries({
        queryKey: crewBoardCommentQueryKey.crewBoardCommentList(
          params.crewId,
          params.boardId,
        ),
      });

      toast.success('댓글이 수정되었습니다.');
    },
    onError: () => {},
  });

  const DeleteBoardComment = useMutation({
    mutationFn: (params: {
      crewId: string;
      boardId: string;
      commentId: string;
      crewMemberId: string;
    }) =>
      DeleteBoardCommentAPI(params.crewId, params.boardId, params.commentId),
    onSuccess: async (_, params) => {
      await queryClient.invalidateQueries({
        queryKey: crewBoardCommentQueryKey.crewBoardCommentList(
          params.crewId,
          params.boardId,
        ),
      });

      toast.success('댓글이 삭제되었습니다.');
    },
    onError: () => {},
  });

  return { PostCreateBoardComment, PutUpdateBoardComment, DeleteBoardComment };
};
