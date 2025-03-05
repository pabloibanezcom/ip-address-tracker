import { useCallback, useState } from 'react';
import Map from '~/components/Map/Map';
import { IPData } from '~/types/types';
import { fetchIPData } from '~/utils/ipService'; // Extracted API logic
import style from './HomePage.module.css';

type HomePageProps = {
  apiKey: string;
  initialIPData: IPData;
};

const HomePage: React.FC<HomePageProps> = ({ apiKey, initialIPData }) => {
  const [currentIPData, setCurrentIPData] = useState<IPData>(initialIPData);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const searchIPData = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const inputElement = event.currentTarget[0] as HTMLInputElement;
      if (!inputElement?.value) return;

      setLoading(true);
      setError(null);
      try {
        const data = await fetchIPData(inputElement.value);
        setCurrentIPData(data);
      } catch (err) {
        setError('Failed to retrieve IP data. Please try again.');
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const renderInfoElement = (title: string, value: string) => {
    return (
      <div className={style.infoElement}>
        <h2 className={style.infoElementTitle}>{title}</h2>
        <span className={style.infoElementValue}>{value}</span>
      </div>
    );
  };

  return (
    <div className={style.homePage}>
      <div className={style.backgroundContainer}>
        <div className={style.contentContainer}>
          <div className={style.content}>
            <h1 className={style.title}>IP Address Tracker</h1>
            <form
              onSubmit={searchIPData}
              method="get"
              className={style.searchForm}
            >
              <input
                type="text"
                name="q"
                placeholder="Search for any IP address or domain"
              />
              <button type="submit" aria-label="Search" disabled={loading}>
                {'>'}
              </button>
            </form>
            <div className={style.infoContainer}>
              {renderInfoElement('IP Address', currentIPData.ip)}
              {renderInfoElement(
                'Location',
                `${currentIPData.location.city}, ${currentIPData.location.region}`
              )}
              {renderInfoElement(
                'Timezone',
                `UTC ${currentIPData.location.timezone}`
              )}
              {renderInfoElement('ISP', currentIPData.isp)}
            </div>
          </div>
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
      {error && (
        <div className={style.errorMessage}>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default HomePage;
