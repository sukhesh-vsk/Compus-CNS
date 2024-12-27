import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import userIco from '/img/user.png';

const smallIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [18, 28],
  iconAnchor: [7.5, 25],
  popupAnchor: [0, -25],
  shadowSize: [25, 25]
});

const createCustomIcon = (label) => {
  return L.divIcon({
    className: 'custom-label',
    html: `<div class="text-xs text-white font-semibold">${label}</div>`,
    iconAnchor: [15, -2]
  });
};

const userIcon = L.icon({
  iconUrl: userIco,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

export { smallIcon, createCustomIcon, userIcon }