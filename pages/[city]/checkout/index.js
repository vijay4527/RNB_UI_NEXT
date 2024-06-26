// pages/checkout.js
import React from "react";
import "./index.module.css";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import styles from "./index.module.css";
import homeStyles from "../.././../styles/Home.module.css";
import { axiosGet, axiosPost, axiosGetAll } from "@/api";
import Head from "next/head";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
import * as yup from "yup";
import AppConfig from "@/AppConfig";
import ServingInfo from "@/component/ServingInfo";
import OrderSummary from "@/component/OrderSummary";
import MapModal from "@/component/googleMapModal";
import { set } from "lodash";

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
  const [selectedOption, setSelectedOption] = useState("delivery");
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
  const [grandTotal, setGrandTotal] = useState(0);
  const [enableAddress, setEnableAddress] = useState(false);
  const [sessionData,setSessionData] = useState({})

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const userObject =
  typeof window !== "undefined"
    ? JSON.parse(sessionStorage.getItem("userData"))
    : "";
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

  useEffect(()=>{
    if(data){
       setSessionData(data)
    }
  },[])
  const router = useRouter();
  const { city } = router.query;
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
    }, [city]);
    
    useEffect(() => {
      if (userObject) {
        GetAddress(); // Call to fetch user addresses
      }
    }, [userObject?.user_id]);

  useEffect(() => {
    countSubTotalAmount();
  }, [products]);

  useEffect(() => {
    if (subTotalAmount) {
      setTotalAmount(subTotalAmount + shippingCharges);
    }
  }, [subTotalAmount]);


  const GetAllCart = async () => {
    if (userObject && userObject.user_id && city) {
      var obj = {
        cart_id: cartId ? cartId : "",
        user_id: userObject ? userObject.user_id : "",
        city_name: city,
        type:"AC"
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
      if (userObject.user_id) {
        const addressData = await axiosGet(
          `ShippingAddress/GetShippingAddressByUserId/${userObject.user_id}`
        );
        if (addressData) {
          setUserAddress(addressData);
        }
      }
    } catch (error) {
      console.log("error while fetching the data" + error);
    }
  };

  const validateOrder = () => {
    if (selectedOption === 'delivery') {
      if (!selectedAddress) {
        toast('Please select a shipping address for delivery.',{autoClose : 3000,closeButton: true});
        return false;
      }
    } else if (selectedOption === 'pickup') {
      if (!selectedFranchise) {
        toast('Please select a shop for pickup.',{autoClose : 3000,closeButton: true});
        return false;
      }
    }

    return true;
  };


  const handlePlaceOrder = async () => {
    const isValidOrder = validateOrder();
    if (isValidOrder) {
      await createOrder();
    }
  };

  const createOrder = async () => {
    products.forEach((e) => {
      e.city = city;
    });
    const orderobj = {
      // orderProductRequest: products,
      order_type: selectedOption,
      franchise_id: selectedFranchise ? selectedFranchise : null,
      shipping_address_id: selectedAddress ? selectedAddress : "",
      coupon_code: couponCode ? couponCode : null,
      city: city,
      user_id: userObject.user_id,
      order_status: null,
    };
    const order = await axiosPost("Order/SaveOrder", orderobj);
    if (order.resp == true) {

      toast("Your Order has been placed", {
        autoClose: 3000,
        closeButton: true,
        onClose: () => {
          sessionStorage.removeItem("cartId");
          router.push("/" + city);
        }
      });
    } else {
      console.log("Order not placed");
      toast("Something went wrong! Your Order has not been placed",{autoClose : 3000,closeButton: true})

    }
  };

  const frachiseSelection = (storeid) => {
    setSelectedFranchise(storeid);
  };

  const addressSelection = (shippingId) => {
    console.log("shiiping adress hit");
    setSelectedAddress(shippingId);
    console.log("shipping address is", shippingId);
  };
  const saveShippingAddress = async () => {
    try {
      await validationSchema.validate(formValues, { abortEarly: false });
      var obj = {
        shipping_address_id: "",
        user_id: userObject.user_id,
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
        toast("Your address has been saved",{autoClose : 3000,closeButton: true})
        GetAddress();
        setFormValues({ 
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

  const totalPrice = products.reduce((acc, item) => acc + item.cost, 0);
  const enableAddAddredd = () => {
    setEnableAddress(true);
  };

  const handleClose = () => {
    setFormValues({ 
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
    setEnableAddress(false);
  };

  return (
    <>
      <Head>
        {/* <meta charset="utf-8"></meta>
        <title>Online Cake Delivery in Mumbai, Pune and Mangalore</title>
        <meta
          name="description"
          content="Online Cakes Shop in Mumbai, Pune and Mangalore . Online Cakes Delivery . Buy,Order &amp; Send Birthday, Wedding Anniversary &amp; Chocolate Cakes anywhere in Mumbai from best Cake Shop Ribbons &amp; Balloons."
        ></meta>
        <meta
          name="keywords"
          content="Ribbons and Balloons, Buy Cakes Online, Online Cake delivery, Cakes Mumbai, Cakes to Mumbai, order cakes online, cake delivery in mumbai, Send Cakes to Mumbai, Mumbai Cake Shop, Online Cakes to Mumbai, Cakes Mumbai, Cake delivery to Mumbai, Chocolate Cakes Mumbai, Heart Shape Cakes, Eggless Cakes, Occasion Cakes, birthday cakes online delivery, Send Birthday Cakes, Congratulations Cakes, Missing You Cakes, Baby and Kids Cakes, Anniversary Cakes Online, Thank You Cakes, House Warming Cakes, Wedding Cakes Mumbai, customised cakes in mumbai, cup cakes mumbai, Online Cakes Shop Mumbai, valentine special cakes mumbai, plum cakes mumbai, fresh fruit cakes online"
        ></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        ></meta> */}
        <link
          rel="icon"
          href="https://ribbonsandballoons.com/frontassets/images/fav.png"
          type="image/x-icon"
        />
        {/* <meta
          name="google-site-verification"
          content="hj44_Ud2995b4jkL3My7hTX96_sALd3yQ7tlf0El0IE"
        ></meta>
        <meta
          name="p:domain_verify"
          content="e35c0804c87b42f9187c00fa30ff64f9"
        ></meta>
        <meta
          name="facebook-domain-verification"
          content="1cpqqtudq8imtqkiwxpq0vd20x3b69"
        ></meta> */}
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBpti7QuC_QXwWE90MT0RkfMPlET1KbhS4&libraries=places`}
        ></script>
      </Head>

      <section className={styles.CheckOutQct}>
        <div className={homeStyles["container"]}>
          <div className={styles.checkOutQctWrap}>
            <div className={styles.checkoutQctTitle}>Shipping & Payment</div>
            <div className={styles.checkoutQctBody}>
              <div className={styles.checkoutQctShipping}>
                <div className={styles.checkoutQctShippingMethod}>
                  <div className={styles.checkoutQctShippingHeader}>
                    <h4 className={styles.checkoutQctShippingTitle}>
                      Shipping method
                    </h4>
                    <ul className={styles.checkoutQctShippingTabs}>
                      <li
                        className={
                          selectedOption === "delivery" ? `${styles.active}` : ""
                        }
                        onClick={() => handleOptionChange("delivery")}
                      >
                        <h4>Home Delivery</h4>
                        <p>(Get your product delivered to your home)</p>
                      </li>
                      <li
                        className={
                          selectedOption === "pickup"
                            ? `${styles.active}`
                            : ""
                        }
                        onClick={() => handleOptionChange("pickup")}
                      >
                        <h4>Pick from nearby store</h4>
                        <p>(Collect your order from a store of your choice)</p>
                      </li>
                    </ul>
                    <div className={styles.checkoutQctShippingContents}>
                      <div
                        className={`${styles.checkoutQctShippingContent} ${
                          selectedOption === "delivery" ? `${styles.active}` : ""
                        }`}
                      >
                        <div className={styles.newAddress}>
                          <h4
                            className={`${styles.checkoutQctShippingContentTitle}`}
                            onClick={enableAddAddredd}
                          >
                            Add new address
                          </h4>
                          {enableAddress && (
                            <button
                              className={`${styles.closeButton}`}
                              onClick={handleClose}
                            >
                              Close
                            </button>
                          )}
                        </div>
                        {enableAddress && (
                          <>
                            <div className={styles.checkoutQctShippingForm}>
                              <div className={homeStyles["form_group"]}>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="firstName"
                                  value={formValues.firstName}
                                  onChange={handleInputChange}
                                  placeholder="Enter first name"
                                  required
                                />
                                {errors.firstName && (
                                  <div className="text-danger">
                                    {errors.firstName}
                                  </div>
                                )}
                              </div>
                              <div className={homeStyles["form_group"]}>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="lastName"
                                  value={formValues.lastName}
                                  onChange={handleInputChange}
                                  placeholder="Enter last name"
                                  required
                                />
                                {errors.lastName && (
                                  <div className="text-danger">
                                    {errors.lastName}
                                  </div>
                                )}
                              </div>
                              <div className={homeStyles["form_group"]}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="email"
                                  value={formValues.email}
                                  onChange={handleInputChange}
                                  placeholder="Enter email"
                                />
                                {errors.email && (
                                  <div className="text-danger">
                                    {errors.email}
                                  </div>
                                )}
                              </div>
                              <div className={homeStyles["form_group"]}>
                                <Form.Label>Contact</Form.Label>
                                <Form.Control
                                  type="text"
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
                              <div className={homeStyles["form_group"]}>
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                  type="text"
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
                              <div className={homeStyles["form_group"]}>
                                <Form.Label>Zip Code</Form.Label>
                                <Form.Control
                                  type="text"
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
                              <div className={homeStyles["form_group"]}>
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                  type="text"
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
                              <div className={homeStyles["form_group"]}>
                                <Form.Label>State</Form.Label>
                                <Form.Control
                                  type="text"
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
                              <div className={homeStyles["form_group"]}>
                                <Form.Label>Country</Form.Label>
                                <Form.Control
                                  type="text"
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
                            <div className={styles.checkoutQctShippingAddress}>
                            <button onClick={handleShowModal}>Open Map Modal</button>

                              <button
                                className={`${homeStyles["btn"]} ${homeStyles["btn-primary"]}`}
                                onClick={saveShippingAddress}
                              >
                                <span>ADD ADDRESS</span>
                              </button>
                            </div>
                          </>
                        )}

                        <div>
                          <h4>Select Shipping Address</h4>

                          <div className={styles.pickUpSearchResult}>
                            {userAddress && userAddress.length > 0 ? (
                              userAddress.map((res) => (
                                <label
                                  htmlFor={`Address${res.shipping_address_id}`}
                                  className={`${
                                    styles.pickUpSearchResultItem
                                  } ${
                                    selectedAddress === res.shipping_address_id
                                      ? `${styles.active}`
                                      : ""
                                  }`}
                                  key={res.shipping_address_id}
                                >
                                  <div className={styles.pickUpFranchiseInput}>
                                    <input
                                      id={`Address${res.shipping_address_id}`}
                                      className="form-check-input"
                                      type="radio"
                                      name="address"
                                      checked={
                                        selectedAddress ===
                                        res.shipping_address_id
                                      }
                                      onChange={() => {
                                        addressSelection(
                                          res.shipping_address_id
                                        );
                                      }}
                                    />
                                    <div
                                      className={
                                        styles.pickUpFranchiseInputIcon
                                      }
                                    >
                                      <svg
                                        className={styles.roundedIcon}
                                        focusable="false"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                      >
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
                                      </svg>
                                      <svg
                                        className={styles.solidIcon}
                                        focusable="false"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                      >
                                        <path d="M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"></path>
                                      </svg>
                                    </div>
                                  </div>
                                  <div
                                    className={styles.pickUpFranchiseDetails}
                                  >
                                    <div className={styles.addressInfo}>
                                      <h4>
                                        <p>
                                          {res.first_name} {res.last_name},
                                        </p>

                                        <p>
                                          {res.address},{res.city}-{res.pincode}
                                        </p>
                                        <p>
                                          {res.state}, {res.country}
                                        </p>
                                        <p>Mobile no: {res.mobile_number}</p>
                                      </h4>
                                    </div>
                                  </div>
                                </label>
                              ))
                            ) : (
                              <div>
                                <h5>No Address to Show</h5>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div
                        className={`${styles.checkoutQctShippingContent} ${
                          selectedOption === "pickup"
                            ? `${styles.active}`
                            : ""
                        }`}
                      >
                        <h4 className={styles.checkoutQctShippingContentTitle}>
                          Select your collection store
                        </h4>
                        <p className={styles.pickUpImpNote}>
                          Note: The product exchange feature is not available
                          for this shipping method
                        </p>
                        <div className={styles.pickUpWrap}>
                          <div className={styles.pickUpSearch}>
                            <div className={homeStyles["form_group"]}>
                              <Form.Label>
                                Search by city, locality or mall name
                              </Form.Label>
                              <Form.Control
                                type="text"
                                value={inputValue}
                                onChange={handleFranchiseAddress}
                                placeholder="Enter the city, locality or mall"
                                required
                              />
                            </div>
                          </div>
                          <div className={styles.pickUpSearchResult}>
                            {franchise.length >= 1 ? (
                              franchise.map((res) => (
                                <label
                                  htmlFor={`Franchise${res.store_id}`}
                                  className={`${
                                    styles.pickUpSearchResultItem
                                  } ${
                                    selectedFranchise === res.store_id
                                      ? `${styles.active}`
                                      : ""
                                  }`}
                                  key={res.store_id}
                                >
                                  <div className={styles.pickUpFranchiseInput}>
                                    <input
                                      id={`Franchise${res.store_id}`}
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
                                    <div
                                      className={
                                        styles.pickUpFranchiseInputIcon
                                      }
                                    >
                                      <svg
                                        className={styles.roundedIcon}
                                        focusable="false"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                      >
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
                                      </svg>
                                      <svg
                                        className={styles.solidIcon}
                                        focusable="false"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                      >
                                        <path d="M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"></path>
                                      </svg>
                                    </div>
                                  </div>
                                  <div
                                    className={styles.pickUpFranchiseDetails}
                                  >
                                    <div className={styles.pickUpFranchiseInfo}>
                                      <h4>{res.franchise_name}</h4>
                                      <p
                                        onClick={() =>
                                          loadMap(res.latitude, res.longitude)
                                        }
                                      >
                                        View in Map
                                      </p>
                                    </div>
                                    <div className={styles.pickUpFranchiseInfo}>
                                      <h5>{res.store_address}</h5>
                                    </div>
                                  </div>
                                </label>
                              ))
                            ) : (
                              <div>
                                <h5>No Franchise to Show</h5>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.checkoutQctOrderSummary}>
                {/* <div className={styles.cartPriceBox}>
                <div className={styles.cartOrderSummary}>
                  <h4>Order summary</h4>
                  <ServingInfo/>
                  
                </div>
                  <ul className={styles.cartPriceAmt}>
                    {
                      products && products.length > 0 ? (
                      products.map((ele)=>{
                        <li>
                        <h4>
                          {ele.product_name}
                          <span>{ele.value}</span>
                        </h4>
                        <h5>{ele.cost}</h5>
                      </li>
                      })
                      ): ("")
                    }
                  
                  </ul>
                  <div className={styles.cartPriceTotalAmt}>
                    <h4>Total</h4>
                    <h5>₹1250</h5>
                  </div>
                  <button
                    className={`${homeStyles["btn"]} ${homeStyles["btn-primary"]}`} onClick={createOrder}
                  >
                    <span>PROCEED TO PAYMENT</span>
                  </button>
                </div> */}
                <div className={styles.cartPriceBox}>
                  <div className={styles.cartOrderSummary}>
                    <h4>Order summary</h4>
                    <ServingInfo />
                  </div>
                  {/* <ul className={styles.cartPriceAmt}>
                    {products.map((item) => (
                      <li>
                        <h4>
                          {item.product_name}
                          <span>
                            (
                            {item.product_type == 3 ? (
                              <>{item.value}</>
                            ) : (
                              <>{item.value + " " + item.unit}</>
                            )}
                            )
                          </span>
                        </h4>
                        <h5>₹{item.cost}</h5>
                      </li>
                    ))}
                  </ul>
                  <div className={styles.cartPriceTotalAmt}>
                    <h4>Total</h4>
                    <h5>₹{totalPrice}</h5>
                  </div> */}
                  <OrderSummary data={products} />
                  <button
                    className={`${homeStyles["btn"]} ${homeStyles["btn-primary"]}`}
                    onClick={handlePlaceOrder}
                  >
                    <span>Checkout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />

      {/* <section
        className="h-100 h-custom"
        style={{ backgroundColor: "#eee", color: "#000" }}
      >
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
      </section> */}
            <MapModal show={showModal} handleClose={handleCloseModal} />

    </>
  );
};

export default CheckoutPage;
