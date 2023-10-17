import axios from 'axios';
import type { Note, NoteCreationData } from '../types/API';

const { VITE_BASE_URL } = import.meta.env;

export const fetchNoteCollection = async () => {
  const { data }: { data: Note[] } = await axios.get(`${VITE_BASE_URL}/notes`);

  return data;
};

export const fetchNoteDetail = async (id: string) => {
  const { data }: { data: Note } = await axios.get(
    `${VITE_BASE_URL}/notes/${id}`
  );

  return data;
};

export const sendCreateNoteRequest = async (
  noteData: NoteCreationData,
  { token }: { token: string }
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data }: { data: Note } = await axios.post(
    `${VITE_BASE_URL}/notes`,
    noteData,
    config
  );
  return data;
};

export const sendDeleteNoteRequest = async (
  id: string,
  { token }: { token: string }
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  await axios.delete(`${VITE_BASE_URL}/notes/${id}`, config);
};

export const sendUpdateNoteRequest = async (
  id: string,
  updatedData: Partial<Note>,
  { token }: { token: string }
) => {
  console.log(updatedData);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const updatedNote = await axios.put(
    `${VITE_BASE_URL}/notes/${id}`,
    updatedData,
    config
  );
  console.log(updatedNote);
  return updatedNote.data;
};
