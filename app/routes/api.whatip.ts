import { LoaderFunction } from '@remix-run/node';
import { IPData, IPResponse } from '../types/types';

const IPIFY_URL = 'https://api64.ipify.org?format=json';
const GEOIP_URL = 'https://geo.ipify.org/api/v2/country,city';

export const getPublicIP = async (): Promise<string> => {
  try {
    const response = await fetch(IPIFY_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch public IP. Status: ${response.status}`);
    }
    const { ip }: IPResponse = await response.json();
    return ip;
  } catch (error) {
    throw new Error('Could not retrieve public IP.');
  }
};

export const fetchIPData = async (
  ip: string,
  apiKey: string
): Promise<IPData> => {
  try {
    const response = await fetch(`${GEOIP_URL}?apiKey=${apiKey}&domain=${ip}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch IP data. Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Error fetching IP data for ${ip}:`, error);
    throw new Error('Could not retrieve IP location data.');
  }
};

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const API_KEY = process.env.IPIFY_API_KEY;

    if (!API_KEY) {
      return new Response(JSON.stringify({ error: 'API key is missing' }), {
        status: 500,
      });
    }
    const url = new URL(request.url);
    const ip = url.searchParams.get('q') || (await getPublicIP());

    const data = await fetchIPData(ip, API_KEY);
    const { ip: dataIp, ...restData } = data;
    return new Response(JSON.stringify({ ip, ...restData }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response((error as Error).message, { status: 500 });
  }
};
