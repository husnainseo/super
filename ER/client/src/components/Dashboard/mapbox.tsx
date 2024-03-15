import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';

interface MapComponentProps {
  accessToken: string;
  location: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ accessToken, location }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const geocodingClient = mbxGeocoding({
    accessToken: accessToken
  });

  useEffect(() => {
    const response = async () => {
      try {
        const lang = await geocodingClient.forwardGeocode({
          query: location + ", Pakistan",
          limit: 1,
        }).send();
        console.log("lang", lang.body.features[0].geometry.coordinates);
        setLng(lang.body.features[0].geometry.coordinates[0]);
        setLat(lang.body.features[0].geometry.coordinates[1]);
      } catch (error) {
        console.error("Error in geocoding:", error);
      }
    };

    response();
  }, [geocodingClient, location]);

  console.log(lng, lat);
  useEffect(() => {
    mapboxgl.accessToken = accessToken;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [lng || 0, lat || 0], 
      zoom: 12,
    });

    const marker = new mapboxgl.Marker()
      .setLngLat([lng || 0, lat || 0]) 
      .addTo(map);

    map.on('load', () => {
      map.addSource('single-point', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [lng || 0, lat || 0], 
            },
            properties: {},
          }],
        },
      });

      map.addLayer({
        id: 'point',
        source: 'single-point',
        type: 'circle',
        paint: {
          'circle-radius': 10,
          'circle-color': '#448ee4',
        },
      });
    });

    return () => map.remove();
  }, [accessToken, lng, lat]);

  return <div ref={mapContainerRef} className='h-[340px] w-full rounded-xl' />;
};

export default MapComponent;