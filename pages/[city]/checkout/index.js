// pages/checkout.js
import React from "react";
import "./index.module.css";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { getCookie } from "@/cookieUtils";
import Link from "next/link";
import { axiosGet, axiosPost, axiosGetAll } from "@/api";
import Head from "next/head";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  LoadScript,
} from "@react-google-maps/api";
import { useRouter } from "next/router";
import * as yup from "yup";
import AppConfig from "@/AppConfig";
const validationSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  contact: yup
    .string()
    .matches(/^[0-9]{10}$/, "Invalid Contact format (10 digits required)")
    .required("This field is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  pinCode: yup.string().required("Pin code is required"),
  country: yup.string().required("Country is required"),
});

const CheckoutPage = () => {
  const { data, status } = useSession();
  const [products, setProducts] = useState([]);
  const [subTotalAmount, setSubTotalAmount] = useState(0);
  const [shippingCharges, setShippingCharges] = useState(20);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedOption, setSelectedOption] = useState("pickup");
  const [inputValue, setInputValue] = useState("");
  const [franchise, setFranchise] = useState([]);
  const [selectedFranchise, setSelectedFranchise] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [userAddress, setUserAddress] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [user, setUser] = useState({});
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
  });
  // const city = getCookie("userCity");
  const router = useRouter();
  const { city } = router.query;
  let userCity = "";
  useEffect(() => {
    const fetchUser = async () => {
      const userObject =
        typeof window !== "undefined"
          ? JSON.parse(sessionStorage.getItem("userData"))
          : "";
      if (userObject) {
        setUser(userObject);
      }
    };

    fetchUser();
  }, []);

  const cartId =
    typeof window !== "undefined" ? sessionStorage.getItem("cartId") : "";

  useEffect(() => {
    GetAllCart();
  }, [user, city]);

  useEffect(() => {
    countSubTotalAmount();
  }, [products]);

  useEffect(() => {
    if (subTotalAmount) {
      setTotalAmount(subTotalAmount + shippingCharges);
    }
  }, [subTotalAmount]);

  useEffect(() => {
    GetAddress();
  }, []);
  const GetAllCart = async () => {
    if (user.user_id && city) {
      var obj = {
        cart_id: cartId ? cartId : "",
        user_id: user ? user.user_id : "",
        city_name: city,
      };
      const response = await axiosPost("/CartMaster/GetCartDetails", obj);
      if (response) {
        setProducts(response);
      }
    }
  };

  const countSubTotalAmount = () => {
    var price = 0;
    products.map((e) => {
      price += e.cost;
    });
    setSubTotalAmount(price);
  };

  const handleFranchiseAddress = async (e) => {
    const inputValue = e.target.value;
    setInputValue(inputValue);
    const inputWords = inputValue.trim().split(/\s+/);
    if (inputWords.length > 0) {
      const lastWord = inputWords[inputWords.length - 1];
      if (lastWord) {
        const apiRequestData = {
          city_name: city,
          param: lastWord,
        };
        const stores = await axiosPost(
          "/StoreMaster/GetPickupDetails",
          apiRequestData
        );
        if (stores) {
          setFranchise(stores);
        }
      } else {
        setFranchise([]);
      }
    } else {
      setSelectedFranchise("");
    }
  };
  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const loadMap = (lat, long) => {
    const url = `https://www.google.com/maps?q=${lat},${long}`;
    window.open(url, "_blank");
  };

  const GetAddress = async () => {
    try {
      if (user.user_id) {
        const addressData = await axiosGet(
          `ShippingAddress/GetShippingAddressByUserId/${user.user_id}`
        );
        if (addressData) {
          setUserAddress(addressData);
        }
      }
    } catch (error) {
      console.log("error while fetching the data" + error);
    }
  };
  const createOrder = async () => {
    products.forEach((e) => {
      e.city = city;
    });
    const orderobj = {
      orderProductRequest: products,
      order_type: selectedOption,
      franchise_id: selectedFranchise ? selectedFranchise : null,
      shipping_address_id: selectedAddress ? selectedAddress : "",
      coupon_code: couponCode ? couponCode : null,
      city: city,
      user_id: user.user_id,
      order_status: null,
    };
    const order = await axiosPost("Order/SaveOrder", orderobj);
    if (order.resp == true) {
      console.log("Order SuccessFull");
    } else {
      console.log("Order not placed");
    }
  };

  const frachiseSelection = (storeid) => {
    setSelectedFranchise(storeid);
  };

  const saveShippingAddress = async () => {
    try {
      await validationSchema.validate(formValues, { abortEarly: false });
      var obj = {
        shipping_address_id: "",
        user_id: user.user_id,
        first_name: formValues.firstName,
        last_name: formValues.lastName,
        email_address: formValues.email,
        mobile_number: formValues.contact,
        address: formValues.address,
        city: formValues.city,
        state: formValues.state,
        pincode: formValues.pinCode,
        country: formValues.country,
      };
      const data = await axiosPost("ShippingAddress/SaveShippingAddress", obj);
      if (data.resp == true) {
        GetAddress();
      }
    } catch (validationError) {
      if (validationError instanceof yup.ValidationError) {
        const newErrors = {};
        validationError.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      } else {
        console.error(validationError);
      }
    }
  };

  const [errors, setErrors] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    if (value.trim() !== "") {
      setErrors({ ...errors, [name]: "" });
    }
  };
  return (
    <>
      <Head>
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBpti7QuC_QXwWE90MT0RkfMPlET1KbhS4&libraries=places`}
        ></script>
      </Head>
      <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
        <div className="container-fluid py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card">
                <div className="card-body p-4">
                  <div className="row">
                    <div className="col-lg-6">
                      <h5 className="mb-3">
                        <i className="fas fa-long-arrow-alt-left me-2"></i>
                        Shipping Details{" "}
                      </h5>
                      <hr />
                      <span>Select Order Type</span>
                      <div className="d-flex">
                        <div className="form-check form-check-inline ">
                          <input
                            className="form-check-input"
                            type="radio"
                            value="pickup"
                            checked={selectedOption === "pickup"}
                            onChange={() => handleOptionChange("pickup")}
                          />
                          <label className="form-check-label">Pickup</label>
                        </div>

                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            value="delivery"
                            checked={selectedOption === "delivery"}
                            onChange={() => handleOptionChange("delivery")}
                          />
                          <label className="form-check-label">Delivery</label>
                        </div>
                      </div>

                      {selectedOption === "pickup" && (
                        <div className="mt-4">
                          <p>Pickup details go here.</p>
                          <div className="row p-4">
                            <div className="col-lg-6">
                              <label>Select Franchise</label>
                              {franchise.length >= 1 ? (
                                franchise.map((res) => (
                                  <div className="" key={res.store_id}>
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      value="pickup"
                                      checked={
                                        selectedFranchise === res.store_id
                                      }
                                      onChange={() => {
                                        frachiseSelection(res.store_id);
                                      }}
                                    />
                                    <h6>{res.franchise_name}</h6>
                                    <span>{res.store_address}</span>
                                    <button
                                      className="btn btn-sm btn-primary ml-4"
                                      onClick={() =>
                                        loadMap(res.latitude, res.longitude)
                                      }
                                    >
                                      View in Map
                                    </button>
                                  </div>
                                ))
                              ) : (
                                <div>
                                  <h5>No Franchise to Show</h5>
                                </div>
                              )}
                            </div>

                            <div className="col-lg-6 col-md-6 ">
                              <label>Search Address</label>
                              <input
                                className="form-control"
                                type="text"
                                placeholder="Type here"
                                value={inputValue}
                                onChange={handleFranchiseAddress}
                                required
                              />
                            </div>
                          </div>
                        </div>
                      )}
                      {selectedOption === "delivery" && (
                        <div className="mt-4">
                          <h4 style={{ margin: "10px 0px 0px 20px" }}>
                            Add New Shipping Address
                          </h4>
                          <hr />
                          <div className="p-4">
                            {" "}
                            <div className="row">
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <label className="form-label">
                                    First Name
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="firstName"
                                    value={formValues.firstName}
                                    onChange={handleInputChange}
                                    required
                                  />
                                  {errors.firstName && (
                                    <div className="text-danger">
                                      {errors.firstName}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="col-lg-6">
                                {" "}
                                <div className="form-group">
                                  <label className="form-label">
                                    Last Name
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="lastName"
                                    value={formValues.lastName}
                                    onChange={handleInputChange}
                                    required
                                  />
                                  {errors.lastName && (
                                    <div className="text-danger">
                                      {errors.firstName}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <label className="form-label">Email</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    value={formValues.email}
                                    onChange={handleInputChange}
                                  />
                                  {errors.email && (
                                    <div className="text-danger">
                                      {errors.email}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <label className="form-label">Contact</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="+91"
                                    name="contact"
                                    value={formValues.contact}
                                    onChange={handleInputChange}
                                    required
                                  />
                                  {errors.contact && (
                                    <div className="text-danger">
                                      {errors.contact}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="form-group">
                                  <label className="form-label">Address</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="address"
                                    value={formValues.address}
                                    onChange={handleInputChange}
                                    required
                                  />
                                  {errors.address && (
                                    <div className="text-danger">
                                      {errors.address}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <label className="form-label">Zip Code</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="pinCode"
                                    value={formValues.pinCode}
                                    onChange={handleInputChange}
                                    required
                                  />
                                  {errors.pinCode && (
                                    <div className="text-danger">
                                      {errors.pinCode}
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="col-lg-6">
                                <div className="form-group">
                                  <label className="form-label">City</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="city"
                                    value={formValues.city}
                                    onChange={handleInputChange}
                                    required
                                  />
                                  {errors.city && (
                                    <div className="text-danger">
                                      {errors.city}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <label className="form-label">State</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="state"
                                    value={formValues.state}
                                    onChange={handleInputChange}
                                    required
                                  />
                                  {errors.state && (
                                    <div className="text-danger">
                                      {errors.state}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <label className="form-label">Country</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="country"
                                    value={formValues.country}
                                    onChange={handleInputChange}
                                    required
                                  />
                                  {errors.country && (
                                    <div className="text-danger">
                                      {errors.country}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={saveShippingAddress}
                            >
                              Submit
                            </button>
                          </div>
                          <div className="p-4">
                            <p>HI, {user ? user.first_name : ""} 😎</p>
                            Select Your Shipping Address
                            <div className="m-4">
                              {userAddress.length > 0 ? (
                                userAddress.map((address) => {
                                  const Address = address.address;
                                  const City = address.city;
                                  const State = address.state;
                                  const zipCode = address.pincode;
                                  const userCountry = address.country;
                                  const fullAddress = `${address.mobile_number},${address.first_name} ${address.last_name},${address.address}, ${address.city}, ${address.state}, ${address.pincode}, ${address.country}`;

                                  return (
                                    <div
                                      className="d-flex mt-4"
                                      key={address.shipping_address_id}
                                    >
                                      <input
                                        type="radio"
                                        className=""
                                        name="address"
                                        onChange={() =>
                                          setSelectedAddress(
                                            address.shipping_address_id
                                          )
                                        }
                                      />
                                      <div>
                                        <span>{Address}</span>,
                                        <span>
                                          {City},{zipCode},
                                        </span>
                                        <span>
                                          {State},{userCountry}
                                        </span>
                                      </div>
                                    </div>
                                  );
                                })
                              ) : (
                                <p>No shipping addresses available.</p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="col-lg-6">
                      <h5 className="mb-3">
                        <Link href={`/${city}`} className="text-body">
                          <i className="fas fa-long-arrow-alt-left me-2"></i>
                          Continue shopping
                        </Link>
                      </h5>
                      <hr />

                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                          <p className="mb-1">Shopping cart</p>
                          <p className="mb-0">
                            You have {products.length} items in your cart
                          </p>
                        </div>
                      </div>

                      {products.length > 0 ? (
                        products.map((product) => (
                          <div className="card mb-3">
                            <div className="card-body">
                              <div className="d-flex justify-content-between">
                                <div className="d-flex flex-row align-items-center">
                                  <div>
                                    <img
                                      src={
                                        AppConfig.cdn +
                                        "products/" +
                                        product.image.split(",")[0]
                                      }
                                      className="img-fluid rounded-3"
                                      alt="Shopping item"
                                      style={{ width: "65px" }}
                                    />
                                  </div>
                                  <div className="m-3">
                                    <h5>{product.product_name}</h5>
                                    <p className="small mb-0">
                                      {product.description}
                                    </p>
                                  </div>
                                </div>
                                <div className="d-flex flex-row align-items-center">
                                  <div style={{ width: "50px" }}>
                                    <h5 className="fw-normal mb-0">
                                      {product.quantity}
                                    </h5>
                                  </div>
                                  <div style={{ width: "100px" }}>
                                    <h5 className="mb-0">
                                      ₹ {product.cost.toFixed(2)}
                                    </h5>
                                  </div>
                                  <a href="#!" style={{ color: "#cecece" }}>
                                    <i className="fas fa-trash-alt"></i>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div>
                          <span>No Products has been selected</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card">
                <div className="card-body p-4">
                  <div className="row">
                    <div className="col-lg-5">
                      <div className="card bg-primary text-white rounded-3">
                        <div className="card-body">
                          <p className="small mb-2">Card type</p>
                          <a href="#!" type="submit" className="text-white">
                            <i className="fab fa-cc-mastercard fa-2x me-2"></i>
                          </a>
                          <a href="#!" type="submit" className="text-white">
                            <i className="fab fa-cc-visa fa-2x me-2"></i>
                          </a>
                          <a href="#!" type="submit" className="text-white">
                            <i className="fab fa-cc-amex fa-2x me-2"></i>
                          </a>
                          <a href="#!" type="submit" className="text-white">
                            <i className="fab fa-cc-paypal fa-2x"></i>
                          </a>

                          <form className="mt-4">
                            <div className="form-outline form-white mb-4">
                              <input
                                type="text"
                                id="typeName"
                                className="form-control form-control-lg"
                                size="17"
                                placeholder="Enter Coupon Code "
                                onChange={(e) => setCouponCode(e.target.value)}
                              />
                              <label className="form-label" htmlFor="typeName">
                                Coupon Code
                              </label>
                            </div>
                            <div className="form-outline form-white mb-4">
                              <input
                                type="text"
                                id="typeName"
                                className="form-control form-control-lg"
                                size="17"
                                placeholder="Cardholder's Name"
                              />
                              <label className="form-label" htmlFor="typeName">
                                Cardholder's Name
                              </label>
                            </div>

                            <div className="form-outline form-white mb-4">
                              <input
                                type="text"
                                id="typeText"
                                className="form-control form-control-lg"
                                size="17"
                                placeholder="1234 5678 9012 3457"
                                minLength="19"
                                maxLength="19"
                              />
                              <label className="form-label" htmlFor="typeText">
                                Card Number
                              </label>
                            </div>

                            <div className="row mb-4">
                              <div className="col-md-6">
                                <div className="form-outline form-white">
                                  <input
                                    type="text"
                                    id="typeExp"
                                    className="form-control form-control-lg"
                                    placeholder="MM/YYYY"
                                    size="7"
                                    minLength="7"
                                    maxLength="7"
                                  />
                                  <label
                                    className="form-label"
                                    htmlFor="typeExp"
                                  >
                                    Expiration
                                  </label>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-outline form-white">
                                  <input
                                    type="password"
                                    id="typeCvv"
                                    className="form-control form-control-lg"
                                    placeholder="&#9679;&#9679;&#9679;"
                                    size="1"
                                    minLength="3"
                                    maxLength="3"
                                  />
                                  <label
                                    className="form-label"
                                    htmlFor="typeCvv"
                                  >
                                    CVV
                                  </label>
                                </div>
                              </div>
                            </div>
                          </form>

                          <hr className="my-4" />

                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Subtotal</p>
                            <p className="mb-2">
                              ₹ {subTotalAmount.toFixed(2)}
                            </p>
                          </div>
                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Shipping</p>
                            <p className="mb-2">
                              ₹ {shippingCharges.toFixed(2)}
                            </p>
                          </div>
                          <div className="d-flex justify-content-between mb-4">
                            <p className="mb-2">Total (Incl. taxes)</p>
                            <p className="mb-2">₹ {totalAmount.toFixed(2)}</p>
                          </div>

                          <button
                            type="button"
                            className="btn btn-info btn-block btn-lg"
                            onClick={createOrder}
                          >
                            <div className="d-flex justify-content-between">
                              <span>₹ {totalAmount}</span>
                              <span>
                                Pay{" "}
                                <i className="fas fa-long-arrow-alt-right ms-2"></i>
                              </span>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CheckoutPage;
