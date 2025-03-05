export type IPResponse = {
  ip: string;
};

export type IPRequest = {
  type: 'ipAddress' | 'domain' | 'email';
  value: string;
};

export type IPData = {
  ip: string;
  location: {
    country: string;
    region: string;
    city: string;
    lat: number;
    lng: number;
    postalCode: string;
    timezone: string;
  };
  as: {
    asn: number;
    name: string;
    route: string;
    domain: string;
    type: string;
  };
  isp: string;
};

export type MapPosition = {
  lat: number;
  lng: number;
};
