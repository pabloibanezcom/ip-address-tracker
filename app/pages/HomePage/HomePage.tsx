import Map from '~/components/Map/Map';
import style from './HomePage.module.css';

const HomePage = ({ apiKey }: { apiKey: string }) => {
  return (
    <div className={style.homePage}>
      <div className={style.backgroundContainer} />
      <div className={style.mapContainer}>
        <Map apiKey={apiKey} />
      </div>
    </div>
  );
};

export default HomePage;
