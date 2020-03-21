import React, { Component } from "react";
import Checkbox from "./Checkbox";
import MapWithAMarker from "./MapWithAMarker";
import Grid from "@material-ui/core/Grid";

const items = ["Milk", "Bread", "Water"];

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLatLng: {
        lat: 0,
        lng: 0
      },
      isMarkerShown: false
    };
  }

  showCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position.coords);
        this.setState(prevState => ({
          currentLatLng: {
            ...prevState.currentLatLng,
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          isMarkerShown: true
        }));
      });
    }
  };

  componentWillMount = () => {
    this.selectedCheckboxes = new Set();
  };

  componentDidMount() {
    this.showCurrentLocation();
  }

  toggleCheckbox = label => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }
  };

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();

    for (const checkbox of this.selectedCheckboxes) {
      console.log(checkbox, "is selected.");
    }
  };

  createCheckbox = label => (
    <Checkbox
      label={label}
      handleCheckboxChange={this.toggleCheckbox}
      key={label}
    />
  );

  createCheckboxes = () => items.map(this.createCheckbox);

  render() {
    return (
      <div>
        <Grid container spacing={12} style={{ width: "100vw", height: "50vw" }}>
          <Grid item xs={8}>
            <MapWithAMarker
              isMarkerShown={this.state.isMarkerShown}
              currentLocation={this.state.currentLatLng}
            />
          </Grid>
          <Grid item xs={4}>
            <div className="container" position="absolute">
              <div className="row">
                <div className="col-sm-12">
                  <div>
                    <h1>Wishlist</h1>
                  

                  <form onSubmit={this.handleFormSubmit}>
                    {this.createCheckboxes()}

                    <button className="btn btn-default" type="submit">
                      Save
                    </button>
                  </form>

                  </div>

                  <div style={{paddingTop:"50%"}}>
                    <h1>Search</h1>
                  
                  <form onSubmit={this.handleFormSubmit} >
                    {this.createCheckboxes()}

                    <button className="btn btn-default" type="submit">
                      Search
                    </button>
                  </form>

                  </div>

                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
