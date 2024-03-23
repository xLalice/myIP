import { useState, useEffect } from 'react';
import Header from './components/Header/';
import Map from './components/Map/';
import Footer from './components/Footer/';
import './_shared.scss';

function App() {
  const [ip, setIp] = useState('');
  const [geolocatioDatas, setGeolocationDatas] = useState('');
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');

  /**
   * Fetch backend to get IP informations
   */
  const fetchIp = async () => {
    try {
      const response = await fetch('http://localhost:4000');
      const data = await response.json();
      console.log(data);
      setIp(data.ip);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Fetch geolocation datas with IP address
   * @param {string} ip
   */
  const getGeolocationDatas = async (ip) => {
    try {
      const response = await fetch(`http://ip-api.com/json/${ip}`);
      const data = await response.json();
      console.log(data);
      setGeolocationDatas(data);
      setLat(data.lat);
      setLon(data.lon);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchIp();
  }, []);

  /**
   * Launch geolocation datas fetch when ip is set
   */
  useEffect(() => {
    getGeolocationDatas(ip);
  }, [ip]);

  return (
    <div className="main">
      <Header />
      <div className="main__datas">
        <h2>Here is your information</h2>
        <p className="main__datas__content">
          IP address : <span className="main__datas__content--datas">{ip}</span>
        </p>
        <p className="main__datas__content">
          City :{' '}
          <span className="main__datas__content--datas">
            {geolocatioDatas.city}
          </span>
        </p>
        <p className="main__datas__content">
          Country :{' '}
          <span className="main__datas__content--datas">
            {geolocatioDatas.country}
          </span>
        </p>
        <p className="main__datas__content">
          Lat :{' '}
          <span className="main__datas__content--datas">
            {geolocatioDatas.lat}
          </span>
        </p>
        <p className="main__datas__content">
          Lon :{' '}
          <span className="main__datas__content--datas">
            {geolocatioDatas.lon}
          </span>
        </p>
        <p className="main__datas__content">
          Région :{' '}
          <span className="main__datas__content--datas">
            {geolocatioDatas.regionName}
          </span>
        </p>
      </div>
      {/* Check if lat and lon is defined */}
      {(lat !== '') & (lon !== '') ? <Map lat={lat} lon={lon} /> : null}
      <Footer />
    </div>
  );
}

export default App;
