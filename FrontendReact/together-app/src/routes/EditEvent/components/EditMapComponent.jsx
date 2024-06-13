import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { GoogleMap, Marker, Autocomplete } from '@react-google-maps/api';
import locationIcon from '../../../assets/images/location.png'; // Marker icon path

const mapContainerStyle = {
  height: '400px',
  width: '800px',
  borderRadius: '10px',
};

const MapComponent = ({ onLocationSelect, onAddressSelect, preData }) => {
  const initialLocation = useMemo(() => {
    if (preData) {
      const lat = parseFloat(preData.latitude);
      const lng = parseFloat(preData.longitude);
      if (!isNaN(lat) && !isNaN(lng)) {
        return { lat, lng };
      }
    }
    return null;
  }, [preData]);

  const [marker, setMarker] = useState(initialLocation);
  const [center, setCenter] = useState(initialLocation);
  const autocompleteRef = useRef(null);
  const mapRef = useRef(null);

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    if (initialLocation) {
      map.panTo(initialLocation);
    }
  }, [initialLocation]);

  const onMapClick = async (e) => {
    const location = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    setMarker(location);
    setCenter(location);
    onLocationSelect(location);
    await fetchAddress(location);
  };

  const onLoad = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const onPlaceChanged = async () => {
    if (autocompleteRef.current !== null) {
      const place = autocompleteRef.current.getPlace();
      if (place?.geometry) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        if (!isNaN(lat) && !isNaN(lng)) {
          const location = { lat, lng };
          setMarker(location);
          setCenter(location);
          onLocationSelect(location);
          mapRef.current.panTo(location);
          await fetchAddress(location);
        }
      }
    }
  };

  const fetchAddress = async (location) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location }, (results, status) => {
      if (status === "OK" && results[0]) {
        const addressComponents = results[0].address_components;
        const cityComponent = addressComponents.find(component =>
          component.types.includes("locality") ||
          component.types.includes("administrative_area_level_1") ||
          component.types.includes("sublocality")
        );
        const city = cityComponent?.long_name || '';
        const country = addressComponents.find(component => component.types.includes("country"))?.long_name || '';
        onAddressSelect(city, country);
      }
    });
  };

  useEffect(() => {
    if (preData) {
      const lat = parseFloat(preData.latitude);
      const lng = parseFloat(preData.longitude);
      if (!isNaN(lat) && !isNaN(lng)) {
        console.log('preData', preData);
        const preLocation = { lat, lng };
        setMarker(preLocation);
        setCenter(preLocation);
      }
    }
  }, [preData]);

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={10}
      onLoad={onMapLoad}
      onClick={onMapClick}
    >
      {marker && (
        <Marker
          position={marker}
          icon={{
            url: locationIcon,
            scaledSize: new window.google.maps.Size(50, 50), // Adjust size if necessary
          }}
        />
      )}
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged} className='mt-3'>
        <input
          type="text"
          placeholder="Search for a place"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `32px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
            position: "absolute",
            left: "50%",
            marginLeft: "-120px"
          }}
        />
      </Autocomplete>
    </GoogleMap>
  );
};

export default MapComponent;
