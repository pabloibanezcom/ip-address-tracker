// import { createRequest } from '@remix-run/server-runtime';
import { http, HttpResponse } from 'msw';
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { server } from '../../../mocks/server';
import { fetchIPData, getPublicIP, loader } from '../api.whatip';

global.fetch = vi.fn();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('getPublicIP', () => {
  it('should fetch and return the public IP', async () => {
    const ip = await getPublicIP();
    expect(ip).toBe('192.168.1.1');
  });

  it('should throw an error if fetch fails', async () => {
    server.use(
      http.get('https://api64.ipify.org', () => {
        return HttpResponse.error();
      })
    );
    await expect(getPublicIP()).rejects.toThrow(
      'Could not retrieve public IP.'
    );
  });
});

describe('fetchIPData', () => {
  it('should fetch IP geolocation data', async () => {
    const data = await fetchIPData('192.168.1.1', 'test-api-key');
    expect(data).toEqual({ ip: '192.168.1.1', location: 'USA' });
  });

  it('should throw an error if fetch fails', async () => {
    server.use(
      http.get('https://geo.ipify.org/api/v2/country,city', () => {
        return HttpResponse.error();
      })
    );
    await expect(fetchIPData('192.168.1.1', 'test-api-key')).rejects.toThrow(
      'Could not retrieve IP location data.'
    );
  });
});

describe('loader', () => {
  let originalApiKey: string | undefined;

  beforeEach(() => {
    originalApiKey = process.env.IPIFY_API_KEY;
    process.env.IPIFY_API_KEY = 'test-api-key';
  });

  afterEach(() => {
    process.env.IPIFY_API_KEY = originalApiKey;
  });

  it('should return IP data when a valid IP is provided', async () => {
    const request = new Request('http://localhost?ip=192.168.1.1');
    const response = await loader({ request, params: {}, context: {} });

    if (!response) {
      throw new Error('Response is null');
    }
    if (!(response instanceof Response)) {
      throw new Error('Response is not a valid Response object');
    }

    const data = await response.json();
    expect(data).toEqual({ ip: '192.168.1.1', location: 'USA' });
  });

  it('should fetch public IP when no IP is provided', async () => {
    const request = new Request('http://localhost');
    const response = await loader({ request, params: {}, context: {} });

    if (!response) {
      throw new Error('Response is null');
    }
    if (!(response instanceof Response)) {
      throw new Error('Response is not a valid Response object');
    }

    const data = await response.json();
    expect(data).toEqual({ ip: '192.168.1.1', location: 'USA' });
  });

  it('should return an error if API key is missing', async () => {
    delete process.env.IPIFY_API_KEY;

    const request = new Request('http://localhost');
    const response = await loader({ request, params: {}, context: {} });

    if (response instanceof Response) {
      expect(response.status).toBe(500);
    } else {
      throw new Error('Response is not a valid Response object');
    }
  });
});
