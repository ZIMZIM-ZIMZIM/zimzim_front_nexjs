import axios from 'axios';
import { cookies } from 'next/headers';

export const useFetch = () => {
  const customFetch = async (url: string) => {
    try {
      const cookieStore = cookies();
      const token = cookieStore.get('token')?.value;

      const response = await axios.get(`${process.env.NEXT_SERVER_URL}${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('Data fetch failed');
    }
  };

  return {
    customFetch,
  };
};
