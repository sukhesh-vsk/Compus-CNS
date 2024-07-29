import { GeoJSON } from "react-leaflet";

export const ShowMinPath = ({userLocation, place}) => {
    console.log(`Place => `);
    console.log(place);
    if(place === undefined) {
        return null;
    }

    return <GeoJSON data={place} style={{ color: "yellow" }}/>;
}