import { useState, useEffect } from "react";
import axios from "axios";

export const useRideCoordinates = (ride) => {
  const [rideCoords, setRideCoords] = useState({ pickup: null, destination: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!ride?.pickup || !ride?.destination) return;

    const fetchCoordinates = async (address) => {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-coordinates`,
        {
          params: { address },
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      return response.data;
    };

    const fetchRideCoordinates = async () => {
      setLoading(true);
      setError(null);

      try {
        const [pickupData, destinationData] = await Promise.all([
          fetchCoordinates(ride.pickup),
          fetchCoordinates(ride.destination),
        ]);

        setRideCoords({ pickup: pickupData, destination: destinationData });
      } catch (err) {
        console.error("Error fetching coordinates:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRideCoordinates();
  }, [ride]);

  return { 
    pickupC: rideCoords.pickup, 
    destinationC: rideCoords.destination, 
    loading, 
    error 
  };
};
