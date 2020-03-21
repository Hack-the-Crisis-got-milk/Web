import React from "react";

import MapWithAMarker from './MapWithAMarker';

 export class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        currentLatLng: {
          lat: 0,
          lng: 0
        },
        isMarkerShown: false
      }
    }
  
    showCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            console.log(position.coords);
            this.setState(prevState => ({
              currentLatLng: {
                ...prevState.currentLatLng,
                lat: position.coords.latitude,
                lng: position.coords.longitude
              },
              isMarkerShown: true
            }))
          }
        )
      } 
    }
  
  
    componentDidMount() {
      this.showCurrentLocation()
    }
  
    render() {
      return (
        <div style = {{width: "70vw", height: "100vh"}}>
          <MapWithAMarker
            isMarkerShown={this.state.isMarkerShown}
            currentLocation={this.state.currentLatLng} />
        </div>
      );
    }
  };

  export default App;