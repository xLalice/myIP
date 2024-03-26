import { useState, useEffect } from 'react';
import API_KEY from './API_KEY';
import Header from './components/Header/';
import Datas from './components/Datas/';
import Map from './components/Map/';
import Footer from './components/Footer/';
import './_shared.scss';

function App() {
  const [ip, setIp] = useState('');
  const [IpDatas, setIpDatas] = useState('');
  const [IpLat, setIpLat] = useState('');
  const [IpLon, setIpLon] = useState('');
  const [isLoadedIp, setIsLoadedIp] = useState(false);
  const [isLoadedIpDatas, setIsLoadedIpDatas] = useState(false);
  const [geolocationCity, setGeolocationCity] = useState([]);
  const [geoLat, setGeoLat] = useState('');
  const [geoLon, setGeoLon] = useState('');

  /**
   * Get location information from geolocation API
   */
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      setGeoLat(position.coords.latitude);
      setGeoLon(position.coords.longitude);
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
      setIsLoadedIp(true);
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
      if (response.status === 200) {
        setIpDatas(data);
        setIpLat(data.lat);
        setIpLon(data.lon);
        setIsLoadedIpDatas(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Get geolocation from geolocation API service
   * @param {number} geoLat
   * @param {number} geoLon
   */
  const getGeolocationDatas = async (geoLat, geoLon) => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/reverse?lat=${geoLat}&lon=${geoLon}&appid=${API_KEY}`
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
      <Datas
        ip={ip}
        isLoadedIp={isLoadedIp}
        isLoadedIpDatas={isLoadedIpDatas}
        ipCity={IpDatas.city}
        geolocationCity={geolocationCity}
        ipCountry={IpDatas.country}
        ipLat={IpDatas.lat}
        ipLon={IpDatas.lon}
        geoLat={geoLat}
        geoLon={geoLat}
        ipRegion={IpDatas.regionName}
      />
      {/* Check if lat and lon is defined */}
      {(IpLat !== '') & (IpLon !== '') ? (
        <Map IpLat={IpLat} IpLon={IpLon} geoLat={geoLat} geoLon={geoLon} />
      ) : (
        <div className="loader-map"></div>
      )}
      <Footer />
    </div>
  );
}

export default App;
