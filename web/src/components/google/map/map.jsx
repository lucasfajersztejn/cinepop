import { useEffect, useRef } from "react";
import movieIcon from "../../../assets/images/claquetaCine.png"

function Map({ className, center, markers, description, image }) {
  const mapRef = useRef();
  const markerRef = useRef(null);
  const infoWindowRef = useRef(null);

  useEffect(() => {
    const googleMap = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: 15,
    });

    if (markers) {
      const marker = new window.google.maps.Marker({
        position: { lat: markers.lat, lng: markers.lng },
        map: googleMap,
        title: markers.name,
        icon: {
          url: "https://maps.google.com/mapfiles/kml/pal2/icon30.png",
          scaledSize: new window.google.maps.Size(40, 40), // Tamaño personalizado del icono
        },
      });

      markerRef.current = marker;

      if (description) {
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
          <div style="display: flex; flex-direction: column; align-items: center;">
            <p style="margin: 10px 0px;">${description}</p>  
            <img src="${image}" alt="Image" style="width: 100%; height: 100%; object-fit: cover;">
            
          </div>`,        
        });

        infoWindowRef.current = infoWindow;

        infoWindow.open(googleMap, marker);

        googleMap.addListener("click", () => {
          infoWindow.close();
        });
      }
    }
  }, [center, markers, description]);

  return (
    <div
      ref={mapRef}
      style={{ width: "100%", height: "400px" }}
      className={className}
    ></div>
  );
}

Map.defaultProps = {
  className: "",
};

export default Map;
