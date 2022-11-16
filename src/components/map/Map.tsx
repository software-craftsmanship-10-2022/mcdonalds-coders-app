import React, {useEffect, useState} from 'react';
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import {useMarkers} from 'src/hooks/useMarkers';
import type {MarkerType} from '../../@types/marker';
import LeafletControlGeocoder from './LeafletControlGeocoder';
import './Map.css';
import MarkerIcon from './MarkerIcon';

type MapProps = {
  markers: MarkerType[];
  locateCurrent: boolean;
  setLocation: (location: string) => void;
};

const Map: React.FC<MapProps> = ({setLocation, locateCurrent}: MapProps) => {
  const [markers, setMarkers] = useState<MarkerType[]>([]);
  const {getAllMarkers} = useMarkers();

  useEffect(() => {
    getAllMarkers()
      .then((markerFromApi: MarkerType[]) => {
        setMarkers(markerFromApi);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <MapContainer
      center={{lat: -34.7355251653576, lng: -58.391348921321224}}
      zoom={9}
      className="Map"
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers.map((value, index) => (
        <Marker
          key={index}
          position={{
            lat: value.lat,
            lng: value.lng,
          }}
          icon={MarkerIcon}
          eventHandlers={{
            click() {
              setLocation(value.location);
            },
          }}
        >
          <Popup>{value.location}</Popup>
        </Marker>
      ))}
      {locateCurrent && (
        <>
          <LeafletControlGeocoder setLocation={setLocation} />
        </>
      )}
    </MapContainer>
  );
};

export default Map;
