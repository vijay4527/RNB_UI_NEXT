import React, { useEffect } from "react";
import Head from "next/head";
import styles from "./index.module.css";
import OrderSummary from "@/component/OrderSummary";
import homeStyles from "../.././../../styles/Home.module.css";
import { useRouter } from "next/router";
import { axiosGet } from "@/api";
import { useState } from "react";
const orderDetail = () => {

 const router = useRouter() 
 const {orderDetail} = router.query
 const [orderInfo ,setOrderInfo] = useState({})
 useEffect(()=>{
  getOrderDetails()
 },[])
  const getOrderDetails = async()=>{
    const  response = await axiosGet("Order/getOrderByOrderId/"+orderDetail)
    if(response){
      setOrderInfo(response)
    }
  }
  
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
            <div className={styles.checkoutQctTitle}>Order Details</div>
            <div className={styles.checkoutQctBody}>
              <div className={styles.checkoutQctShipping}>
                <div className={styles.checkoutQctShippingMethod}>
                  <div className={styles.checkoutQctShippingHeader}>
                    <h4>
                      Order ID
                    </h4>
                    <p>1116136552</p>
                  </div>
                  <div className={styles.orderHistoryWrap}>
                    <div className={styles.cartBoxItems}>
                      <div className={styles.cartBoxItem}>
                        <div className={styles.cartBoxContent} >
                          <div className={styles.cartBoxImg}>
                            <img src="https://fama.b-cdn.net/RnB/Dev/products/20240120085625241.jpeg"/>
                          </div>
                          <div className={styles.cartBoxInfo} >
                            <h4>INFINITE PRALINE CAKE</h4>
                            <h4><span className={styles.cartBoxMsg}>Message on Cake</span>: Testing msg</h4>
                            <h5>
                              <span className={styles.cartBoxPrice}>₹ 345</span>
                            </h5>
                            <h4>
                            Small
                            </h4>
                          </div >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.checkoutQctOrderSummary}>
                
              </div>
            </div>

            
            <div className={styles.cartShippingWrap}>
              <div className={styles.cartShippingDetail}>
                <div className={styles.cartShippingTitleDetail}>Shipping details</div>
                <div className={styles.cartShippingInfo}>
                  <h4 className={styles.cartShippingTitleName}>Abdulla kazi</h4>
                  <p className={styles.cartShippingTitleAddress}>
                    3B-34 taximens colony LBS road kurla west <br></br>
                    MUMBAI <br></br>
                    MAHARASHTRA, 400070 <br></br>
                    India <br></br>
                  </p>
                </div>
                <div className={styles.cartShippingNoDetail}>
                  <h4>Mobile Number</h4>
                  <p>+918907078607</p>
                </div>
              </div>
              <div className={styles.cartShippingPriceDetail}>
                <div className={styles.cartShippingTitleDetail}>Price details of your order</div>
                <div className={styles.cartShippingPriceWrap}>
                  <ul>
                    <li>
                      <h4>Total MRP</h4>
                      <h5>₹4396</h5>
                    </li>
                    <li>
                      <h4>Offer Discount</h4>
                      <h5 className={styles.discountAmt}>- ₹1198.8</h5>
                    </li>
                    <li>
                      <h4>Promocode Discount</h4>
                      <h5 className={styles.discountAmt}>- ₹799.3</h5>
                    </li>
                    <li>
                      <h4>Total MRP</h4>
                      <h5 className={styles.discountAmt}>₹4396</h5>
                    </li>
                  </ul>
                  <div className={styles.cartShippingPriceAmt}>
                    <h4>Total Amount</h4>
                    <h5>₹2397.9</h5>
                  </div>
                  
                  <div className={styles.cartShippingPricePaymentAmt}>
                    <h4>Payment method:</h4>
                    <h5>Cash On Delivery</h5>
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

export default orderDetail;
