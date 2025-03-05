import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useState } from 'react';
import style from './Map.module.css';

const center = {
  lat: 51.5285262,
  lng: -0.2664025,
};

const Map = ({ apiKey }: { apiKey: string }) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  return (
    <LoadScript googleMapsApiKey={apiKey} onLoad={() => setMapLoaded(true)}>
      <GoogleMap mapContainerClassName={style.map} center={center} zoom={12}>
        {mapLoaded && <Marker position={center} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
