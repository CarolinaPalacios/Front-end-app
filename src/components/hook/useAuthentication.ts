import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hook/useStore';
import { authenticateUser, selectUser } from '../../store/slice/loginSlice';
import { User } from '../../types/API';

export const useAuthentication = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectUser);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setUser] = useState<User | null>(null);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await dispatch(
        authenticateUser({
          username,
          password,
        })
      );
      const user = response.payload;

      window.localStorage.setItem('user', JSON.stringify(user));

      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  return {
    username,
    setUsername,
    password,
    setPassword,
    user,
    setUser,
    handleLogin,
  };
};
