import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hook/useStore';
import {
  createNote,
  getNoteCollection,
  getNoteDetail,
  selectNote,
} from '../../store/slice/noteSlice';

export const useGetNoteCollection = () => {
  const dispatch = useAppDispatch();
  const { collection, detail, loading } = useAppSelector(selectNote);

  useEffect(() => {
    dispatch(getNoteCollection());
  }, [dispatch]);

  const isUninitialized = loading === 'idle';
  const isLoading = loading === 'pending';
  const isSuccess = loading === 'succeeded';
  const isError = loading === 'failed';

  return {
    collection,
    detail,
    isUninitialized,
    isLoading,
    isSuccess,
    isError,
  };
};

export const useGetNoteDetail = (id: string) => {
  const dispatch = useAppDispatch();
  const { detail, loading } = useAppSelector(selectNote);
  console.log(detail);

  useEffect(() => {
    dispatch(getNoteDetail(id));
  }, [dispatch, id]);

  const isUninitialized = loading === 'idle';
  const isLoading = loading === 'pending';
  const isError = loading === 'failed';
  const isSuccess = loading === 'succeeded';

  return {
    detail,
    isLoading,
    isError,
    isSuccess,
    isUninitialized,
  };
};

export const useCreateNote = () => {
  const dispatch = useAppDispatch();
  const { created, loading } = useAppSelector(selectNote);

  const createNoteHandler = (
    noteData: {
      title: string;
      content: string;
      important: boolean;
    },
    token: string
  ) => {
    dispatch(createNote({ ...noteData, token }));
  };

  const isUninitialized = loading === 'idle';
  const isLoading = loading === 'pending';
  const isError = loading === 'failed';
  const isSuccess = loading === 'succeeded';

  return {
    created,
    createNoteHandler,
    isLoading,
    isError,
    isSuccess,
    isUninitialized,
  };
};
