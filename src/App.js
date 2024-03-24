import { useState, useEffect } from 'react';
import Header from './components/Header/';
import Map from './components/Map/';
import Footer from './components/Footer/';
import './_shared.scss';

function App() {
  const [ip, setIp] = useState('');
  const [IpDatas, setIpDatas] = useState('');
  const [IpLat, setIpLat] = useState('');
  const [IpLon, setIpLon] = useState('');
  const [geolocationCity, setGeolocationCity] = useState([]);
  const [geoLat, setGeoLat] = useState('');
  const [geoLon, setGeoLon] = useState('');

  /**
   * Get location information from geolocation API
   */
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      // console.log(position.coords.latitude, position.coords.longitude);
      // console.log(position);
      setGeoLat(position.coords.latitude);
      setGeoLon(position.coords.longitude);
      // getGeolocationDatas(position.coords.latitude, position.coords.longitude);
    });
  } else {
    console.log('no');
  }
  /**
   * Fetch backend to get IP informations
   */
  const fetchIp = async () => {
    try {
      const response = await fetch('http://localhost:4000');
      const data = await response.json();
      // console.log(data);
      setIp(data.ip);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Fetch geolocation datas with IP address
   * @param {string} ip
   */
  const getIpDatas = async (ip) => {
    try {
      const response = await fetch(`http://ip-api.com/json/${ip}`);
      const data = await response.json();
      // check errors here
      setIpDatas(data);
      setIpLat(data.lat);
      setIpLon(data.lon);
    } catch (error) {
      console.log(error);
    }
  };

  const getGeolocationDatas = async (geoLat, geoLon) => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/reverse?lat=${geoLat}&lon=${geoLon}&appid=4e02788426486030d33ca69dde69af9d`
      );
      const data = await response.json();
      if (response.status === 200) {
        setGeolocationCity(data[0].name);
      }
      if (response.status === 429) {
        setGeolocationCity('unvailable');
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Fetch backend to get location from IP address
   */
  useEffect(() => {
    fetchIp();
  }, []);

  /**
   * Launch geolocation datas fetch when ip is set
   */
  useEffect(() => {
    getIpDatas(ip);
  }, [ip]);

  /**
   * If geolocation API authorized fetch reverse location API to get city name
   */
  useEffect(() => {
    (geoLat !== '') & (geoLon !== '') && getGeolocationDatas(geoLat, geoLon);
  }, [geoLat, geoLon]);

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
          <span className="datas__content--data">
            {IpDatas.city} - {geolocationCity}
          </span>
        </p>
        <p className="datas__content--label">
          Country :{' '}
          <span className="datas__content--data">{IpDatas.country}</span>
        </p>
        <p className="datas__content--label">
          Lat :{' '}
          <span className="datas__content--data">
            {IpDatas.lat} - {geoLat}
          </span>
        </p>
        <p className="datas__content--label">
          Lon :{' '}
          <span className="datas__content--data">
            {IpDatas.lon} - {geoLon}
          </span>
        </p>
        <p className="datas__content--label">
          Région :{' '}
          <span className="datas__content--data">{IpDatas.regionName}</span>
        </p>
      </div>
      {/* Check if lat and lon is defined */}
      {(IpLat !== '') & (IpLon !== '') && (
        <Map IpLat={IpLat} IpLon={IpLon} geoLat={geoLat} geoLon={geoLon} />
      )}
      <Footer />
    </div>
  );
}

export default App;
