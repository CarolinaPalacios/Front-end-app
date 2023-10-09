import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  fetchNoteCollection,
  fetchNoteDetail,
} from '../../service/noteService';

import type { Note } from '../../types/API';
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

interface NoteState {
  collection: Note[];
  detail: Note | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: NoteState = {
  collection: [],
  detail: {} as Note,
  loading: 'idle',
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
  },
});

export const selectNoteCollection = (state: RootState) => state.note;
export default noteSlice.reducer;
