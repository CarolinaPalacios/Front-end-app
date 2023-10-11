import type { Note } from '../types/API';

interface NoteListProps {
  collection: Note[];
}
import NoteCard from './NoteCard';
const NoteList = ({ collection }: NoteListProps) => {
  return (
    <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10'>
      {collection.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </ul>
  );
};

export default NoteList;
