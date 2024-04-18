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
    // const url = 'http://localhost:4000';
    const url = 'https://myip.gaetantremois.fr/';
    try {
      const response = await fetch(url);
      const data = await response.json();
      setIp(data.ip);
      setIsLoadedIp(true);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Fetch geolocation datas with IP address
   * @param {string} ip
   * @param {string} API_KEY
   */
  const getIpDatas = async (ip) => {
    try {
      const response = await fetch(`https://ipinfo.io/${ip}?token=${API_KEY}`);
      const data = await response.json();
      // check errors here
      if (response.status === 200) {
        setIpDatas(data);
        setIpLat(Number(data.loc.split(',')[0]));
        setIpLon(Number(data.loc.split(',')[1]));
        setGeolocationCity(data.city);
        setIsLoadedIpDatas(true);
      }
      if (response.status !== 200) {
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
        ipLat={IpLat}
        ipLon={IpLon}
        geoLat={geoLat}
        geoLon={geoLat}
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
