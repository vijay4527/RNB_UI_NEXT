import React from "react";
import Head from "next/head";
import styles from "./index.module.css";
import OrderSummary from "@/component/OrderSummary";
import homeStyles from "../.././../../styles/Home.module.css";

const orderHistory = () => {
  
  return (
    <>
        <Head>
            <script
            src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBpti7QuC_QXwWE90MT0RkfMPlET1KbhS4&libraries=places`}
            ></script>
        </Head>
      
        <section className={styles.CheckOutQct}>
        <div className={homeStyles["container"]}>
          <div className={styles.checkOutQctWrap}>
            <div className={styles.checkoutQctTitle}>Order History</div>
            <div className={styles.orderHistoryWrap}>
              <div className={styles.orderHistoryFilter}>
                <div className={styles.orderHistoryTitle}>Filters</div>
                
                <div className={styles.orderHistoryTitle}>Type of order</div>

              </div>
              <div className={styles.orderHistoryBody}>
                <div className={styles.orderHistoryTitle}>All Orders</div>
                <div className={styles.orderHistoryItems}>
                  <div className={styles.orderHistoryItem}>
                    <div className={styles.orderHistoryNo}>
                      <h4>Order ID</h4>
                      <h5>1116136552</h5>
                    </div>
                    <div className={styles.orderHistoryCard}>
                      <img src="https://fama.b-cdn.net/RnB/Dev/products/20240120085625241.jpeg" />
                      <div className={styles.orderHistoryCardInfo}>
                        <a href="/mumbai/orders/orderDetail">INFINITE PRALINE CAKE</a>
                        <h5>₹ 345(Small)</h5>
                        <h4><span className={styles.cartBoxMsg}>Message on Cake</span>: Testing msg</h4>
                        <div className={styles.orderStatus}>
                          <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#46b275" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                            </svg>
                          </span>
                          <span>Delivered</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.orderHistoryItem}>
                    <div className={styles.orderHistoryNo}>
                      <h4>Order ID</h4>
                      <h5>1116136552</h5>
                    </div>
                    <div className={styles.orderHistoryCard}>
                      <img src="https://fama.b-cdn.net/RnB/Dev/products/20240120085625241.jpeg" />
                      <div className={styles.orderHistoryCardInfo}>
                        <a href="/mumbai/orders/orderDetail">INFINITE PRALINE CAKE</a>
                        <h5>₹ 345(Small)</h5>
                        <div className={styles.orderStatus}>
                          <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#cc0000" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                            </svg>
                          </span>
                          <span>Delivered</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.orderHistoryItem}>
                    <div className={styles.orderHistoryNo}>
                      <h4>Order ID</h4>
                      <h5>1116136552</h5>
                    </div>
                    <div className={styles.orderHistoryCard}>
                      <img src="https://fama.b-cdn.net/RnB/Dev/products/20240120085625241.jpeg" />
                      <div className={styles.orderHistoryCardInfo}>
                        <a href="/mumbai/orders/orderDetail">INFINITE PRALINE CAKE</a>
                        <h5>₹ 345(Small)</h5>
                        <div className={styles.orderStatus}>
                          <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#cc0000" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                            </svg>
                          </span>
                          <span>Delivered</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  
                  <div className={styles.orderHistoryItem}>
                    <div className={styles.orderHistoryNo}>
                      <h4>Order ID</h4>
                      <h5>1116136552</h5>
                    </div>
                    <div className={styles.orderHistoryCard}>
                      <img src="https://fama.b-cdn.net/RnB/Dev/products/20240120085625241.jpeg" />
                      <div className={styles.orderHistoryCardInfo}>
                        <a href="/mumbai/orders/orderDetail">INFINITE PRALINE CAKE</a>
                        <h5>₹ 345(Small)</h5>
                        <div className={styles.orderStatus}>
                          <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#cc0000" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                            </svg>
                          </span>
                          <span>Delivered</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  
                  <div className={styles.orderHistoryItem}>
                    <div className={styles.orderHistoryNo}>
                      <h4>Order ID</h4>
                      <h5>1116136552</h5>
                    </div>
                    <div className={styles.orderHistoryCard}>
                      <img src="https://fama.b-cdn.net/RnB/Dev/products/20240120085625241.jpeg" />
                      <div className={styles.orderHistoryCardInfo}>
                        <a href="/mumbai/orders/orderDetail">INFINITE PRALINE CAKE</a>
                        <h5>₹ 345(Small)</h5>
                        <div className={styles.orderStatus}>
                          <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#cc0000" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                            </svg>
                          </span>
                          <span>Delivered</span>
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

export default orderHistory;
