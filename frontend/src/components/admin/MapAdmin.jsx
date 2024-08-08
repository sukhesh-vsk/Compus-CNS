import React, { useState, useEffect } from 'react'
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';
import userIco from '../../img/user.png';
import 'leaflet/dist/leaflet.css';

const position = [10.927957575535572, 76.92397088319751];
const bounds = [
  [10.933617318578328, 76.91699650949829],
  [10.921825692919896, 76.93112560982775]
];


const FitBounds = () => {
  const map = useMap();

  useEffect(() => {
    map.fitBounds(bounds);
  }, [map]);

  return null;
};

const MapAdmin = () => {
  const [nodes, setNodes] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const username = 'admin';
    const password = 'admin';
    const token = btoa(`${username}:${password}`);

    axios.get('http://localhost:8080/api/m/nodes', {
      headers: {
        'Authorization': `Basic ${token}`
      }
    })
      .then((response) => {
        setNodes(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    setLoaded(true);
    // console.log("nodes => ",nodes);
  }, [nodes]);

  return (
    <div id="map" className='flex-1 flex justify-center items-center w-full'>
        <MapContainer
                center={position} 
                zoom={18} 
                zoomControl={false}
                style={{ height: "100%", width: "100%" }}>
                
                
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.jpg"
                    zoom={20}
                    minZoom={18}
                    maxZoom={22}
                />
                <FitBounds />
                
                {
                  (loaded) && 
                  (nodes.map((node, index) => 
                    <Marker
                      position={[node.coords[1], node.coords[0]]}
                      key={index}
                    >
                    </Marker>
                  ))
                }
        </MapContainer>
    </div>
  )
}

export { MapAdmin }