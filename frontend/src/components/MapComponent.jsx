import React, { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { mapData, mapLayout, minimumPath } from '../datas/data';
import { ShowMinPath } from '../hooks';

const position = [10.927957575535572, 76.92397088319751];
const bounds = [
    [10.933617318578328, 76.91699650949829],
    [10.921825692919896, 76.93112560982775]
];
const location = [76.9252057220969,10.926064290568462];

const FitBounds = () => {
    const map = useMap();
  
    useEffect(() => {
      map.fitBounds(bounds);
    }, [map]);
  
    return null;
}


const MapComponent = ({ selectedPlace }) => {
    const [currentPath, setCurrentPath] = useState(null);
    const [clearingPath, setClearingPath] = useState(false);

    // Update path when destination changes
    useEffect(() => {
        if (selectedPlace && minimumPath[selectedPlace]) {
            setClearingPath(true);
        } else {
            setCurrentPath(null);
        }
    }, [selectedPlace]);

    useEffect(() => {
        if (clearingPath) {
            setCurrentPath(null);
            setTimeout(() => {
                setCurrentPath(minimumPath[selectedPlace]);
                setClearingPath(false);
            }, 0);
        }
    }, [clearingPath, selectedPlace]);

  return (
    <div id="map">
        <MapContainer 
            center={position} 
            zoom={13} 
            zoomControl = {false}
            style={{ height: "100vh", width: "100%" }}>
            
            {/* Loading Basemap */}
            <TileLayer 
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                zoom={18} 
                minZoom={17} 
                maxZoom={20} 
            />
            {/* Setting initial bound to load */}
            <FitBounds />

            {/* Adding place markers */}
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

            {/* Adding building blocks */}
            {
                Object.keys(mapLayout).map((key, index) => {
                    return (
                        <GeoJSON key={index} data={mapLayout[key]} />
                    )
                })
            }

            {/* Showing Minimum path */}
            {currentPath && <ShowMinPath userLocation={location} place={currentPath} />}
        </MapContainer>
    </div>
  )
}

export { MapComponent }