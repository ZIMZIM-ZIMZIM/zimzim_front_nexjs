import axios from 'axios';
import { cookies } from 'next/headers';

export const useFetch = () => {
  const customFetch = async (url: string) => {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    const response = await axios.get(`${process.env.NEXT_SERVER_URL}${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  return {
    customFetch,
  };
};
