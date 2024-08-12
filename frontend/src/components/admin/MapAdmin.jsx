import React, { useState, useEffect } from 'react'
import { MapContainer, Marker, Polyline, TileLayer, useMap } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';
import userIco from '../../img/user.png';
import 'leaflet/dist/leaflet.css';

const position = [10.927957575535572, 76.92397088319751];
const bounds = [
  [10.933617318578328, 76.91699650949829],
  [10.921825692919896, 76.93112560982775]
];
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

const MapAdmin = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchNodes = axios.get('http://localhost:8080/api/m/nodes', {
      headers: {
        Authorization: `Basic ${token}`
      }
    });
    const fetchEdges = axios.get('http://localhost:8080/api/m/edges/view', {
      headers: {
        Authorization: `Basic ${token}`
      }
    });

    axios.all([fetchNodes, fetchEdges])
      .then(axios.spread((nodesResponse, edgesResponse) => {
        setNodes(nodesResponse.data);
        setEdges(edgesResponse.data);
        setLoaded(true);
        // console.log("Edges => ", edgesResponse.data);
      }))
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

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

                {
                  (loaded) && 
                  (
                    edges.map((edge, index) => {
                      console.log(`Mapped edge ${index} : Node 1 : `, edge.node1.coords, 'Node 2 : ', edge.node2.coords);
                      return (
                        <Polyline key={index} positions={[[edge.node1.coords[1], edge.node1.coords[0]], [edge.node2.coords[1], edge.node2.coords[0]]]} color='blue'/>
                      )
                    })
                  )
                } 
        </MapContainer>
    </div>
  )
}

export { MapAdmin }