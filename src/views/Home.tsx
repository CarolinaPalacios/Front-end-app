import NoteList from '../components/NoteList';
import LoginForm from '../components/LoginForm';
import { useGetNoteCollection } from '../components/hook/useNote';
import NoteForm from '../components/NoteForm';
import { useAuthentication } from '../components/hook/useAuthentication';

const Home = () => {
  const { collection } = useGetNoteCollection();
  const { user } = useAuthentication();

  return (
    <>
      <>
        <h1>Notes</h1>
        {user?.token ? <NoteForm token={user.token} /> : <LoginForm />}
        <NoteList collection={collection} />
      </>
    </>
  );
};

export default Home;
