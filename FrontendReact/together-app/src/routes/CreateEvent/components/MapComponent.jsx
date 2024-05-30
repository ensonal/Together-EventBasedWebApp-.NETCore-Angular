import React, { useState, useRef, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';


const libraries = ['places'];
const mapContainerStyle = {
  height: '400px',
  width: '800px',
  borderRadius: '10px',
};

const MapComponent = ({ onLocationSelect, onAddressSelect }) => {
  const [marker, setMarker] = useState(null);
  const [center, setCenter] = useState({ lat: 37.7749, lng: -122.4194 });
  const autocompleteRef = useRef(null);
  const mapRef = useRef(null);

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const onMapClick = async (e) => {
    const location = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    setMarker(location);
    onLocationSelect(location);
    setCenter(location);
    await fetchAddress(location);
  };

  const onLoad = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const onPlaceChanged = async () => {
    if (autocompleteRef.current !== null) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry) {
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        console.log("dasdas");
        setMarker(location);
        onLocationSelect(location);
        setCenter(location);
        mapRef.current.panTo(location);
        await fetchAddress(location);
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
  

  return (
    <LoadScript googleMapsApiKey="AIzaSyDPdMM-l-_4b5wAVNvMkiFcntGELSqvyGA" libraries={libraries}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={10}
        onLoad={onMapLoad}
        onClick={onMapClick}
      >
        {marker && <Marker position={marker} />}
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
    </LoadScript>
  );
};

export default MapComponent;
