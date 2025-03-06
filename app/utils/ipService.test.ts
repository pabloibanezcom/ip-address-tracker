import { afterEach, describe, expect, test, vi } from 'vitest';
import { fetchIPDataFromApi, getMyIp } from './ipService';

// Mock the global fetch function
global.fetch = vi.fn();

describe('ipService', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('getMyIp should fetch and return an IP address', async () => {
    const mockIp = '192.168.1.1';
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ ip: mockIp }),
    });

    const ip = await getMyIp();
    expect(ip).toBe(mockIp);
    expect(fetch).toHaveBeenCalledWith('https://api64.ipify.org?format=json');
  });

  test('getMyIp should throw an error if fetch fails', async () => {
    (fetch as vi.Mock).mockResolvedValue({ ok: false, status: 500 });

    await expect(getMyIp()).rejects.toThrow(
      'API request failed with status 500'
    );
  });

  test('fetchIPDataFromApi should fetch and return IP data', async () => {
    const mockIpData = { country: 'USA', city: 'New York' };
    (fetch as vi.Mock).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockIpData),
    });

    const ip = '192.168.1.1';
    const data = await fetchIPDataFromApi(ip);
    expect(data).toEqual(mockIpData);
  });

  test('fetchIPDataFromApi should throw an error if fetch fails', async () => {
    (fetch as vi.Mock).mockResolvedValue({ ok: false, status: 404 });

    await expect(fetchIPDataFromApi('192.168.1.1')).rejects.toThrow(
      'API request failed with status 404'
    );
  });
});
