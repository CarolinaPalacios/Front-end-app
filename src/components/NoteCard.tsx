import { useNavigate } from 'react-router-dom';
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
      className={`relative ${selectedColor} transform rotate-6 hover:rotate-0 hover:scale-105 transition-transform duration-300 ease-in-out p-4 m-4 shadow-md text-black`}
    >
      <h2>{note.title}</h2>
      <h3>{note.user.username}</h3>
      <p>
        {note.date.split('T')[0]} {note.date.split('T')[1].split('.')[0]}
      </p>
      <button onClick={() => navigate(`/note/${note.id}`)}>See more</button>
    </li>
  );
};

export default NoteCard;
