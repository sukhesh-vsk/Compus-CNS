import React from "react";
import { Marker } from "react-leaflet";

const PlaceMarker = ({markerPos, markerIcon, labelIcon, index, eventHandler}) => {
  return (
    <React.Fragment key={index}>
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