import React, { Component } from "react";
import Checkbox from "./Checkbox";
import MapWithAMarker from "./MapWithAMarker";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";

const items = ["Milk", "Bread", "Water"];

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLatLng: {
        lat: 0,
        lng: 0
      },
      isMarkerShown: false,
      shops: [],
      item_groups: []
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
    this.getDataAxios();
    this.getItemGroupsAxios();
    this.showCurrentLocation();
  }

  async getDataAxios() {
    const response = await axios.get(
      "http://ec2-18-130-190-158.eu-west-2.compute.amazonaws.com:8010/api/v1/shops/"
    );
    this.setState({ shops: response.data });
  }

  async getItemGroupsAxios(){
    const response = await axios.get(
      "http://ec2-18-130-190-158.eu-west-2.compute.amazonaws.com:8010/api/v1/itemgroups/"
    );
    this.setState({ item_groups: response.data.item_groups });
    this.state.item_groups.map(item => (
      console.log(item.name)
    ));
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
      label={label.name}
      handleCheckboxChange={this.toggleCheckbox}
      key={label.name}
    />
  );

  createCheckboxes = () => this.state.item_groups.map(this.createCheckbox);

  render() {
    return (
      <div>
        <Grid container spacing={10} style={{ width: "100vw", height: "50vw" }}>
          <Grid item xs={4}>
            <MapWithAMarker
              isMarkerShown={this.state.isMarkerShown}
              currentLocation={this.state.currentLatLng}
              shops={this.state.shops}
            />
          </Grid>
          <Grid item xs={3}>
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

                  <div style={{ paddingTop: "10%" }}>
                    <h1>Search</h1>
                    
                    <form onSubmit={this.handleFormSubmit}>
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
          <Grid item xs={4}>
            <div>
              <b>
                {this.state.shops.shops != null
                  ? this.state.shops.shops.map(shop => (
                      <React.Fragment>
                        <ul className="list-group">
                          <li className="list-group-item list-group-item-primary">
                            <Grid item>
                              <ButtonBase >
                                <img
                                  alt="complex"
                                  src={shop.photo}
                                />
                              </ButtonBase>
                            </Grid>
                            <Grid item xs>
                              <Typography gutterBottom variant="subtitle1">
                                {shop.name}
                              </Typography>
                              <Typography variant="body2" gutterBottom>
                                {shop.address}
                              </Typography>
                              <Typography variant="body2" >
                                Dabar:{" "}
                                <b>
                                  {shop.open_now ? "Atidaryta" : "Uzdaryta"}
                                </b>{" "}
                                .
                              </Typography>
                            </Grid>
                          </li>
                        </ul>
                      </React.Fragment>
                    ))
                  : `${console.log("ayaya")}`}
              </b>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
