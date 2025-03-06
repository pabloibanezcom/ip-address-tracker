// import { createRequest } from '@remix-run/server-runtime';
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
import { loader } from '../api.whatip';

global.fetch = vi.fn();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

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
    const request = new Request('http://localhost?q=192.168.1.1');
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
