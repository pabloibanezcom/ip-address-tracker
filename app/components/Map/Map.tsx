import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useState } from 'react';
import { MapPosition } from '~/types/types';
import style from './Map.module.css';

type MapProps = {
  apiKey: string;
  position: MapPosition;
};

const Map: React.FC<MapProps> = ({ apiKey, position }) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  return (
    <LoadScript googleMapsApiKey={apiKey} onLoad={() => setMapLoaded(true)}>
      <GoogleMap
        mapContainerClassName={style.map}
        center={position}
        zoom={12}
        options={{ disableDefaultUI: true }}
      >
        {mapLoaded && <Marker position={position} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
