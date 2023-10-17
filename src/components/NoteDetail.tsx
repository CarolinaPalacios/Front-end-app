import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDeleteNote, useGetNoteDetail, useUpdateNote } from './hook/useNote';
// import Togglable from './Togglable';
import { Note } from '../types/API';

const NoteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { detail } = useGetNoteDetail(id!);
  const { deleteNoteHandler } = useDeleteNote();
  const { toggleImportance, updateNoteData } = useUpdateNote();

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(detail.title || '');
  const [content, setContent] = useState(detail.content || '');

  const handleToggleImportance = () => {
    toggleImportance(detail.id);
  };

  const handleSaveChanges = () => {
    const updatedData: Partial<Note> = {};
    if (title !== detail.title) {
      updatedData.title = title;
    }
    if (content !== detail.content) {
      updatedData.content = content;
    }
    updateNoteData(detail.id, updatedData);
    console.log(updatedData);
    setIsEditing(false);
  };
  const handleDelete = (id: string) => {
    try {
      deleteNoteHandler(id);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const important = detail.important
    ? 'bg-green-900'
    : 'bg-red-400 text-red-900';

  return (
    <div>
      <button
        className='absolute top-0 right-0 p-1 bg-transparent border-none'
        onClick={() => handleDelete(detail.id)}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='icon icon-tabler icon-tabler-trash-x-filled'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          stroke-width='1.75'
          stroke='currentColor'
          fill='none'
          stroke-linecap='round'
          stroke-linejoin='round'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
          <path
            d='M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16zm-9.489 5.14a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z'
            stroke-width='0'
            fill='currentColor'
          ></path>
          <path
            d='M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z'
            stroke-width='0'
            fill='currentColor'
          ></path>
        </svg>
      </button>

      <div>
        {isEditing ? (
          <div>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button onClick={handleToggleImportance}>
              {detail.important ? 'Not Important' : 'Important'}
            </button>
            <button onClick={handleSaveChanges}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        ) : (
          <div>
            <h1>{detail.title}</h1>
            <p>{detail.content}</p>
            <p>
              {detail.date?.split('T')[0]}{' '}
              {detail.date?.split('T')[1].split('.')[0]}
            </p>
            <p
              className={`text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ${important}`}
            >
              {detail.important ? 'Important' : 'Not Important'}
            </p>
            <p>{detail.user?.username}</p>
            <button onClick={() => setIsEditing(true)}>Edit</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteDetail;
