import React, { useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  DirectionsRenderer,
  OverlayView,
} from "@react-google-maps/api";

// Marker component
const IconMarker = ({ position, icon, size = 40, pulse }) => {
  if (!position) return null;

  return (
    <OverlayView
      position={position}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <div
        style={{
          position: "relative",
          width: size,
          height: size,
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      >
        {/* Pulse */}
        {pulse && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: size * 1.8,
              height: size * 1.8,
              backgroundColor: "rgba(0,0,0,0.25)",
              borderRadius: "50%",
              transform: "translate(-50%, -50%)",
              animation: "pulse 1.6s ease-out infinite",
            }}
          />
        )}

        {/* Icon */}
        <img
          src={icon}
          alt="marker"
          style={{
            width: size,
            height: size,
            position: "relative",
            zIndex: 2,
          }}
        />
      </div>
    </OverlayView>
  );
};

// Map options
const routeMapOptions = {
  disableDefaultUI: true,
  draggable: false,
  zoomControl: false,
  scrollwheel: false,
  disableDoubleClickZoom: true,
  gestureHandling: "none",
  styles: [
    { elementType: "geometry", stylers: [{ color: "#f2f2f2" }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#e6e6e6" }] },
    { featureType: "transit", stylers: [{ visibility: "off" }] },
    { featureType: "administrative", stylers: [{ visibility: "off" }] },
  ],
};

const RouteMap = ({
  locationA,
  locationB,
  locationAIcon,
  locationBIcon,
  locationAIconSize = 40,
  locationBIconSize = 34,
  locationAPulse = true,
  locationBPulse = true,
  height = "400px",
  followDriver = true,
}) => {
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [liveLocationA, setLiveLocationA] = useState(locationA);

  const mapRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API,
  });

  // Calculate route once when map loads or destination changes
  useEffect(() => {
    if (isLoaded && locationA?.lat && locationB?.lat) {
      const calculateRoute = async () => {
        try {
          const directionsService = new google.maps.DirectionsService();
          const result = await directionsService.route({
            origin: locationA,
            destination: locationB,
            travelMode: google.maps.TravelMode.DRIVING,
            provideRouteAlternatives: false,
            optimizeWaypoints: false,
            drivingOptions: {
              departureTime: new Date(),
              trafficModel: "bestguess",
            },
          });
          setDirectionsResponse(result);
          if (mapRef.current) {
            mapRef.current.fitBounds(result.routes[0].bounds);
          }
        } catch (err) {
          console.error("Route error:", err);
        }
      };
      calculateRoute();
    }
  }, [isLoaded, locationA, locationB]);

  // Watch driver location (live marker)
  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (pos) => setLiveLocationA({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      }),
      (err) => console.error(err),
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);


  if (!isLoaded) return <div>Loading map…</div>;

  return (
    <div style={{ height, width: "100%", position: "relative" }}>
      <GoogleMap
        mapContainerStyle={{ height: "100%", width: "100%" }}
        onLoad={(map) => (mapRef.current = map)}
        options={routeMapOptions}
      >
        {/* Route */}
        {directionsResponse && (
          <DirectionsRenderer
            directions={directionsResponse}
            options={{
              suppressMarkers: true,
              polylineOptions: {
                strokeColor: "#2563eb",
                strokeWeight: 6,
                strokeOpacity: 1,
                geodesic: false,
              },
            }}
          />
        )}

        {/* Pickup / Driver */}
        <IconMarker
          position={liveLocationA}
          icon={locationAIcon}
          size={locationAIconSize}
          pulse={locationAPulse}
        />

        {/* Destination */}
        <IconMarker
          position={locationB}
          icon={locationBIcon}
          size={locationBIconSize}
          pulse={locationBPulse}
        />
      </GoogleMap>
    </div>
  );
};

export default RouteMap;
