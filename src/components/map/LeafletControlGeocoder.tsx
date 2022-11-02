import * as L from "leaflet";
import Geocoder, { geocoders } from "leaflet-control-geocoder";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import MarkerIcon from "./MarkerIcon";

// Init the empty layerGroup used to control search markers
const layerGroup = L.layerGroup();

type LeafletControlGeocoderProps = {
  setLocation: (location: string) => void;
};

// Geocode Wrapper function for the Leaflet Map
const LeafletControlGeocoder = ({
  setLocation,
}: LeafletControlGeocoderProps) => {
  const map = useMap();
  const geocoder = geocoders.nominatim({
    geocodingQueryParams: {
      limit: 3,
      countrycodes: "ar",
    },
  });

  // This listeners are inside a useEffect hook
  // because we need to remove those when the user
  // changes back to pickup view.
  useEffect(() => {
    map.on("click", (e) => {
      // Clear the layerGroup from previous stored circle and marker
      layerGroup.clearLayers();

      geocoder.reverse(
        e.latlng,
        map.options.crs!.scale(map.getZoom()),
        (results) => {
          const result = results[0];
          if (result) {
            const marker = L.marker(result.center, {
              icon: MarkerIcon,
            })
              .addTo(layerGroup)
              .bindPopup(result.name);

            // Here add the layerGroup to the map
            map.addLayer(layerGroup);
            marker.openPopup();
            map.flyTo(result.center, map.getZoom());
            setLocation(result.name);
          }
        }
      );
    });

    const control = new Geocoder({
      query: "",
      placeholder: "Buscar dirección...",
      defaultMarkGeocode: false,
      geocoder,
    })
      .on("markgeocode", (e) => {
        // Clear the layerGroup from previous stored circle and marker
        layerGroup.clearLayers();
        // Send location name to parent
        setLocation(e.geocode.name);
        // Append new marker to the map
        const latlng = e.geocode.center;
        const marker = L.marker(latlng, {
          icon: MarkerIcon,
        })
          .addTo(layerGroup)
          .bindPopup(e.geocode.name);
        map.fitBounds(e.geocode.bbox);

        // Here add the layerGroup to the map
        map.addLayer(layerGroup);
        marker.openPopup();
      })
      .addTo(map);

    // Cleanup function (removes the search element & control)
    return () => {
      map.removeControl(control);
      map.removeEventListener("click");
      layerGroup.clearLayers();
      setLocation("");
    };
  }, [map, geocoder, setLocation]);

  return null;
};

export default LeafletControlGeocoder;
