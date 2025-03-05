import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import { MapPosition } from '~/types/types';
import style from './Map.module.css';

type MapProps = {
  apiKey: string;
  position: MapPosition;
};

const Map: React.FC<MapProps> = ({ apiKey, position }) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <noscript>
        <style>{`
            .js-only { display: none !important; }
          `}</style>
        <p className={style.noJSMessage}>
          Javascript is disabled. This is a reduced version of the web app.
        </p>
      </noscript>
      {isClient && (
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
      )}
    </>
  );
};

export default Map;
