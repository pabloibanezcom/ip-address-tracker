import type { MetaFunction } from '@remix-run/node';
import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import HomePage from '~/pages/HomePage/HomePage';
import { IPData } from '~/types/types';

export const meta: MetaFunction = () => {
  return [
    { title: 'IP address tracker' },
    {
      name: 'description',
      content: 'PoC application developed by Pablo Ibanez',
    },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const url = new URL('/api/whatip', request.url);

    const response = await fetch(url.toString());
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

    const data = await response.json();

    return Response.json({
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
      ipData: data,
    });
  } catch (error) {
    console.error('Loader error:', error);
    throw Response.json({ error: 'Failed to load data' }, { status: 500 });
  }
};

export default function Index() {
  const loaderData = useLoaderData<typeof loader>();
  const googleMapsApiKey = loaderData.googleMapsApiKey as string;
  const initialIPData = loaderData.ipData as IPData;
  return <HomePage apiKey={googleMapsApiKey} initialIPData={initialIPData} />;
}
