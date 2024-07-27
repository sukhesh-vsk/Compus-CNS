import React, { useEffect } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

const position = [10.927957575535572, 76.92397088319751];
const bounds = [
    [10.933617318578328, 76.91699650949829],
    [10.921825692919896, 76.93112560982775]
];

const mapData = {
    "Classroom Block 1": {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "coordinates": [
                76.92481299254285,
                10.927741509257018
              ],
              "type": "Point"
            }
          }
        ]
    },
    "ES Block": {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "coordinates": [
                76.92415320802343,
                10.927585988849472
              ],
              "type": "Point"
            }
          }
        ]
    },
    "Main Block": {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "coordinates": [
                76.92578800992112,
                10.927670081305351
              ],
              "type": "Point"
            }
          }
        ]
    },
    "IT Block": {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "coordinates": [
                76.92529732115082,
                10.926189663956094
              ],
              "type": "Point"
            }
          }
        ]
    },
    "Aroma": {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "coordinates": [
                76.92322666294586,
                10.926982511920599
              ],
              "type": "Point"
            }
          }
        ]
      }
}

const FitBounds = () => {
    const map = useMap();
  
    useEffect(() => {
      map.fitBounds(bounds);
    }, [map]);
  
    return null;
}


const MapComponent = () => {
  return (
    <div id="map">
        <MapContainer 
            center={position} 
            zoom={13} 
            zoomControl = {false}
            style={{ height: "100vh", width: "100%" }}>
            <TileLayer 
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                zoom={18} 
                minZoom={17} 
                maxZoom={20} 
            />
            <FitBounds />

            {Object.keys(mapData).map((key, index) => {
                return mapData[key].features.map((feature, index) => {
                    return (
                        <Marker key={index} position={[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]}>
                            <Popup>
                                {key}
                            </Popup>
                        </Marker>
                    )
                })
            })}
        </MapContainer>
    </div>
  )
}

export { MapComponent }