import React from "react";
import styles from "../pages/[city]/p/productbyname.module.css";
import { useState, useEffect } from "react";
import useSharedStore from "./calculatedPrice";
import { getCookie } from "@/cookieUtils";
import { useRouter } from "next/router";
import axios from "axios";
const addToCartButton = ({ data }) => {
  const { Variable, Variety, Unit, Value, Message } = useSharedStore();
  const placeholder = "Enter message on cake";
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      if (index < placeholder.length) {
        setText((prevText) => prevText + placeholder[index]);
        setIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setText("");
          setIndex(0);
        }, 1000);
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [index]);

  const [isLoading, setLoading] = useState(false);

  const handleClick = () => {
    if (!isLoading) {
      setLoading(true);
      setTimeout(() => setLoading(false), 3700);
    }
  };
  const cartId =
    typeof window !== "undefined" ? sessionStorage.getItem("cartId") : "";
  const { city } = router.query;
  const apiurl = process.env.API_URL;
  const handleAddToCartOrWishlist = () => {
    const cartItem = {
      user_id: "",
      cart_id: cartId ? cartId : "",
      product_id: data.product_id,
      variety_id: Variety,
      city: city,
      unit: Unit,
      value: Value.toString(),
      msg_cake: Message,
    };

    axios
      .post(`${apiurl}/CartMaster/SaveCartDetails`, cartItem)
      .then((response) => {
        if (response.data.resp === true) {
          try {
            if (!cartId) {
              // console.log("Cart");
              sessionStorage.setItem("cartId", response.data.respObj.cart_id);
            }
            // console.log("Success");
            // toastr.options = {
            //   positionClass: "toast-top-right",
            //   timeOut: 3000,
            //   closeButton: true,
            // };
            // toastr.success("Product added to cart successfully :");
          } catch (error) {
            console.error("Error storing cartId in session storage:", error);
          }
        }
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
      });
  };
  return (
    <div className={styles.pdp_ProductContentButton}>
      <h4 className={styles.pdp_ProductContentPrice}>₹ {Variable}</h4>
      <div>
        <button
          className={
            isLoading
              ? `${styles.button} ${styles.loading}`
              : `${styles.button}`
          }
          onClick={handleClick}
        >
          <span onClick={handleAddToCartOrWishlist}>Add to cart</span>
          <div className={styles.cart}>
            <svg viewBox="0 0 36 26">
              <polyline points="1 2.5 6 2.5 10 18.5 25.5 18.5 28.5 7.5 7.5 7.5"></polyline>
              <polyline points="15 13.5 17 15.5 22 10.5"></polyline>
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default addToCartButton;
