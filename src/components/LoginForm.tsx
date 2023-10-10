import { useAuthentication } from './hook/useAuthentication';

const LoginForm = () => {
  const { username, setUsername, password, setPassword, handleLogin } =
    useAuthentication();
  return (
    <form onSubmit={handleLogin}>
      <input
        type='text'
        value={username}
        name='username'
        placeholder='Username'
        onChange={(event) => setUsername(event.target.value)}
      />
      <input
        type='password'
        value={password}
        name='password'
        placeholder='Password'
        onChange={(event) => setPassword(event.target.value)}
      />
      <button>Login</button>
    </form>
  );
};

export default LoginForm;
