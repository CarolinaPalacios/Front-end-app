export interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  important: boolean;
  userId: string;
}

export interface User {
  id: string;
  username: string;
  name: string;
  notes: Note[];
}
