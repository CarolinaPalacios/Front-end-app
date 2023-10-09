import axios from 'axios';
import type { Note } from '../types/API';

const { BASE_URL } = import.meta.env;

export const fetchNoteCollection = async () => {
  const { data }: { data: Note[] } = await axios.get(`${BASE_URL}/notes`);
  return data;
};

export const fetchNoteDetail = async (id: string) => {
  const { data }: { data: Note } = await axios.get(`${BASE_URL}/notes/${id}`);
  return data;
};
