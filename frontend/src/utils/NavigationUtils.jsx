import { kdTree } from "kd-tree-javascript";

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

  const [closestNode, dist] = tree.nearest({ coords: pos }, 1)[0]; 

  console.log("Closest Node => ", closestNode.coords, "with ID:", closestNode.id);
  return closestNode;
}

const getUserLocation = (setUserPosition) => {
  if ("geolocation" in navigator) {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserPosition([latitude, longitude]);
        console.log("User is in " + position.coords.latitude + " long: " + position.coords.longitude);
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
}

export { getClosestNode, getUserLocation }