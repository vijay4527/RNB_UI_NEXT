import React from "react";
import styles from "../pages/[city]/p/productbyname.module.css";
import { useState, useEffect } from "react";
import useSharedStore from "./calculatedPrice";
import { useRouter } from "next/router";
import axios from "axios";
import { axiosGet, axiosPost, axiosGetAll } from "@/api";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const addToCartButton = ({ data }) => {
  const { Variable, Variety, Unit, Value, Message } = useSharedStore();
  const { session } = useSession();
  const placeholder = "Enter message on cake";
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [user, setUser] = useState({});
  const router = useRouter();

  useEffect(() => {
    const userInfo =
      typeof window !== "undefined"
        ? JSON.parse(sessionStorage.getItem("userData"))
        : "";
    setUser(userInfo);
  }, []);

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
  // const apiurl = process.env.API_URL;
  const handleAddToCartOrWishlist = async () => {
    const cartItem = {
      user_id: user ? user.user_id : "",
      cart_id: cartId ? cartId : "",
      product_id: data.product_id,
      variety_id: Variety,
      city: city,
      unit: Unit,
      value: Value.toString(),
      msg_cake: Message,
    };
    const response = await axiosPost(`/CartMaster/SaveCartDetails`, cartItem);
    if (response.resp == true) {
        try {
          if (!cartId) {
            sessionStorage.setItem("cartId", response.respObj.cart_id);
          }
          router.push({
            pathname: `/${city}/cart`,
          });
        } catch (error) {
          console.error("Error storing cartId in session storage:", error);
        }
    }
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
      <ToastContainer />

    </div>
  );
};

export default addToCartButton;
