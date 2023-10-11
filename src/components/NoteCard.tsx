import { useNavigate } from 'react-router-dom';
// import { useDeleteNote } from './hook/useNote';
import type { Note } from '../types/API';

interface NoteCardProps {
  note: Note;
}

const NoteCard = ({ note }: NoteCardProps) => {
  const navigate = useNavigate();

  const tailwindColors = [
    'bg-yellow-300',
    'bg-pink-300',
    'bg-blue-300',
    'bg-green-300',
  ];

  const randomIndex = Math.floor(Math.random() * tailwindColors.length);
  const selectedColor = tailwindColors[randomIndex];

  return (
    <li
      className={`relative ${selectedColor} transform -rotate-3  hover:rotate-0 hover:scale-110 transition-transform duration-300 ease-in-out p-4 m-4 shadow-md hover:shadow-2xl text-black w-52 h-44`}
    >
      <h2 className='font-nanum text-2xl'>{note.title}</h2>
      <p className='font-nanum text-2xl py-2'>{note.content}</p>
      <button
        onClick={() => navigate(`/note/${note.id}`)}
        className='bg-neutral-700 hover:bg-neutral-800 text-zinc-200 font-semibold py-2 px-4 rounded border-none absolute bottom-2 right-[50px]'
      >
        See more
      </button>
    </li>
  );
};

export default NoteCard;
