import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, CircleF } from '@react-google-maps/api';

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
      { enableHighAccuracy: true }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '60vh' }}
      center={currentPosition}
      zoom={15}
    >
      <CircleF
        center={currentPosition}
        radius={50}
        options={{
          fillColor: '#4285F4',
          fillOpacity: 0.15,
          strokeColor: '#4285F4',
          strokeOpacity: 0.3,
          strokeWeight: 1,
          clickable: false,
        }}
      />

      <CircleF
        center={currentPosition}
        radius={20}
        options={{
          fillColor: '#4285F4',
          fillOpacity: 1,
          strokeColor: '#FFFFFF',
          strokeOpacity: 1,
          strokeWeight: 2,
          clickable: false,
        }}
      />
    </GoogleMap>
  );
};

export default LiveTracking;










// import React, { useState, useEffect } from 'react';
// import { GoogleMap, useJsApiLoader, CircleF } from '@react-google-maps/api';

// const mapOptions = {
//   disableDefaultUI: true,
//   styles: [
//     { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
//     { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
//     { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
//     { featureType: "water", elementType: "geometry", stylers: [{ color: "#e9e9e9" }] },
//   ],
// };

// const LiveTracking = () => {
//   const [currentPosition, setCurrentPosition] = useState({ lat: -3.745, lng: -38.523 });

//   const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API,
//   });

//   useEffect(() => {
//     const watchId = navigator.geolocation.watchPosition(
//       (pos) => setCurrentPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
//       null,
//       { enableHighAccuracy: true }
//     );
//     return () => navigator.geolocation.clearWatch(watchId);
//   }, []);

//   if (!isLoaded) return <div>Loading...</div>;

//   return (
//     <GoogleMap
//       mapContainerStyle={{ width: '100%', height: '100vh' }}
//       center={currentPosition}
//       zoom={17}
//       options={mapOptions}
//     >
//       <CircleF
//         center={currentPosition}
//         radius={40}
//         options={{
//           fillColor: '#000000',
//           fillOpacity: 0.1,
//           strokeColor: '#000000',
//           strokeOpacity: 0.2,
//           strokeWeight: 1,
//           clickable: false,
//         }}
//       />

//       <CircleF
//         center={currentPosition}
//         radius={10}
//         options={{
//           fillColor: '#000000',
//           fillOpacity: 1,
//           strokeColor: '#FFFFFF',
//           strokeOpacity: 1,
//           strokeWeight: 3,
//           clickable: false,
//         }}
//       />
//     </GoogleMap>
//   );
// };

// export default LiveTracking;