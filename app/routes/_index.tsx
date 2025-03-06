import type { MetaFunction } from '@remix-run/node';
import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import HomePage from '~/pages/HomePage/HomePage';
import { IPData } from '~/types/types';
import { fetchIPDataFromIpify } from '~/utils/ipService';

export const meta: MetaFunction = () => {
  return [
    { title: 'IP address tracker' },
    {
      name: 'IP Address Tracker Search for any IP address or domain IP ',
      content: 'PoC application developed by Pablo Ibanez',
    },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    let data: IPData | undefined;
    const query = new URL(request.url).searchParams.get('q');
    if (query) {
      data = await fetchIPDataFromIpify(query);
    }

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
