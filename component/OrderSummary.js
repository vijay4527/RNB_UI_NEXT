import React, { useState, useEffect } from 'react';
import styles from "../pages/[city]/cart/cart.module.css";


export default function OrderSummary() {
  return (
    <>
      <div className={styles.cartPriceBox}>
                <h4 className={styles.cartOrderSummary}>Order summary</h4>
                <ul className={styles.cartPriceAmt}>
                  {cart.map((item)=> (
                    <li>
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
                <button className={`${homeStyles["btn"]} ${homeStyles["btn-primary"]}`} onClick={handleProducts}>
                  <span>Checkout</span>
                </button>
              </div>
    </>
  );
}
