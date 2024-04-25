import { useState, useEffect } from 'react';
import KEYS from './API_KEYS';
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
    // const url = 'http://localhost:4000';
    const url = 'https://getip.gaetantremois.fr';
    try {
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data);
      setIp(data.ip);
      setIsLoadedIp(true);
    } catch (error) {
      console.log('Error : ', error.message);
    }
  };

  /**
   * Fetch geolocation datas with IP address
   * @param {string} ip
   * @param {string} KEYS.IP_INFO_API_KEY
   */
  const getIpDatas = async (ip) => {
    try {
      const response = await fetch(
        `https://ipinfo.io/${ip}?token=${KEYS.IP_INFO_API_KEY}`
      );
      const data = await response.json();
      // check errors here
      if (response.status === 200) {
        setIpDatas(data);
        setIpLat(Number(data.loc.split(',')[0]));
        setIpLon(Number(data.loc.split(',')[1]));
        setIsLoadedIpDatas(true);
      }
      if (response.status !== 200) {
        console.log(response.status);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  /**
   * Fetch openweather api with geolocation data
   * @param {number} lat
   * @param {number} lon
   */
  const fetchCityFromGeolocation = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`
      );
      const data = await response.json();
      // console.log(data);
      setGeolocationCity(data.address.village);
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

  useEffect(() => {
    fetchCityFromGeolocation(Number(geoLat), Number(geoLon));
  }, [geoLat, geoLon]);

  return (
    <div className="main">
      <Header />
      <Datas
        ip={IpDatas.ip}
        isLoadedIp={isLoadedIp}
        isLoadedIpDatas={isLoadedIpDatas}
        ipCity={IpDatas.city}
        geolocationCity={geolocationCity}
        ipCountry={IpDatas.country}
        ipLat={IpLat}
        ipLon={IpLon}
        geoLat={geoLat}
        geoLon={geoLon}
        ipRegion={IpDatas.region}
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
