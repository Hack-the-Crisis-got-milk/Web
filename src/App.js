import React from "react";
import {GoogleMap, withScriptjs, withGoogleMap, Marker} from "react-google-maps";

function Map(){


    return(
        <GoogleMap 
        defaultZoom={10} 
        default center={{lat: 12, lng: 12}}
        />
    );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function App(){
    return (
    <div style = {{width: "100vw", height: "100vh"}}>
        <WrappedMap 
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBrh4Eg_knGfWdlbpF8q4Dr4Poca3E2WPw`}
        loadingElement= {<div style= {{height:"100%"}} />}
        containerElement= {<div style= {{height:"100%"}} />}
        mapElement= {<div style= {{height:"100%"}} />}
    />
    </div>
    )
}