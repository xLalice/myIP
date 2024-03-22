import { useState, useEffect } from 'react';
import Header from './components/Header/';
import './App.scss';

function App() {
  const [ip, setIp] = useState('');
  const [geolocatioDatas, setGeolocationDatas] = useState('');

  const fetchIp = async () => {
    try {
      const response = await fetch('http://localhost:4000');
      const data = await response.json();
      console.log(data);
      setIp(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getGeolocationDatas = async (ip) => {
    try {
      const response = await fetch(`http://ip-api.com/json/${ip}`);
      const data = await response.json();
      console.log(data);
      setGeolocationDatas(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchIp();
  }, []);

  useEffect(() => {
    getGeolocationDatas(ip.ip);
  }, [ip]);

  return (
    <div className="main">
      <Header />
      <h1>Get your IP Address</h1>
      <p className="main__content">
        Your IP address : <span className="main__content--datas">{ip.ip}</span>
      </p>
      <p className="main__content">
        City :{' '}
        <span className="main__content--datas">{geolocatioDatas.city}</span>
      </p>
      <p className="main__content">
        Country :{' '}
        <span className="main__content--datas">{geolocatioDatas.country}</span>
      </p>
      <p className="main__content">
        Lat :{' '}
        <span className="main__content--datas">{geolocatioDatas.lat}</span>
      </p>
      <p className="main__content">
        Lon :{' '}
        <span className="main__content--datas">{geolocatioDatas.lon}</span>
      </p>
      <p className="main__content">
        Région :{' '}
        <span className="main__content--datas">
          {geolocatioDatas.regionName}
        </span>
      </p>
    </div>
  );
}

export default App;
