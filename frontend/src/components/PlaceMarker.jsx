import React from "react";
import { Marker } from "react-leaflet";

const PlaceMarker = ({markerPos, markerIcon, labelIcon, eventHandler}) => {
  return (
    <React.Fragment>
        <Marker 
            position={markerPos}
            eventHandlers={eventHandler}
            icon={markerIcon}
        />
        <Marker
            position={markerPos}
            icon={labelIcon}
            interactive={false}
        />
    </React.Fragment>
)
}


export { PlaceMarker }