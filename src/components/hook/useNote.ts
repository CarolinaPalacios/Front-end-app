import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hook/useStore';
import {
  createNote,
  deleteNote,
  getNoteCollection,
  getNoteDetail,
  updateNote,
  selectNote,
} from '../../store/slice/noteSlice';
import { Note } from '../../types/API';

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

export const useDeleteNote = () => {
  const dispatch = useAppDispatch();
  const { collection, loading } = useAppSelector(selectNote);

  const deleteNoteHandler = (id: string) => {
    dispatch(deleteNote(id));
  };

  const isUninitialized = loading === 'idle';
  const isLoading = loading === 'pending';
  const isError = loading === 'failed';
  const isSuccess = loading === 'succeeded';

  return {
    collection,
    deleteNoteHandler,
    isLoading,
    isError,
    isSuccess,
    isUninitialized,
  };
};

export const useUpdateNote = () => {
  const dispatch = useAppDispatch();
  const { detail, loading } = useAppSelector(selectNote);

  const toggleImportance = (id: string) => {
    dispatch(updateNote({ id, updatedData: { important: !detail.important } }));
  };

  const updateNoteData = (id: string, updatedData: Partial<Note>) => {
    dispatch(updateNote({ id, updatedData }));
  };

  const isUninitialized = loading === 'idle';
  const isLoading = loading === 'pending';
  const isError = loading === 'failed';
  const isSuccess = loading === 'succeeded';

  return {
    detail,
    toggleImportance,
    updateNoteData,
    isLoading,
    isError,
    isSuccess,
    isUninitialized,
  };
};
