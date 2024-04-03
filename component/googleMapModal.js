import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import GoogleMapReact from "google-map-react";

const MapModal = ({ show, handleClose }) => {
  const defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };

  const [map, setMap] = useState(null);
  const [maps, setMaps] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  const handleApiLoaded = (map, maps) => {
    setMap(map);
    setMaps(maps);
  };

  const handleSearch = () => {
    if (map && maps) {
      const placesService = new maps.places.PlacesService(map);
      placesService.textSearch(
        {
          query: searchInput,
        },
        (results, status) => {
          if (status === maps.places.PlacesServiceStatus.OK) {
            const firstResult = results[0];
            if (firstResult) {
              map.setCenter(firstResult.geometry.location);
              map.setZoom(14);
            }
          } else {
            console.error("Search failed:", status);
          }
        }
      );
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Google Map Modal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search for a location"
        />
        <button onClick={handleSearch}>Search</button>
        <div style={{ height: "400px", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyBpti7QuC_QXwWE90MT0RkfMPlET1KbhS4",
              libraries: "places",
            }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          ></GoogleMapReact>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MapModal;
