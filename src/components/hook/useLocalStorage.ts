import { useEffect } from 'react';
import { useAuthentication } from './useAuthentication';
export const useGetLocalStorage = () => {
  const { setUser } = useAuthentication();
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
    }
  }, [setUser]);
};
