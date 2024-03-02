import React, { useState, useEffect } from 'react';
import styles from "../pages/[city]/cart/cart.module.css";
import ServingInfo from "@/component/ServingInfo";
import homeStyles from "@/styles/Home.module.css";
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function OrderSummary({cart}) {
  const router = useRouter() 
  const path = router.pathname
  console.log(path)
  const pathSegments = path.replace(/\/+$/, '').split('/');
  console.log("pathsegment",pathSegments)
  const totalPrice = cart.reduce((acc, item) => acc + item.cost, 0);
  return (
    <>
      <div className={styles.cartPriceBox}>
                <h4 className={styles.cartOrderSummary}>Order summary</h4>
                <ul className={styles.cartPriceAmt}>
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
                </div>
                <Link href={`/${router.pathname}`}>
                <button className={`${homeStyles["btn"]} ${homeStyles["btn-primary"]}`} 
                //  onClick={handleProducts}
                >
                  <span>Checkout</span>
                </button>
                </Link>
               
              </div>
    </>
  );
}
