import { LoaderFunction } from '@remix-run/node';
import { fetchIPDataFromIpify } from '~/utils/ipService';

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const API_KEY = process.env.IPIFY_API_KEY;

    if (!API_KEY) {
      return new Response(JSON.stringify({ error: 'API key is missing' }), {
        status: 500,
      });
    }
    const url = new URL(request.url);
    const ip = url.searchParams.get('q');

    if (!ip) {
      return new Response(JSON.stringify({ error: 'IP address is missing' }), {
        status: 400,
      });
    }

    const data = await fetchIPDataFromIpify(ip);
    const { ip: dataIp, ...restData } = data;
    return new Response(JSON.stringify({ ip, ...restData }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response((error as Error).message, { status: 500 });
  }
};
