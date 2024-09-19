import axios from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import ROUTE from '#/constants/route';

const customFetch = async (url: string) => {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    const response = await axios.get(`${process.env.NEXT_SERVER_URL}${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Cache-Control': 'no-store, max-age=0',
      },
    });

    return response.data;
  } catch (error) {
    if (
      error instanceof Error &&
      (error.message === 'Unauthorized' || error.message === 'Forbidden')
    ) {
      redirect('/ko' + ROUTE.LOGIN);
    }
    return {
      notFound: true,
    };
  }
};

export default customFetch;
