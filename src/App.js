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
      <div className="datas">
        <h2>Here is your information</h2>
        <p className="datas__content--label">
          IP address : <span className="datas__content--data">{ip}</span>
        </p>
        <p className="datas__content--label">
          City :{' '}
          <span className="datas__content--data">{geolocatioDatas.city}</span>
        </p>
        <p className="datas__content--label">
          Country :{' '}
          <span className="datas__content--data">
            {geolocatioDatas.country}
          </span>
        </p>
        <p className="datas__content--label">
          Lat :{' '}
          <span className="datas__content--data">{geolocatioDatas.lat}</span>
        </p>
        <p className="datas__content--label">
          Lon :{' '}
          <span className="datas__content--data">{geolocatioDatas.lon}</span>
        </p>
        <p className="datas__content--label">
          Région :{' '}
          <span className="datas__content--data">
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
