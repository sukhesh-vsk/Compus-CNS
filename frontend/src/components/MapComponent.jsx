import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, useMap, GeoJSON, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { mapData, mapLayout, minimumPath } from '../datas/data';
import { ShowMinPath } from '../hooks';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import userIco from '../img/user.png';
import axios from 'axios';

const position = [10.927957575535572, 76.92397088319751];
const bounds = [
    [10.933617318578328, 76.91699650949829],
    [10.921825692919896, 76.93112560982775]
];
const location = [10.926215832597293, 76.92511344582738] 
const username = 'admin';
const password = 'admin';
const token = btoa(`${username}:${password}`);

const FitBounds = () => {
    const map = useMap();
  
    useEffect(() => {
      map.fitBounds(bounds);
    }, [map]);
  
    return null;
};

const userIcon = L.icon({
    iconUrl: userIco, // Corrected the image path assignment
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

const createCustomIcon = (label) => {
  return L.divIcon({
    className: 'custom-label',
    html: `<div class="text-xs text-black-500 font-semibold">${label}</div>`,
    iconAnchor: [15, -2]
  });
};

const smallIcon = L.icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [18, 28],
    iconAnchor: [7.5, 25],
    popupAnchor: [0, -25],
    shadowSize: [25, 25]
});

const fetchMinPath = (st, en) => {
    axios.get(`http://localhost:8080/api/m/locate/${st}/${en}`, {
        headers: {
            Authorization: `Basic ${token}`
        }
    })
    .then(response => {
        setMinPath(response.data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
};

const MapComponent = ({ selectedPlace, markerData, togglePopup }) => {
    const [currentPath, setCurrentPath] = useState(null);
    const [clearingPath, setClearingPath] = useState(false);
    const [mapData, setMapData] = useState([]);
    const [loaded, setLoaded] = useState(false);

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

    useEffect(() => {
        axios.get('http://localhost:8080/api/m/blocks', {
            headers: {
                Authorization: `Basic ${token}`
            }})
            .then(response => {
                setMapData(response.data);
                setLoaded(true);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            }); 
    }, []);

    return (
        <div id="map">
            <MapContainer 
                center={position} 
                zoom={13} 
                zoomControl={false}
                style={{ height: "100vh", width: "100%" }}>
                
                {/* Loading Basemap */}
                <TileLayer 
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.jpg"
                    zoom={18}
                    minZoom={17}
                    maxZoom={20}
                />

                {/* Setting initial bound to load */}
                <FitBounds />

                {/* Adding place markers */}
                {mapData.map((block, index) => {
                    return (
                        <React.Fragment key={index}>
                            <Marker 
                                position={[block.blockID.coords[1], block.blockID.coords[0]]}
                                eventHandlers={{
                                    click: () => {
                                        markerData(index);
                                        togglePopup(true);
                                    },
                                }}
                                icon={smallIcon}
                            />
                            <Marker
                                position={[block.blockID.coords[1], block.blockID.coords[0]]}
                                icon={createCustomIcon(block.name)}
                                interactive={false}
                            />
                        </React.Fragment>
                    );
                })}

                {/* Adding building blocks */}
                {/* {
                    Object.keys(mapLayout).map((key, index) => {
                        return (
                            <GeoJSON key={index} data={mapLayout[key]} style={{color: "#008ECC"}} />
                        );
                    })
                } */}

                {/* Adding user location marker */}
                <Marker position={location} icon={userIcon}>
                    <Popup>Your Location</Popup>
                </Marker>

                {/* Showing Minimum path */}
                {currentPath && <ShowMinPath userLocation={location} place={currentPath} />}
            </MapContainer>
        </div>
    );
};

export { MapComponent };