import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './Map.scss';

const Map = ({ IpLat, IpLon, geoLat, geoLon }) => {
  let position = [];
  if (geoLat & geoLon) {
    const averageLat = (IpLat + geoLat) / 2;
    const averageLon = (IpLon + geoLon) / 2;
    position = [averageLat, averageLon];
  } else {
    position = [IpLat, IpLon];
  }
  return (
    <div id="map">
      <MapContainer center={position} zoom={9} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[IpLat, IpLon]}>
          <Popup>Your current IP position.</Popup>
        </Marker>
        {(geoLat !== '') & (geoLon !== '') && (
          <Marker position={[geoLat, geoLon]} style={{ color: 'red' }}>
            <Popup>Your current geolocation position.</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
