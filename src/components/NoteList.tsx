import type { Note } from '../types/API';

interface NoteListProps {
  collection: Note[];
}
import NoteCard from './NoteCard';
const NoteList = ({ collection }: NoteListProps) => {
  return (
    <ul>
      {collection.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </ul>
  );
};

export default NoteList;
