import { IPData } from '~/types/types';

const IPIFY_URL = 'https://api64.ipify.org?format=json';
const GEOIP_URL = 'https://geo.ipify.org/api/v2/country,city';

export const getMyIp = async (): Promise<string> => {
  try {
    const response = await fetch(IPIFY_URL);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Error fetching IP data:', error);
    throw error;
  }
};

export const fetchIPDataFromIpify = async (
  ipAddressOrDomain: string
): Promise<IPData> => {
  try {
    const response = await fetch(
      `${GEOIP_URL}?apiKey=${process.env.IPIFY_API_KEY}&domain=${ipAddressOrDomain}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch IP data. Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching IP data for ${ipAddressOrDomain}:`, error);
    throw new Error('Could not retrieve IP location data.');
  }
};

export const fetchIPDataFromApi = async (
  ipAddressOrDomain: string
): Promise<IPData> => {
  try {
    const response = await fetch(
      `/api/whatip?q=${ipAddressOrDomain || (await getMyIp())}`
    );
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching IP data:', error);
    throw error;
  }
};
