import { useParams, useNavigate } from 'react-router-dom';
import { useDeleteNote, useGetNoteDetail } from './hook/useNote';

const NoteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { detail, isLoading, isError } = useGetNoteDetail(id!);
  const { deleteNoteHandler } = useDeleteNote();

  const handleDelete = async (id: string) => {
    try {
      await deleteNoteHandler(id);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };
  const important = detail.important
    ? 'bg-green-900'
    : 'bg-red-400 text-red-900';
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error...</p>;

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
      <h1>{detail.title}</h1>
      <p>{detail.content}</p>
      <p>
        {detail.date?.split('T')[0]} {detail.date?.split('T')[1].split('.')[0]}
      </p>
      <p
        className={`text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ${important}`}
      >
        {detail.important ? 'Important' : 'Not Important'}
      </p>
      <p>{detail.user?.username}</p>
    </div>
  );
};

export default NoteDetail;
