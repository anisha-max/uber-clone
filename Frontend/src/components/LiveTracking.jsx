import React, { useState, useEffect, useMemo } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';

const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState({ lat: -3.745, lng: -38.523 });

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API,
  });

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (pos) => setCurrentPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      null,
      { enableHighAccuracy: true, maximumAge: 10000 }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '100vh' }}
      center={currentPosition}
      zoom={15}
    >
      {/* Use MarkerF instead of Marker or AdvancedMarkerElement */}
      <MarkerF position={currentPosition} />
    </GoogleMap>
  );
};

export default LiveTracking;