import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { IPData } from '~/types/types';
import HomePage from './HomePage';

vi.mock('../../utils/ipService', async () => {
  const actual = await vi.importActual<typeof import('../../utils/ipService')>(
    '../../utils/ipService'
  );
  return {
    ...actual,
    fetchIPData: vi.fn(),
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

  it('renders the HomePage with initial data', () => {
    render(<HomePage apiKey="test-api-key" initialIPData={mockIPData} />);

    expect(screen.getByText(/192.168.1.1/)).toBeInTheDocument();
    expect(screen.getByText(/New York/)).toBeInTheDocument();
    expect(screen.getByText(/Mock ISP/)).toBeInTheDocument();
  });
  //   vi.mocked(fetchIPData).mockResolvedValue({
  //     ip: '203.0.113.42',
  //     location: {
  //       city: 'Los Angeles',
  //       country: 'USA',
  //       region: 'CA',
  //       timezone: 'UTC-08:00',
  //       postalCode: '90001',
  //       lat: 34.0522,
  //       lng: -118.2437,
  //     },
  //     as: {
  //       asn: 12345,
  //       name: 'Mock ASN',
  //       route: 'Mock Route',
  //       domain: 'mock.com',
  //       type: 'Mock Type',
  //     },
  //     isp: 'New ISP',
  //   });

  //   render(<HomePage apiKey="test-api-key" initialIPData={mockIPData} />);

  //   const input = screen.getByRole('textbox');
  //   await userEvent.clear(input); // Ensure input is cleared before typing
  //   await userEvent.type(input, '203.0.113.42', { delay: 10 });

  //   expect(input).toHaveValue('203.0.113.42'); // Verify input has the correct value

  //   const button = screen.getByRole('button', { name: /search/i });
  //   await userEvent.click(button);

  //   await waitFor(() => {
  //     expect(fetchIPData).toHaveBeenCalledWith('203.0.113.42'); // Ensure API call happens
  //   });

  //   await waitFor(
  //     () => {
  //       expect(screen.getByText(/203.0.113.42/)).toBeInTheDocument();
  //       expect(screen.getByText(/Los Angeles/)).toBeInTheDocument();
  //       expect(screen.getByText(/New ISP/)).toBeInTheDocument();
  //     },
  //     { timeout: 5000 }
  //   );
  // });

  // it('fetches new IP data when user interacts', async () => {
  //   vi.mocked(fetchIPData).mockResolvedValue({
  //     ip: '203.0.113.42',
  //     location: {
  //       city: 'Los Angeles',
  //       country: 'USA',
  //       region: 'CA',
  //       timezone: 'UTC-08:00',
  //       postalCode: '90001',
  //       lat: 34.0522,
  //       lng: -118.2437,
  //     },
  //     as: {
  //       asn: 12345,
  //       name: 'Mock ASN',
  //       route: 'Mock Route',
  //       domain: 'mock.com',
  //       type: 'Mock Type',
  //     },
  //     isp: 'New ISP',
  //   });

  //   render(<HomePage apiKey="test-api-key" initialIPData={mockIPData} />);
  //   const input = screen.getByRole('textbox');
  //   await userEvent.type(input, '203.0.113.42');
  //   const button = screen.getByRole('button', { name: /search/i });
  //   await userEvent.click(button);

  //   await waitFor(() => {
  //     expect(screen.getByText(/203.0.113.42/)).toBeInTheDocument();
  //     expect(screen.getByText(/Los Angeles/)).toBeInTheDocument();
  //     expect(screen.getByText(/New ISP/)).toBeInTheDocument();
  //   });
  // });
});
