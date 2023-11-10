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
      <div class="MuiBox-root jss2406">
        <div class="jss8">
          <div class="MuiBox-root jss2408">
            <h6 class="MuiTypography-root jss2390 jss2391 MuiTypography-h6">
              Order History
            </h6>
          </div>
          <hr class="MuiDivider-root" />
          <div class="MuiBox-root jss2409">
            <div class="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-2">
              <div class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12">
                <div class="MuiBox-root jss2410">
                  <div class="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-2">
                    <div class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-2">
                      <div class="MuiBox-root jss2411 jss2404">Filters</div>
                      <div class="MuiBox-root jss2412 jss2404">
                        Type of order
                      </div>
                      <div class="MuiBox-root jss2413 jss2400">
                        <button
                          class="MuiButtonBase-root MuiButton-root MuiButton-text jss2402"
                          tabindex="0"
                          type="button"
                        >
                          <span class="MuiButton-label">Delivery</span>
                        </button>
                        <button
                          class="MuiButtonBase-root MuiButton-root MuiButton-text jss2401"
                          tabindex="0"
                          type="button"
                        >
                          <span class="MuiButton-label"></span>
                        </button>
                      </div>
                      <hr class="MuiDivider-root jss2405" />
                      <div class="MuiBox-root jss2414">
                        <h6 class="MuiTypography-root jss2390 jss2393 MuiTypography-h6">
                          Time Filter
                        </h6>
                        <button
                          class="MuiButtonBase-root MuiButton-root MuiButton-text jss2398 "
                          tabindex="0"
                          type="button"
                        >
                          <span class="MuiButton-label">
                            <h6 class="MuiTypography-root jss2390 jss2392 MuiTypography-h6">
                              Last 1 month
                            </h6>
                          </span>
                        </button>
                        <button
                          class="MuiButtonBase-root MuiButton-root MuiButton-text jss2398 "
                          tabindex="0"
                          type="button"
                        >
                          <span class="MuiButton-label">
                            <h6 class="MuiTypography-root jss2390 jss2392 MuiTypography-h6">
                              Last 3 months
                            </h6>
                          </span>
                        </button>
                        <button
                          class="MuiButtonBase-root MuiButton-root MuiButton-text jss2398 "
                          tabindex="0"
                          type="button"
                        >
                          <span class="MuiButton-label">
                            <h6 class="MuiTypography-root jss2390 jss2392 MuiTypography-h6">
                              Last 6 months
                            </h6>
                          </span>
                        </button>
                        <button
                          class="MuiButtonBase-root MuiButton-root MuiButton-text jss2398 "
                          tabindex="0"
                          type="button"
                        >
                          <span class="MuiButton-label">
                            <h6 class="MuiTypography-root jss2390 jss2392 MuiTypography-h6">
                              Last 12 months
                            </h6>
                          </span>
                        </button>
                        <button
                          class="MuiButtonBase-root MuiButton-root MuiButton-text jss2398 jss2399"
                          tabindex="0"
                          type="button"
                        >
                          <span class="MuiButton-label">
                            <h6 class="MuiTypography-root jss2390 jss2392 MuiTypography-h6">
                              All orders
                            </h6>
                          </span>
                        </button>
                      </div>
                    </div>
                    <div class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-10">
                      <div class="MuiBox-root jss2415">
                        <div class="MuiBox-root jss2416">
                          <h6 class="MuiTypography-root jss2390 jss2393 MuiTypography-h6">
                            All Orders
                          </h6>
                        </div>
                        <div class="MuiBox-root jss2417 jss2395">
                          <div class="MuiBox-root jss2421">
                            {order ? (
                              order.map((product, index) => (
                                <>
                                  <div class="MuiBox-root jss2422 jss2394">
                                    <div class="MuiBox-root jss2448 jss2445">
                                      <div class="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-2">
                                        <div class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-10">
                                          <div class="MuiGrid-root MuiGrid-container">
                                            <div class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-1">
                                              <p class="MuiTypography-root jss2424 jss2427 MuiTypography-body1">
                                                Order ID
                                              </p>
                                            </div>
                                            <div class="MuiGrid-root jss2444 MuiGrid-item MuiGrid-grid-xs-11">
                                              <p class="MuiTypography-root jss2424  MuiTypography-body1">
                                                {product.order_id}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="MuiGrid-root jss2440 MuiGrid-container MuiGrid-spacing-xs-2">
                                        <div class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-2">
                                          <p class="MuiTypography-root jss2424 jss2427 MuiTypography-body1">
                                            COMBO
                                          </p>
                                        </div>
                                        <div class="MuiGrid-root jss2443 MuiGrid-item MuiGrid-grid-xs-10">
                                          <p class="MuiTypography-root jss2424 jss2428 jss2425 MuiTypography-body1">
                                            Buy 2 Get 40 Percent Off
                                          </p>
                                        </div>
                                      </div>
                                      <div class="MuiBox-root jss2449">
                                        <div class="MuiGrid-root jss2439 MuiGrid-container MuiGrid-spacing-xs-2">
                                          <div class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-2">
                                            <div class="MuiBox-root jss2450">
                                              <div class="jss2452 badges">
                                                <div class="MuiBox-root jss2460 jss2451 jss2458  grey ">
                                                  combo
                                                </div>
                                              </div>
                                              <img
                                                src="https://lmsin.net/cdn-cgi/image/h=150,w=150,q=85,fit=cover/https://aaeff43fe32172cbcecc-ae2a4e9a8cbc330ede5588dedf56886e.lmsin.net/lifestyle/1000010256238-White-OffWhite-1000010256238_01-2100.jpg"
                                                alt="product-img"
                                                class="jss2423"
                                              />
                                            </div>
                                          </div>
                                          <div class="MuiGrid-root jss2443 MuiGrid-container MuiGrid-item MuiGrid-direction-xs-column MuiGrid-align-items-xs-flex-start MuiGrid-justify-content-xs-space-between MuiGrid-grid-xs-10">
                                            <div class="MuiBox-root jss2461">
                                              <p class="MuiTypography-root jss2424 jss2425 jss2447 MuiTypography-body1">
                                                MELANGE Women Printed Straight
                                                Kurta
                                              </p>
                                            </div>
                                            <div class="MuiGrid-root jss2441 MuiGrid-container">
                                              <div class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-3">
                                                <div class="MuiBox-root jss2462">
                                                  <button
                                                    class="MuiButtonBase-root MuiIconButton-root jss2436"
                                                    tabindex="0"
                                                    type="button"
                                                    aria-label="positive-order-icon"
                                                  >
                                                    <span class="MuiIconButton-label">
                                                      <span class="jss2433"></span>
                                                    </span>
                                                  </button>
                                                  <p class="MuiTypography-root jss2424  jss2425 MuiTypography-body1">
                                                    {product.order_status}
                                                  </p>
                                                </div>
                                                <div class="MuiBox-root jss2463">
                                                  <p class="MuiTypography-root jss2424 jss2430 jss2427 jss2425 MuiTypography-body1">
                                                    28 Oct 2022
                                                  </p>
                                                </div>
                                                <div className="d-flex justify-content-xc">
                                                  <buttton className="btn btn-primary showDetails">
                                                    Show More
                                                  </buttton>
                                                </div>
                                              </div>{" "}
                                              <div class="MuiGrid-root jss2437 MuiGrid-item MuiGrid-grid-xs-1">
                                                <span></span>
                                              </div>
                                              <div class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-6">
                                                <div class="MuiBox-root jss2464">
                                                  <p class="MuiTypography-root jss2424 jss2427 MuiTypography-body1"></p>
                                                </div>
                                              </div>
                                              <div class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-2">
                                                <button
                                                  class="MuiButtonBase-root MuiIconButton-root jss2438"
                                                  tabindex="0"
                                                  type="button"
                                                  aria-label="right-arrow-icon"
                                                >
                                                  <span class="MuiIconButton-label">
                                                    <span class="jss2431"></span>
                                                  </span>
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              ))
                            ) : (
                              <p>No order data available.</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
