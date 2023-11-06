import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./index.module.css";
import { axiosPost, axiosGet, axiosGetAll } from "@/api";
import { useRouter } from "next/router";
const MyOrder = () => {
  const router = useRouter();
  const { city } = router.query;
  const [order, setOrder] = useState([]);
  const [user, setUser] = useState({});
  useEffect(() => {
    const userInfoFromStorage =
      typeof window !== "undefined" ? sessionStorage.getItem("userData") : null;
    if (userInfoFromStorage) {
      const parsedUserInfo = JSON.parse(userInfoFromStorage);
      setUser(parsedUserInfo);
    } else {
      console.log("User data not found in session storage");
    }
  }, []);

  useEffect(() => {
    if (user.user_id) {
      getMyOrders();
    }
  }, [user.user_id]);

  const getMyOrders = async () => {
    try {
      if (user.user_id) {
        const data = await axiosGet(`Order/getOrderByUserId/${user.user_id}`);
        if (data) {
          setOrder(data);
        }
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

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
      <div className="container-fluid p-4">
        <div className="row">
          {order && order.orderProducts ? (
            order.orderProducts.map((product, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card custom-card">
                  <img
                    src={product.image}
                    className="card-img-top custom-image"
                    alt={product.product_name}
                    style={{ height: "300px" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      Order Number: {order.order_id}
                    </h5>
                    <div className="d-flex justify-content-between">
                      <span className="card-text">
                        Order Date: {order.orderDate}
                      </span>
                      <span className="card-text">
                        Product Name: {product.product_name}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="card-text">
                        Quantity: {product.value}
                      </span>
                      <span className="card-text">Price: {product.price}</span>
                    </div>
                    <p className="card-text">Status: {order.order_status}</p>
                    <Link href={`/${city}/p/${product.product_name}`}>
                      <span className="btn btn-primary">buy again</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No order data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
