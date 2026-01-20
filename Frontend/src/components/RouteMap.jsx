import React, { useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  DirectionsRenderer,
  OverlayView,
} from "@react-google-maps/api";


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
        {pulse === true && (
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

const RouteMap = ({
  locationA,
  locationB,

  locationAIcon,
  locationBIcon,

  locationAIconSize = 40,
  locationBIconSize = 34,

  locationAPulse = true,
  locationBPulse = true,
}) => {
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const mapRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API,
  });

  useEffect(() => {
    if (isLoaded && locationA?.lat && locationB?.lat) {
      calculateRoute();
    }
  }, [isLoaded, locationA, locationB]);

  const calculateRoute = async () => {
    const directionsService = new google.maps.DirectionsService();

    try {
      const result = await directionsService.route({
        origin: locationA,
        destination: locationB,
        travelMode: google.maps.TravelMode.DRIVING,
      });

      setDirectionsResponse(result);

      if (mapRef.current) {
        mapRef.current.fitBounds(result.routes[0].bounds, {
          top: 80,
          bottom: 200,
          left: 60,
          right: 60,
        });
      }
    } catch (err) {
      console.error("Route error:", err);
    }
  };

  if (!isLoaded) return <div>Loading map…</div>;

  return (
    <div style={{ height: "80vh", width: "100%", position: "relative" }}>
      <GoogleMap
        mapContainerStyle={{ height: "100%", width: "100%" }}
        onLoad={(map) => (mapRef.current = map)}
        options={{
          disableDefaultUI: true,
          gestureHandling: "greedy",
        }}
      >
        {/* Route */}
        {directionsResponse && (
          <DirectionsRenderer
            directions={directionsResponse}
            options={{
              suppressMarkers: true,
              polylineOptions: {
                strokeColor: "#000",
                strokeWeight: 5,
                strokeOpacity: 0.8,
              },
            }}
          />
        )}

        {/* locationA */}
        <IconMarker
          position={locationA}
          icon={locationAIcon}
          size={locationAIconSize}
          pulse={locationAPulse}
        />

        {/* locationB */}
        <IconMarker
          position={locationB}
          icon={locationBIcon}
          size={locationBIconSize}
          pulse={locationBPulse}
        />
      </GoogleMap>

      {/* Bottom sheet */}
      <div style={styles.bottomSheet}>
        <div style={styles.dragHandle} />
        <button style={styles.actionButton} onClick={calculateRoute}>
          RE-CENTER ROUTE
        </button>
      </div>
    </div>
  );
};

const styles = {
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    zIndex: 10,
    padding: "16px 20px 32px",
    borderTopLeftRadius: "24px",
    borderTopRightRadius: "24px",
    boxShadow: "0 -10px 30px rgba(0,0,0,0.08)",
  },
  dragHandle: {
    width: "40px",
    height: "4px",
    backgroundColor: "#e5e7eb",
    borderRadius: "2px",
    margin: "0 auto 16px",
  },
  actionButton: {
    width: "100%",
    backgroundColor: "#000",
    color: "#fff",
    border: "none",
    padding: "14px",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default RouteMap;
