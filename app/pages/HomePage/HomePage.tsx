import { useState } from 'react';
import Map from '~/components/Map/Map';
import { IPData } from '~/types/types';
import style from './HomePage.module.css';

type HomePageProps = {
  apiKey: string;
  initialIPData: IPData;
};

const HomePage = ({ apiKey, initialIPData }: HomePageProps) => {
  const [currentIPData, setCurrentIPData] = useState<IPData>(initialIPData);

  const searchIPData = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const inputElement = event.currentTarget[0] as HTMLInputElement;
    const newIpData = await fetch(`/api/whatip?q=${inputElement.value}`);
    const data = await newIpData.json();
    setCurrentIPData(data);
  };

  return (
    <div className={style.homePage}>
      <div className={style.backgroundContainer}>
        <h1>IP address tracker</h1>
        <div>
          <form onSubmit={searchIPData}>
            <input
              type="text"
              placeholder="Search for any IP address or domain"
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </div>
      <div className={style.mapContainer}>
        <Map
          apiKey={apiKey}
          position={{
            lat: currentIPData.location.lat,
            lng: currentIPData.location.lng,
          }}
        />
      </div>
    </div>
  );
};

export default HomePage;
