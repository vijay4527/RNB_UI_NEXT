import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./cart.module.css";
import { useRouter } from "next/router";
import { getCookie } from "@/cookieUtils";
// import { useProductStore } from "@/component/CheckoutData";
const CartPage = () => {
  // const { selectedCartProduct, addSelectedProduct, removeSelectedProduct } = useProductStore();

  const [cart, setCart] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [selectedProductTotal, setSelectedProductTotal] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const router = useRouter();
  const api_url = process.env.API_URL;
  const city = getCookie("userCity");
  const userObject =
    typeof window !== "undefined"
      ? JSON.parse(sessionStorage.getItem("userObject"))
      : "";

  const cartId =
    typeof window !== "undefined" ? sessionStorage.getItem("cartId") : "";

  useEffect(() => {
    GetAllCart();
  }, []);

  const GetAllCart = () => {
    var obj = {
      cart_id: cartId ? cartId : "",
      user_id: "",
      city_name: city ? city : "",
    };
    axios.post(`${api_url}/CartMaster/GetCartDetails`, obj).then((res) => {
      setCart(res.data);
    });
  };

  const removeFromCart = (cpId, itemCost) => {
    axios.get(`${api_url}/CartMaster/RemoveCart/${cpId}`).then((response) => {
      var newPrice = grandTotal - itemCost;
      setGrandTotal(newPrice);
      GetAllCart();
      if (cart.length === 1) {
        try {
          sessionStorage.removeItem("cartId");
        } catch (error) {
          console.error("Error removing cartId from session storage:", error);
        }
      }
    });
  };

  useEffect(() => {
    if (cart.length > 0) {
      const total = cart.reduce((accumulator, item) => {
        return accumulator + item.cost;
      }, 0);
      setGrandTotal(total);
    }
  }, [cart]);

  useEffect(() => {
    const selectedTotal = selectedProducts.reduce((accumulator, item) => {
      return accumulator + item.cost;
    }, 0);
    setSelectedProductTotal(selectedTotal);
  }, [selectedProducts]);

  const getCartById = (productname) => {
    router.push(`/${city}/product/${productname}`);
  };

  const handleProducts = () => {
    router.push(`/${city}/checkout`);
  };

  const handleSelectedProductChange = (cpId) => {
    const isSelected = selectedProducts.some(
      (product) => product.cp_id === cpId
    );
    if (isSelected) {
      const updatedSelectedProducts = selectedProducts.filter(
        (product) => product.cp_id !== cpId
      );
      setSelectedProducts(updatedSelectedProducts);
      // removeSelectedProduct(cpId); // Update Zustand store
    } else {
      const selectedProduct = cart.find((item) => item.cp_id === cpId);
      setSelectedProducts([...selectedProducts, selectedProduct]);
      // addSelectedProduct(selectedProduct); // Update Zustand store
    }
  };

  return (
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
            <div>Select Product</div>
          </div>
          {cart.map((item) => (
            <div className={styles.body} key={item.cp_id}>
              <div className={styles.image}>
                <Image src={item.image} height="90" width="65" alt="" />
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
                <button onClick={() => removeFromCart(item.cp_id, item.cost)}>
                  x
                </button>
              </div>
              <input
                type="checkbox"
                onChange={() => handleSelectedProductChange(item.cp_id)}
                checked={selectedProducts.some(
                  (product) => product.cp_id === item.cp_id
                )}
              />
            </div>
          ))}
          <h2>Cart Total: {grandTotal}</h2>
          {selectedProductTotal ? (
            <h2>Selected Products Total: {selectedProductTotal}</h2>
          ) : (
            ""
          )}
          <button className="btn btn-sm btn-primary" onClick={handleProducts}>
            want to checkout
          </button>
        </>
      ) : (
        <h1>Your Cart is Empty!</h1>
      )}
    </div>
  );
};

export default CartPage;
