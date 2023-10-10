import NoteList from '../components/NoteList';
import LoginForm from '../components/LoginForm';
import { useGetNoteCollection } from '../components/hook/useNote';
import FormNotes from '../components/FormNotes';
import { useAuthentication } from '../components/hook/useAuthentication';

const Home = () => {
  const { collection, isLoading } = useGetNoteCollection();
  const { user } = useAuthentication();
  console.log(user);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <LoginForm />
          {user?.token ? (
            <FormNotes token={user.token} />
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
