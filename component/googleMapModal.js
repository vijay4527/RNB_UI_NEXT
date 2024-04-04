import { useState } from "react";
import Head from "next/head";
import { Modal, Alert } from "react-bootstrap";
import { GoogleMap, LoadScript, StandaloneSearchBox } from "@react-google-maps/api";

export default function Home({ show, handleClose }) {
  const [showMapModal, setShowMapModal] = useState(false);
  const [error, setError] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleShowMapModal = () => setShowMapModal(true);
  const handleCloseMapModal = () => setShowMapModal(false);

  const handlePlaceSelect = (place) => {
    setSelectedLocation({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    });
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Modal
        id="map-modal"
        show={show}
        onHide={handleClose}
        size="lg"
        onShow={handleShowMapModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Map Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex">
            {error && <Alert variant="danger">{error}</Alert>}
            <LoadScript
              googleMapsApiKey="AIzaSyDOFDl9wvVThQaA9T86ggp_jXDoARI7N0s"
              libraries={["places"]}
            >
              <GoogleMap
                center={{ lat: 20.5937, lng: 78.9629 }}
                zoom={5}
                mapContainerStyle={{ width: "100%", height: "400px" }}
              >
                <StandaloneSearchBox
                  onLoad={(ref) => console.log("SearchBox:", ref)}
                  onPlacesChanged={() =>
                    handlePlaceSelect(this.searchBox.getPlaces()[0])
                  }
                >
                  <input
                    type="text"
                    placeholder="Search Box"
                    style={{
                      boxSizing: "border-box",
                      border: "1px solid transparent",
                      width: "240px",
                      height: "32px",
                      padding: "0 12px",
                      borderRadius: "3px",
                      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
                      fontSize: "14px",
                      outline: "none",
                      textOverflow: "ellipses",
                      position: "absolute",
                      left: "50%",
                      marginLeft: "-120px",
                    }}
                  />
                </StandaloneSearchBox>
              </GoogleMap>
            </LoadScript>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
