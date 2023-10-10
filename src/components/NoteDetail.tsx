import { useParams } from 'react-router-dom';
import { useGetNoteDetail } from './hook/useNote';

const NoteDetail = () => {
  const { id } = useParams();
  const { detail, isLoading, isError } = useGetNoteDetail(id!);
  console.log(detail);
  const important = detail.important
    ? 'bg-green-900'
    : 'bg-red-400 text-red-900';
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error...</p>;

  return (
    <div>
      <h1>{detail.title}</h1>
      <p>{detail.content}</p>
      <p>{detail.date}</p>
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
