export interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  important: boolean;
  user: {
    id: string;
    username: string;
    name: string;
  };
}

export interface NoteCreationData {
  token: string;
  title: string;
  content: string;
  important: boolean;
}

export interface User {
  id: string;
  username: string;
  name: string;
  notes: Note[];
  token: string;
}
