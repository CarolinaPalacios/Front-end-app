import { useState } from 'react';
import { useAuthentication } from './hook/useAuthentication';

const LoginForm = () => {
  const [loginVisible, setLoginVisible] = useState(false);
  const { username, setUsername, password, setPassword, handleLogin } =
    useAuthentication();

  const hideWhenVisible = { display: loginVisible ? 'none' : '' };
  const showWhenVisible = { display: loginVisible ? '' : 'none' };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setLoginVisible(true)}>Login</button>
      </div>
      <div style={showWhenVisible}>
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
        <button style={showWhenVisible} onClick={() => setLoginVisible(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
