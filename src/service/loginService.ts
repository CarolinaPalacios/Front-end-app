import axios from 'axios';

const { VITE_BASE_URL } = import.meta.env;

export const userAuth = async (credentials: {
  username: string;
  password: string;
}) => {
  const { data } = await axios.post(`${VITE_BASE_URL}/login`, credentials);

  return data;
};
