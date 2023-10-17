import { useState, useRef } from 'react';
import { useCreateNote } from './hook/useNote';
import Togglable from './Togglable';

interface FormNotesProps {
  token: string;
}

interface TogglableRef {
  toggleVisibility: () => void;
}

const INITIAL_STATE = {
  title: '',
  content: '',
  important: false,
};

const FormNotes = ({ token }: FormNotesProps) => {
  const [noteData, setNoteData] = useState(INITIAL_STATE);
  const { created, isLoading, createNoteHandler } = useCreateNote();
  const togglableRef = useRef<TogglableRef | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setNoteData((prevNoteData) => ({
      ...prevNoteData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    createNoteHandler(noteData, token);
    setNoteData(INITIAL_STATE);
    togglableRef.current?.toggleVisibility();
  };

  return (
    <Togglable buttonLabel='Create Note' ref={togglableRef}>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='title'
          placeholder='Title'
          value={noteData.title}
          onChange={handleChange}
        />
        <input
          type='text'
          size={50}
          name='content'
          placeholder='Content'
          value={noteData.content}
          onChange={handleChange}
        />
        <input
          type='checkbox'
          name='important'
          checked={noteData.important}
          onChange={handleChange}
        />

        <button type='submit' disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Create'}
        </button>

        {created && <p>Note created successfully!</p>}
      </form>
    </Togglable>
  );
};

export default FormNotes;
