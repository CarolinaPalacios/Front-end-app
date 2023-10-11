import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  fetchNoteCollection,
  fetchNoteDetail,
  sendCreateNoteRequest,
  sendDeleteNoteRequest,
} from '../../service/noteService';

import type { Note, NoteCreationData } from '../../types/API';
import type { RootState } from '../store';

export const getNoteCollection = createAsyncThunk(
  'note/getNoteCollection',
  async () => {
    const collection = await fetchNoteCollection();
    return collection;
  }
);

export const getNoteDetail = createAsyncThunk(
  'note/getNoteDetail',
  async (id: string) => {
    const detail = await fetchNoteDetail(id);
    return detail;
  }
);

export const createNote = createAsyncThunk(
  'note/createNote',
  async (noteData: NoteCreationData, thunkAPI) => {
    try {
      const { token } = (thunkAPI.getState() as RootState).authentication.user;
      const createdNote = await sendCreateNoteRequest(noteData, { token });

      return createdNote;
    } catch (error) {
      console.error(error);
    }
  }
);

export const deleteNote = createAsyncThunk(
  'note/deleteNote',
  async (id: string, thunkAPI) => {
    try {
      const { token } = (thunkAPI.getState() as RootState).authentication.user;

      await sendDeleteNoteRequest(id, { token });
    } catch (error) {
      console.error(error);
    }
  }
);

interface NoteState {
  collection: Note[];
  detail: Note;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  created: Note | undefined;
}

const initialState: NoteState = {
  collection: [],
  detail: {} as Note,
  loading: 'idle',
  created: undefined,
};

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNoteCollection.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getNoteCollection.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.collection = action.payload;
    });
    builder.addCase(getNoteCollection.rejected, (state) => {
      state.loading = 'failed';
    });
    builder.addCase(getNoteDetail.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getNoteDetail.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.detail = action.payload;
    });
    builder.addCase(getNoteDetail.rejected, (state) => {
      state.loading = 'failed';
    });
    builder.addCase(createNote.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(createNote.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.created = action.payload;
      state.collection.push(action.payload!);
    });
    builder.addCase(createNote.rejected, (state) => {
      state.loading = 'failed';
    });
    builder.addCase(deleteNote.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(deleteNote.fulfilled, (state) => {
      state.loading = 'succeeded';
      state.collection = state.collection.filter(
        (note) => note.id !== state.detail.id
      );
    });
    builder.addCase(deleteNote.rejected, (state) => {
      state.loading = 'failed';
    });
  },
});

export const selectNote = (state: RootState) => state.note;
export default noteSlice.reducer;
