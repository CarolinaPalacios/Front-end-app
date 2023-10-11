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
  console.log(data);

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
