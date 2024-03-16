import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./cart.module.css";
import homeStyles from "../.././../styles/Home.module.css";
import { useRouter } from "next/router";
import { getCookie } from "@/cookieUtils";
import LoginModal from "@/component/loginModal";
import { useSession, signIn, signOut } from "next-auth/react";
import { axiosGet, axiosPost, axiosGetAll } from "@/api";
import AppConfig from "@/AppConfig";
import Head from "next/head";
import ServingInfo from "@/component/ServingInfo";
import { apiBaseUrl } from "next-auth/client/_utils";
import OrderSummary from "@/component/OrderSummary";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useUserData from "@/component/verifyEmail";
const CartPage = () => {
  const { data, status } = useSession();
  const [cart, setCart] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [user, setUser] = useState({});
  const router = useRouter();
  const { isLoggedIn, loading } = useUserData();
  const [isUserLoggedIn,setIsUserLoggedIn]= useState(isLoggedIn)
  // const api_url = process.env.API_URL;
  const { city } = router.query;
  const [isCityModalOpen, setCityModalOpen] = useState(false);
  useEffect(() => {
    if (data) {
      setUser(data);
      setCityModalOpen(true);
    }
  }, [data]);

  var userInfo = typeof window !== "undefined"
    ? JSON.parse(sessionStorage.getItem("userData"))
    : "";
  useEffect(()=>{
     if(isUserLoggedIn == true && !userInfo){
      console.log("user is logged in")
          
     }
     else if(userInfo){
      setIsUserLoggedIn(true)
     }
  },[isLoggedIn])
  let cartId =
    typeof window !== "undefined" ? sessionStorage.getItem("cartId") : "";
  const userObject =
    typeof window !== "undefined"
      ? JSON.parse(sessionStorage.getItem("userData"))
      : "";
  useEffect(() => {
    // var userInfo =
    //   typeof window !== "undefined"
    //     ? sessionStorage.getItem("userData")
    //     : sessionStorage.getItem("userData")
    //     ? data.user
    //     : "";
    setUser(userObject);
    if (userObject) {
      GetAllCart();
    }
  }, []);

  useEffect(() => {
    GetAllCart();
  }, [city]);

  const GetAllCart = async () => {
    try {
      if (city) {
        var obj = {
          cart_id: cartId ? cartId : "",
          user_id: userObject ? userObject.user_id : "",
          city_name: city ? city : "",
        };
        const response = await axiosPost("/CartMaster/GetCartDetails", obj);
        if (response) {
          setCart(response);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromCart = async (cpId, itemCost) => {
    const response = await axiosGet(`/CartMaster/RemoveCart/${cpId}`);
    if (response.resp == true) {
      var newPrice = grandTotal - itemCost;
      setGrandTotal(newPrice);
      if (cart.length == 1) {
        try {
          sessionStorage.removeItem("cartId");
          cartId = "";
        } catch (error) {
          console.error("Error removing cartId from session storage:", error);
        }
      }
      GetAllCart();
    }
  };

  useEffect(() => {
    if (cart.length > 0) {
      const total = cart.reduce((accumulator, item) => {
        return accumulator + item.cost;
      }, 0);
      setGrandTotal(total);
    }
  }, [cart]);

  const getCartById = (productname) => {
    router.push(`/${city}/product/${productname}`);
  };
  const [showLoginModal, setShowLoginModal] = useState(false);
  var isUser = false;
  if (data || user) {
    // isLoggedIn = true;
  }
  const handleProducts = () => {
    if (!isLoggedIn && !user) {
      setCityModalOpen(true);
    } else if (cart.length > 0) {
      router.push(`/${city}/checkout`);
    } else {
      toast(
        "you have no products in your cart ! Please select products before checkout",
        { autoClose: 2000, closeButton: true }
      );
    }
  };

  const closeCityModal = () => {
    setCityModalOpen(false);
  };

  const addToFavourite = async (data) => {
    try {
      const favouriteData = await axios.post(
        apiBaseUrl + "addTOFavourite",
        productData
      );
      if (favouriteData.resp == true) {
        toast("Product added to favourites", {
          autoClose: 3000,
          closeButton: true,
        });
      }
    } catch (erro) {
      console.log("error while adding product to favourites", error);
    }
  };
  return (
    <>
      <Head>
        {/* <meta charset="utf-8"></meta>
    <title>Online Cake Delivery in Mumbai, Pune and Mangalore</title>
    <meta name="description" content="Online Cakes Shop in Mumbai, Pune and Mangalore . Online Cakes Delivery . Buy,Order &amp; Send Birthday, Wedding Anniversary &amp; Chocolate Cakes anywhere in Mumbai from best Cake Shop Ribbons &amp; Balloons."></meta>
    <meta name="keywords" content="Ribbons and Balloons, Buy Cakes Online, Online Cake delivery, Cakes Mumbai, Cakes to Mumbai, order cakes online, cake delivery in mumbai, Send Cakes to Mumbai, Mumbai Cake Shop, Online Cakes to Mumbai, Cakes Mumbai, Cake delivery to Mumbai, Chocolate Cakes Mumbai, Heart Shape Cakes, Eggless Cakes, Occasion Cakes, birthday cakes online delivery, Send Birthday Cakes, Congratulations Cakes, Missing You Cakes, Baby and Kids Cakes, Anniversary Cakes Online, Thank You Cakes, House Warming Cakes, Wedding Cakes Mumbai, customised cakes in mumbai, cup cakes mumbai, Online Cakes Shop Mumbai, valentine special cakes mumbai, plum cakes mumbai, fresh fruit cakes online"></meta>
    <meta name="viewport" content="width=device-width, initial-scale=1"></meta> */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        ></meta>
        <link
          rel="icon"
          href="https://ribbonsandballoons.com/frontassets/images/fav.png"
          type="image/x-icon"
        />
        {/* <meta name="google-site-verification" content="hj44_Ud2995b4jkL3My7hTX96_sALd3yQ7tlf0El0IE"></meta>
    <meta name="p:domain_verify" content="e35c0804c87b42f9187c00fa30ff64f9"></meta>
    <meta name="facebook-domain-verification" content="1cpqqtudq8imtqkiwxpq0vd20x3b69"></meta> */}
      </Head>
      <div className={styles.cartMainWrap} id={styles.title}>
        <div className={homeStyles["container_fluid"]}>
          <div>
            <div className={styles.cartHeading}>Your Shopping Cart</div>
            <hr className={styles.cartHrDivider}></hr>
            <div className={styles.cartTotalCount}>{cart.length} Products</div>
            <div className={styles.cartMainBody}>
              <div>
                <div className={styles.cartBoxItems}>
                  {cart.length > 0 ? (
                    <>
                      {cart.map((item) => (
                        <div className={styles.cartBoxItem} key={item.cp_id}>
                          <div className={styles.cartBoxContent}>
                            <div className={styles.cartBoxImg}>
                              <img
                                src={
                                  AppConfig.cdn +
                                  "products/" +
                                  item.image.split(",")[0]
                                }
                                alt={item.product_name}
                              />
                            </div>
                            <div className={styles.cartBoxInfo}>
                              <h4>{item.product_name}</h4>
                              <h4>Message on Cake : {item.msg_cake}</h4>
                              <h5>
                                {/* <span className={styles.cartBoxDiscount}>₹{item.cost * 2}</span> */}
                                <span className={styles.cartBoxPrice}>
                                  ₹{item.cost}
                                </span>
                                {/* <span className={styles.cartBoxSaveAmt}>₹{item.cost * 2} saved</span> */}
                              </h5>
                              <h4>
                                {item.product_type == 3 ? (
                                  <>{item.value}</>
                                ) : (
                                  <>{item.value + " " + item.unit}</>
                                )}
                              </h4>
                              {/* <p>Qty: 1 <span>▼</span></p> */}
                            </div>
                          </div>
                          <div className={styles.cartBoxAction}>
                            <div
                              className={styles.cartBoxButtonAction}
                              onClick={() =>
                                removeFromCart(item.cp_id, item.cost)
                              }
                            >
                              Remove
                            </div>
                            <div
                              className={styles.cartBoxButtonAction}
                              onClick={() => addToFavourite(item)}
                            >
                              Move to favourites
                            </div>
                          </div>
                        </div>
                      ))}
                      {/* <div className={styles.cartBoxChkButton}>
                <button className={`${homeStyles["btn"]} ${homeStyles["btn-primary"]}`} onClick={handleProducts}>
                  <span>Checkout</span>
                </button>
              </div> */}
                    </>
                  ) : (
                    <h1>Your Cart is Empty!</h1>
                  )}
                </div>
              </div>
              <div>
                <div className={styles.cartPriceBox}>
                  <div className={styles.cartOrderSummary}>
                    <h4>Order summary</h4>
                    <ServingInfo />
                  </div>
                  {/* <ul className={styles.cartPriceAmt}>
                  {cart.map((item,index)=> (
                    <li key={index}>
                      <h4>{item.product_name}
                      <span>({item.product_type == 3 ? (
                      <>{item.value}</>
                    ) : (
                      <>{item.value + " " + item.unit}</>
                    )})</span>
                      </h4>
                    <h5>₹{item.cost}</h5></li>
                  ))}
                </ul>
                <div className={styles.cartPriceTotalAmt}>
                  <h4>Total</h4><h5>₹{totalPrice}</h5>
                </div> */}
                  <OrderSummary data={cart} />
                  <button
                    className={`${homeStyles["btn"]} ${homeStyles["btn-primary"]}`}
                    onClick={handleProducts}
                  >
                    <span>Checkout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* {cart.length > 0 ? (
            <>
              <div className={styles.header}>
                <div>Image</div>
                <div>Product</div>
                <div>Price</div>
                <div>Quantity</div>
                <div>Total Price</div>
                <div>Actions</div>
              </div>
              {cart.map((item) => (
                <div className={styles.body} key={item.cp_id}>
                  <div className={styles.image}>
                    <img
                      src={
                        AppConfig.cdn + "products/" + item.image.split(",")[0]
                      }
                      height="90"
                      width="65"
                      alt="No image found"
                    />
                  </div>
                  <p
                    className={styles.productname}
                    onClick={() => getCartById(item.product_name)}
                  >
                    {item.product_name}
                  </p>
                  <p> {item.cost}</p>{" "}
                  <p>
                    {item.product_type == 3 ? (
                      <>{item.value}</>
                    ) : (
                      <>{item.value + " " + item.unit}</>
                    )}
                  </p>
                  <p> {item.cost}</p>
                  <div className={styles.buttons}>
                    <button
                      onClick={() => removeFromCart(item.cp_id, item.cost)}
                    >
                      x
                    </button>
                  </div>
                </div>
              ))}
              <h2>Cart Total: {grandTotal}</h2>
              <button
                className="btn btn-sm btn-secondary"
                onClick={handleProducts}
              >
                want to checkout
              </button>
            </>
          ) : (
            <h1>Your Cart is Empty!</h1>
          )} */}
        </div>
        {!isLoggedIn && (
          <LoginModal
            isOpen={isCityModalOpen}
            onRequestClose={closeCityModal}
            closeLoginModal={closeCityModal}
          />
        )}
        <ToastContainer />
      </div>
    </>
  );
};

export default CartPage;
