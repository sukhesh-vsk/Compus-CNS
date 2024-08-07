import React, { useEffect } from 'react'
import { TileLayer } from 'react-leaflet';

const position = [10.927957575535572, 76.92397088319751];

const FitBounds = () => {
  const map = useMap();

  useEffect(() => {
    map.fitBounds(bounds);
  }, [map]);

  return null;
};


const MapContainer = () => {
  return (
    <div id="map" className='flex-1 flex justify-center items-center'>
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
                <FitBounds />
        </MapContainer>
    </div>
  )
}

export { MapContainer }