import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, useMap, Polyline } from 'react-leaflet';
import { createCustomIcon, smallIcon } from '../utils/MarkerIcons';
import { getClosestNode, getUserLocation } from '../utils/NavigationUtils';
import { ShowMinPath } from '../hooks';
import 'leaflet/dist/leaflet.css';
import { PlaceMarker } from '../components';

const position = [10.927957575535572, 76.92397088319751];
const bounds = [
    [10.933617318578328, 76.91699650949829],
    [10.921825692919896, 76.93112560982775]
];
const location = 1;
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

const MapComponent = ({ markerData, togglePopup, destinationID, setSelectedPlaceData }) => {
    const [currentPath, setCurrentPath] = useState(null);
    const [mapData, setMapData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [userPosition, setUserPosition] = useState(null);
    const [closestNode, setClosestNode] = useState(null);

    useEffect(() => {
        getUserLocation(setUserPosition);
    }, []);

    useEffect(() => {
        if (destinationID != null) {
            const closest = getClosestNode(mapData, userPosition, setClosestNode);
            setClosestNode(closest);
        } else {
            setCurrentPath(null);
        }
    }, [destinationID, mapData, userPosition]);
    
    useEffect(() => {
        if (closestNode && destinationID != null) {    
            axios.get(`/cns/api/m/locate/${closestNode.id}/${destinationID}`, {
                headers: {
                    Authorization: `Basic ${token}`
                }
            })
            .then(response => {
                const pathData = response.data.map(coord => [coord[1], coord[0]]);
                
                if(pathData.lenght !== 0) {
                    const updatedPath = [userPosition, ...pathData];
                    setCurrentPath(updatedPath);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        }
    }, [closestNode, destinationID, userPosition]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/m/blocks', 
            {
            headers: {
                Authorization: `Basic ${token}`
            }}
        )
            .then(response => {
                setMapData(response.data);
                markerData(response.data);
                setLoaded(true);
                console.log("Blocks Data : ", mapData);
                console.log("Loaded => ", response);
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
                    accessToken={import.meta.env.VITE_STADIA_API_KEY}
                    // minZoom={17}
                    // maxZoom={20}
                />

                {/* Setting initial bound to load */}
                <FitBounds />

                {/* Adding place markers */}
                {mapData.map((block, index) => {
                    // console.log("Blocks:", block);
                    return (
                        <PlaceMarker 
                            markerPos={[block.blockID.coords[1], block.blockID.coords[0]]}
                            markerIcon={smallIcon}
                            labelIcon={createCustomIcon(block.name)}
                            key={index}
                            eventHandler={{
                                click: () => {
                                    setSelectedPlaceData(block);
                                    togglePopup(true);
                                },
                            }}
                        />
                    );
                })}
                    
                {/* Adding user location marker */}
                {
                    userPosition && 
                    <PlaceMarker
                        markerPos={userPosition}
                        markerIcon={smallIcon}
                        labelIcon={createCustomIcon("Your Location")}
                        index={"user-pos"}
                    />
                }

                {/* Showing Minimum path */}
                {currentPath != null && <Polyline positions={currentPath} color='blue'/>}
            </MapContainer>
        </div>
    );
};

export { MapComponent };