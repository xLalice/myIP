import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import './Map.scss';

const Map = ({ lat, lon }) => {
  return (
    <div id="map">
      <MapContainer center={[lat, lon]} zoom={6} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lon]}>
          <Popup>Your current position.</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
