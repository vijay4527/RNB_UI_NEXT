import React, { useState } from "react";
import Link from "next/link";
import styles from "./index.module.css";
import { getCookie } from "@/cookieUtils";
import { axiosPost, axiosGet, axiosGetAll } from "@/api";
const MyOrder = () => {
  const city = getCookie("userCity");
  const [orders, setOrders] = useState();
  const user = sessionStorage.getItem(userData);
  // const orders = [
  //   {
  //     orderNumber: "12345",
  //     orderDate: "2023-10-15",
  //     productName: "Product A",
  //     quantity: 2,
  //     price: "$50.00",
  //     status: "Shipped",
  //     image: "https://fama.b-cdn.net/RnB/Dev/products/20231025131806554.jpeg",
  //   },
  //   {
  //     orderNumber: "54321",
  //     orderDate: "2023-10-10",
  //     productName: "Product B",
  //     quantity: 1,
  //     price: "$30.00",
  //     status: "Delivered",
  //     image: "https://fama.b-cdn.net/RnB/Dev/products/20231025131031495.jpeg",
  //   },
  // ];

  const orderData = async(() => {
    const data = await(`Order/GetOrderByUserId/${user.user_id}`);
    if (data) {
      setOrders(data);
    }
  });

  return (
    <div className={styles.pdp_WrapContent}>
      <div className={styles.common_header}>
        <div className={styles.container_fluid}>
          <div className={styles.content_heading}>
            <div className={styles.content_title_heading}>
              <span className={styles.back_to_shop}>READY REGULARS</span>
              <h1 className={styles.text_title_heading}>
                {/* {data ? data.category_name : ""} */}
                Your Orders
              </h1>
            </div>
            <div className={styles.breadcrumb}>
              <div className={styles.breadcrumb}></div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {orders.map((order, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card custom-card">
              <img
                src={order.image}
                className="card-img-top custom-image"
                alt={order.productName}
                style={{ height: "300px" }}
              />
              <div className="card-body">
                <h5 className="card-title">
                  Order Number: {order.orderNumber}
                </h5>
                <div className="d-flex justify-content-between">
                  <span className="card-text">
                    Order Date: {order.orderDate}
                  </span>
                  <span className="card-text">
                    Product Name: {order.productName}
                  </span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="card-text">Quantity: {order.quantity}</span>
                  <span className="card-text">Price: {order.price}</span>
                </div>

                <p className="card-text">Status: {order.status}</p>
                <Link href={`${city}/p/${order.productName}`}>
                  <span className="btn btn-primary">buy again</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrder;
