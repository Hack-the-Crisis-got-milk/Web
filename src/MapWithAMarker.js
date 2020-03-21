import React, { Component } from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

//const [selectedShop, setSelectedShop] = React.useState(1);

const MapWithAMarker = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyA_WObUiYD7YpoYufR84re1LZHAJeAGXkY",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={13}
    center={{ lat: props.currentLocation.lat, lng: props.currentLocation.lng }}
  >
    {props.shops.shops.map(shop => (
      <Marker
        position={{
          lat: shop.loc.lat,
          lng: shop.loc.lng
        }}
      />
    ))}
  </GoogleMap>
));

export default MapWithAMarker;
