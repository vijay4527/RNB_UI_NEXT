import React, { useEffect, useState } from "react";
import { getCookie } from "@/cookieUtils";
import AppConfig from "../../../AppConfig";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  LoadScript,
} from "@react-google-maps/api";
import Head from "next/head";
import { Container } from "react-bootstrap";
import { axiosGet, axiosPost, axiosGetAll } from "@/api";
const index = () => {
  const [shops, setShops] = useState([]); // Retailer data from API
  const [selectedRetailer, setSelectedRetailer] = useState(null); // Selected retailer for InfoWindow
  const city = getCookie("userCity");
  console.log(city);
  const fetchRetailersCurrent = () => {
    console.log("location");

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const requestData = {
            term: "",
            lat: latitude.toString(),
            lng: longitude.toString(),
          };
          console.log("location:", requestData);

          fetchRetailers(requestData);
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };
  // Replace this function with your API call to get retailer data based on search term
  const fetchRetailersBySearchTerm = async (searchTerm, type) => {
    // const requestData = {
    //   term: searchTerm,
    //   lat: null,
    //   lng: null,
    // };
    const apiRequestData = {
      city_name: city,
      param: searchTerm,
    };
    fetchRetailers(apiRequestData);
  };
  const fetchRetailers = async (obj) => {
    try {
      const response = await axiosPost("/StoreMaster/GetPickupDetails", obj);
      if (response) {
        setShops(response);
      }

      if (response) {
        if (response) {
          setShops(response);
        } else {
          setShops([]);
        }
      } else {
        console.error("Failed to fetch data.");
        setShops([]);
      }
    } catch (error) {
      console.error("Error fetching retailers:", error);
      setShops([]);
    }
  };
  // Function to handle marker click and display InfoWindow
  const handleMarkerClick = (retailer) => {
    setSelectedRetailer(retailer);
  };

  // Function to handle retailer card click and display marker on map
  const handleRetailerClick = (retailer) => {
    setSelectedRetailer(retailer);
    setCenter({
      lat: parseFloat(retailer.latitude),
      lng: parseFloat(retailer.longitude),
    });
  };

  // Initialize the Google Maps API with your API key
  const mapContainerStyle = {
    width: "100%",
    height: "100%",
  };

  const [center, setCenter] = useState({
    lat: 19.07418395664833,
    lng: 72.87470778373391,
  });

  const options = {
    disableDefaultUI: true,
    zoomControl: true,
  };
  useEffect(() => {
    fetchRetailersBySearchTerm("");
  }, []);
  return (
    <>
      <Head>
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBpti7QuC_QXwWE90MT0RkfMPlET1KbhS4&libraries=places`}
        ></script>
      </Head>
      {/* <button onClick={fetchRetailersCurrent}> get cuurrent location</button> */}
      <div className="Map_wrapper">
        <Container>
          <div className="commonTitle">
            <h2>Find US</h2>
            {/* <p>You contribute over half of your life operating. Let us help you find the right fit for you or your corporation.</p> */}
          </div>
          <div className="Map_Body">
            <div className="Map_Info">
              {/* Add your input field for search */}
              <div className="search_input_arrow">
                <div className="search_input">
                  <i className="fa fa-map-marker" aria-hidden="true"></i>
                  <input
                    type="text"
                    placeholder="Search for retailers"
                    onChange={(e) => fetchRetailersBySearchTerm(e.target.value)}
                  />
                </div>
                <button
                  className="search_input_Live"
                  onClick={fetchRetailersCurrent}
                >
                  <i className="fa fa-location-arrow" aria-hidden="true"></i>
                </button>
              </div>

              <div className="retailer-cards">
                {shops.map((retailer) => (
                  <div
                    className="retailer-card"
                    key={retailer.store_id}
                    onClick={() => handleRetailerClick(retailer)}
                  >
                    <div className="retailer-name">
                      <i className="fa fa-map-pin" aria-hidden="true"></i>
                    </div>
                    <div className="retailer-info">
                      <h2>{retailer.company_name}</h2>
                      <p>Address: {retailer.address}</p>
                      <p>Contact No: {retailer.contact_no}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="Map_Direction">
              {/* Render Google Maps */}
              <div className="Map_container">
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  zoom={15}
                  center={center}
                  options={options}
                >
                  {shops.map((retailer) => (
                    <Marker
                      key={retailer.id}
                      icon={{
                        url: `${AppConfig.cdn}icons/dealer.png`,
                        "https://fama.b-cdn.net/Yuri/icons/home.png": null,
                        anchor: new google.maps.Point(17, 46),
                        scaledSize: new google.maps.Size(37, 37),
                      }}
                      position={{
                        lat: parseFloat(retailer.latitude),
                        lng: parseFloat(retailer.longitude),
                      }}
                      onClick={() => handleMarkerClick(retailer)}
                    >
                      {/* Show InfoWindow for the selected retailer */}
                      {selectedRetailer &&
                        selectedRetailer.id === retailer.id && (
                          <InfoWindow
                            position={{
                              lat: parseFloat(retailer.latitude),
                              lng: parseFloat(retailer.longitude),
                            }}
                            onCloseClick={() => setSelectedRetailer(null)}
                          >
                            <div className="retailer_map_info">
                              <h3>{selectedRetailer.company_name}</h3>
                              <p>
                                Address:{" "}
                                {selectedRetailer.address +
                                  " , " +
                                  selectedRetailer.pin_code}
                              </p>
                            </div>
                          </InfoWindow>
                        )}
                    </Marker>
                  ))}
                </GoogleMap>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default index;
