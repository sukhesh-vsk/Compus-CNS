import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, useMap, GeoJSON, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { mapData, mapLayout, minimumPath } from '../datas/data';
import { ShowMinPath } from '../hooks';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import userIco from '../img/user.png';
import axios from 'axios';
import { kdTree } from 'kd-tree-javascript';

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

const userIcon = L.icon({
    iconUrl: userIco,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

const placeMarker = (blockData, index) => {
    return (
        <React.Fragment key={index}>
            <Marker 
                position={[blockData.blockID.coords[1], blockData.blockID.coords[0]]}
                eventHandlers={{
                    click: () => {
                        markerData(blockData);
                        togglePopup(true);
                    },
                }}
                icon={smallIcon}
            />
            <Marker
                position={[blockData.blockID.coords[1], blockData.blockID.coords[0]]}
                icon={createCustomIcon(blockData.name)}
                interactive={false}
            />
        </React.Fragment>
    )
}

const createCustomIcon = (label) => {
  return L.divIcon({
    className: 'custom-label',
    html: `<div class="text-xs text-white font-semibold">${label}</div>`,
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

function distance(a, b) {
    return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
};

function getClosestNode(nodes, pos) {
    const tree = new kdTree(
        nodes.map(node => ({
            coords: [node.blockID.coords[1], node.blockID.coords[0]],
            id: node.blockID.id 
        })),
        (a, b) => {
            console.log({"a: ": a.id, " b: ": b.id});
            distance(a.coords, b.coords)
        },
        ["coords"]
    );

<<<<<<< HEAD
    const [closestNode, dist] = tree.nearest({ coords: pos }, 1)[0]; 

    console.log("Closest Node => ", closestNode.coords, "with ID:", closestNode.id);
    return closestNode;
=======
    console.log("Closest Node => ", closestNode);
    return closestNode[0][0];
>>>>>>> origin/sk/feat
}

const MapComponent = ({ selectedPlace, markerData, togglePopup, destinationID }) => {
    const [currentPath, setCurrentPath] = useState(null);
    const [clearingPath, setClearingPath] = useState(false);
    const [mapData, setMapData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [userPosition, setUserPosition] = useState(null);
    const [closestNode, setClosestNode] = useState(null);

    useEffect(() => {
        if ("geolocation" in navigator) {
          const watchId = navigator.geolocation.watchPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setUserPosition([latitude, longitude]);
            //   console.log("User is in " + position.coords.latitude + " long: " + position.coords.longitude);
            },
            (error) => {
              console.error("Error retrieving user position:", error);
            },
            { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
          );
          return () => navigator.geolocation.clearWatch(watchId);
        } else {
          console.log("Geolocation not available");
        }
      }, []);      

      useEffect(() => {
        if (destinationID != null) {
            const closest = getClosestNode(mapData, userPosition);
            setClosestNode(closest);
        } else {
            setCurrentPath(null);
        }
    }, [destinationID, mapData, userPosition]);
    
    useEffect(() => {
<<<<<<< HEAD
        if (closestNode && destinationID != null) {
            // console.log("Temp : " + closestNode.id);
    
            axios.get(`http://localhost:8080/api/m/locate/${closestNode.id}/${destinationID}`, {
=======
        if(destinationID != null) {
            console.log("User Pos : ", userPosition);
            const nearNode = getClosestNode(mapData, userPosition);
            // <Polyline positions={[userPosition, nearNode]} color='blue' />
            axios.get(`http://localhost:8080/api/m/locate/${location}/${destinationID}`, {
>>>>>>> origin/sk/feat
                headers: {
                    Authorization: `Basic ${token}`
                }
            })
            .then(response => {
                const pathData = response.data.map(coord => [coord[1], coord[0]]);
<<<<<<< HEAD
                
                if(pathData.lenght !== 0) {
                    const updatedPath = [userPosition, ...pathData];
                    setCurrentPath(updatedPath);
                }
=======
                // const t = pathData;
                pathData.splice(0, 1, userPosition, nearNode);

                // console.log("Near node : ", nearNode);
                console.log("Path Data -> ", pathData)
                setCurrentPath(pathData);
>>>>>>> origin/sk/feat
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        }
    }, [closestNode, destinationID, userPosition]);
    

    // useEffect(() => {
    //     if (selectedPlace && minimumPath[selectedPlace]) {
    //         setClearingPath(true);
    //     } else {
    //         setCurrentPath(null);
    //     }
    // }, [selectedPlace]);

    // useEffect(() => {
    //     if (clearingPath) {
    //         setCurrentPath(null);
    //         setTimeout(() => {
    //             setCurrentPath(minimumPath[selectedPlace]);
    //             setClearingPath(false);
    //         }, 0);
    //     }
    // }, [clearingPath, selectedPlace]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/m/blocks', {
            headers: {
                Authorization: `Basic ${token}`
            }})
            .then(response => {
                setMapData(response.data);
                markerData(response.data);
                setLoaded(true);
                console.log("Blocks Data : ", mapData);
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
                        placeMarker(block, index)
                    );
                })}
                    
                    {/* Adding user location marker */}
                    {
                        userPosition && 
                        <React.Fragment>
                            <Marker 
                                position={userPosition}
                                icon={smallIcon}
                            />
                            <Marker
                                position={userPosition}
                                icon={createCustomIcon("Your Location")}
                                interactive={false}
                            />
                        </React.Fragment>
                    }
                {/* Adding building blocks */}
                {/* {
                    Object.keys(mapLayout).map((key, index) => {
                        return (
                            <GeoJSON key={index} data={mapLayout[key]} style={{color: "#008ECC"}} />
                        );
                    })
                } */}

                {/* Adding user location marker */}
                {/* <Marker position={location} icon={userIcon}>
                    <Popup>Your Location</Popup>
                </Marker> */}

                {/* {currentPath && console.log("Min path => ", currentPath)} */}
                {/* Showing Minimum path */}
                {currentPath != null && <Polyline positions={currentPath} color='blue'/>}
            </MapContainer>
        </div>
    );
};

export { MapComponent };