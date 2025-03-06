import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { IPData } from '~/types/types';
import { fetchIPDataFromApi } from '../../utils/ipService';
import HomePage from './HomePage';

vi.mock('../../utils/ipService', async () => {
  const actual = await vi.importActual<typeof import('../../utils/ipService')>(
    '../../utils/ipService'
  );
  return {
    ...actual,
    fetchIPDataFromApi: vi.fn(),
  };
});

describe('HomePage', () => {
  const mockIPData: IPData = {
    ip: '192.168.1.1',
    location: {
      city: 'New York',
      country: 'USA',
      region: 'NY',
      lat: 40.7128,
      lng: -74.006,
      postalCode: '10001',
      timezone: 'UTC-05:00',
    },
    as: {
      asn: 12345,
      name: 'Mock ASN',
      route: 'Mock Route',
      domain: 'mock.com',
      type: 'Mock Type',
    },
    isp: 'Mock ISP',
  };

  const fetchIPDataMock = vi.fn().mockResolvedValue(mockIPData);

  beforeEach(() => {
    vi.mocked(fetchIPDataFromApi).mockImplementation(fetchIPDataMock);
  });

  it('renders the HomePage with initial data', async () => {
    render(<HomePage apiKey="test-api-key" initialIPData={mockIPData} />);

    await waitFor(() => {
      expect(screen.getByText(/192.168.1.1/)).toBeInTheDocument();
      expect(screen.getByText(/New York/)).toBeInTheDocument();
      expect(screen.getByText(/Mock ISP/)).toBeInTheDocument();
    });
  });

  it('displays error message on fetch failure', async () => {
    fetchIPDataMock.mockRejectedValueOnce(new Error('Failed to fetch'));

    render(<HomePage apiKey="test-api-key" initialIPData={mockIPData} />);

    await waitFor(() => {
      expect(
        screen.getByText(/Failed to retrieve IP data. Please try again./)
      ).toBeInTheDocument();
    });
  });

  it('fetches and displays IP data on form submission', async () => {
    render(<HomePage apiKey="test-api-key" initialIPData={mockIPData} />);

    const input = screen.getByPlaceholderText(
      /Search for any IP address or domain/
    );
    const button = screen.getByRole('button', { name: /Search/ });

    fireEvent.change(input, { target: { value: '8.8.8.8' } });

    await waitFor(() => expect(button).not.toBeDisabled());
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/192.168.1.1/)).toBeInTheDocument();
      expect(screen.getByText(/New York/)).toBeInTheDocument();
      expect(screen.getByText(/Mock ISP/)).toBeInTheDocument();
    });
  });
});
