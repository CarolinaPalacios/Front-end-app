import { useAuthentication } from './hook/useAuthentication';

import Togglable from './Togglable';

const LoginForm = () => {
  const { username, setUsername, password, setPassword, handleLogin } =
    useAuthentication();

  return (
    <Togglable buttonLabel='Login'>
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
    </Togglable>
  );
};

export default LoginForm;
