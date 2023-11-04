import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./cart.module.css";
import { useRouter } from "next/router";
import { getCookie } from "@/cookieUtils";
import LoginModal from "@/component/loginModal";
import { useSession, signIn, signOut } from "next-auth/react";
import { axiosGet, axiosPost, axiosGetAll } from "@/api";
import AppConfig from "@/AppConfig";
const CartPage = () => {
  const { data, status } = useSession();
  const [cart, setCart] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [user, setUser] = useState({});
  // const [selectedProductTotal, setSelectedProductTotal] = useState(0);
  // const [selectedProducts, setSelectedProducts] = useState([]);
  const router = useRouter();
  // const api_url = process.env.API_URL;
  // const city = getCookie("userCity");
  const { city } = router.query;
  const [isCityModalOpen, setCityModalOpen] = useState(false);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  let cartId =
    typeof window !== "undefined" ? sessionStorage.getItem("cartId") : "";
  const userObject =
    typeof window !== "undefined"
      ? JSON.parse(sessionStorage.getItem("userData"))
      : "";
  useEffect(() => {
    var userInfo =
      typeof window !== "undefined"
        ? sessionStorage.getItem("userData")
        : data
        ? data.user
        : "";
    setUser(userInfo);
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
      if (cart.length === 1) {
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
  var isLoggedIn = false;
  if (data || user) {
    isLoggedIn = true;
  }
  const handleProducts = () => {
    if (!isLoggedIn && !user) {
      setCityModalOpen(true);
    } else {
      router.push(`/${city}/checkout`);
    }
  };

  const closeCityModal = () => {
    setCityModalOpen(false);
  };

  return (
    <>
      <div className={styles.plp_WrapContent} id={styles.title}>
        <div className={styles.common_header}>
          <div className={styles.container_fluid}>
            <div className={styles.content_heading}>
              <div className={styles.content_title_heading}>
                <span className={styles.back_to_shop}>
                  {/* {categoryName ? categoryName : ""} */}
                  Cart
                </span>
                {/* <h1 className={styles.text_title_heading}>
                 {categoryName ? categoryName : ""} 
                  Cart
                </h1> */}
              </div>
              <div className={styles.breadcrumb}>
                <div className={styles.breadcrumb}>
                  <a href="/">
                    {/* {categoryName && subcategoryName ? categoryName : ""} */}
                    {/* {subcategoryName ? (
                       <span className={styles.delimiter}>
                      <span>{subcategoryName}</span>
                    ) : (
                      ""
                    )} */}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.container}>
          {cart.length > 0 ? (
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
                className="btn btn-sm btn-primary"
                onClick={handleProducts}
              >
                want to checkout
              </button>
            </>
          ) : (
            <h1>Your Cart is Empty!</h1>
          )}
        </div>
        {!isLoggedIn && (
          <LoginModal
            isOpen={isCityModalOpen}
            onRequestClose={closeCityModal}
            closeLoginModal={closeCityModal}
          />
        )}
      </div>
    </>
  );
};

export default CartPage;
