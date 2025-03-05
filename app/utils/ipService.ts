import { IPData } from '~/types/types';

const API_URL = 'https://geo.ipify.org/api/v2/country,city';

export const fetchIPData = async (
  ipAddressOrDomain: string
): Promise<IPData> => {
  try {
    const response = await fetch(`/api/whatip?q=${ipAddressOrDomain}`);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching IP data:', error);
    throw error;
  }
};
