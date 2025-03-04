import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

export const server = setupServer(
  http.get('https://api64.ipify.org', () => {
    return HttpResponse.json({ ip: '192.168.1.1' });
  }),
  http.get('https://geo.ipify.org/api/v2/country,city', () => {
    return HttpResponse.json({ ip: '192.168.1.1', location: 'USA' });
  })
);
