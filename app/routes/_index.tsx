import type { MetaFunction } from '@remix-run/node';
import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import HomePage from '~/pages/HomePage/HomePage';

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
  return { googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY };
};

export default function Index() {
  const loaderData = useLoaderData<typeof loader>();
  const googleMapsApiKey = loaderData.googleMapsApiKey as string;
  return <HomePage apiKey={googleMapsApiKey} />;
}
