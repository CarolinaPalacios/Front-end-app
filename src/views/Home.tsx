import NoteList from '../components/NoteList';
import LoginForm from '../components/LoginForm';
import { useGetNoteCollection } from '../components/hook/useNote';
import NoteForm from '../components/NoteForm';
import { useAuthentication } from '../components/hook/useAuthentication';

const Home = () => {
  const { collection, isLoading } = useGetNoteCollection();
  const { user } = useAuthentication();

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <LoginForm />
          {user?.token ? (
            <NoteForm token={user.token} />
          ) : (
            <p>Please log in to create a note</p>
          )}
          <NoteList collection={collection} />
        </>
      )}
    </>
  );
};

export default Home;
