import React from 'react';
import { LoadScript } from '@react-google-maps/api';

const libraries = ['places'];

const GoogleMapsLoader = ({ children }) => (
  <LoadScript googleMapsApiKey="AIzaSyDPdMM-l-_4b5wAVNvMkiFcntGELSqvyGA" libraries={libraries}>
    {children}
  </LoadScript>
);

export default GoogleMapsLoader;
