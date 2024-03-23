import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import './Map.scss';

const Map = ({ lat, lon }) => {
  const position = [lat, lon];
  return (
    <div>
      <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>Your current position.</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
