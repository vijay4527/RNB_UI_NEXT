import React from "react";
import axios from "axios";
import { getCookie } from "@/cookieUtils";
import styles from "./productbyname.module.css";
import AddToCart from "@/component/addToCartButton";
import ProducDetails from "@/component/productDetails";
import https from "https";
import AppConfig from "@/AppConfig";
import { axiosGet, axiosPost, axiosGetAll } from "@/api";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

const productbyname = ({ data }) => {
  let image = data.product_image.split(",");
  return (
    <div className={styles.pdp_WrapContent}>
      <div className={styles.common_header}>
        <div className={styles.container_fluid}>
          <div className={styles.content_heading}>
            <div className={styles.content_title_heading}>
              <span className={styles.back_to_shop}>READY REGULARS</span>
              <h1 className={styles.text_title_heading}>
                {data ? data.category_name : ""}
              </h1>
            </div>
            <div className={styles.breadcrumb}>
              <div className={styles.breadcrumb}>
                <a href="/">
                  {data ? data.category_name : ""}{" "}
                  <span className={styles.delimiter}>
                    {data ? data.sub_category_name : ""}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {data ? (
        <div className={styles.pdp_Wrap}>
          <div className={styles.container}>
            <div className={styles.pdp_DetailBody}>
              <div className={styles.pdp_DetailDesc}>
                {data ? (
                  <h2 className={styles.pdp_ProductName}>
                    {data.product_name}
                  </h2>
                ) : (
                  ""
                )}
                <ul className={styles.pdp_ProductDesc}>
                  <li>
                    <span>Base: </span>Chocolate Sponge.
                  </li>
                  <li>
                    <span>Filling: </span>Layered with white ganache, coconut
                    crunchy & french vanilla custard.
                  </li>
                  <li>
                    <span>Topping: </span>Coated with rich cream mixed with
                    french vanilla custard & Garnished with french vanilla
                    custard glaze and rich dark ganache.
                  </li>
                </ul>
                <div className={styles.pdp_ProductContent}>
                  <h4>
                    Call Us For Instant Help:{" "}
                    <a href="tel:18002096323">18002096323</a>
                  </h4>
                  <p>10:30 AM To 5:30 PM (Mon To Sat)</p>
                </div>

                <AddToCart data={data}></AddToCart>
              </div>
              <div className={styles.pdp_DetailImg}>
                {image ? (
                  <>
                    <div className={styles.pdp_ProductImg}>
                      <img
                        src={AppConfig.cdn + "products/" + image[0]}
                        alt=""
                      />
                    </div>
                    <div className={styles.pdp_ProductImgs}>
                      <ul>
                        {image.slice(1).map((item, index) => (
                          <li
                            key={item}
                            className={index === 0 ? styles.active : ""}
                          >
                            <img
                              src={AppConfig.cdn + "products/" + item}
                              alt=""
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
              <ProducDetails data={data}></ProducDetails>
            </div>
          </div>
        </div>
      ) : (
        <>
          <img src="https://static.vecteezy.com/system/resources/thumbnails/006/549/647/small/404-landing-page-free-vector.jpg" />
          <span>Product not found</span>
        </>
      )}
    </div>
  );
};

export default productbyname;

export async function getServerSideProps(context) {
  const url = context.query.productbyname;
  const productName = url.split("-").join(" ");
  const city = context.query.city;
  console.log("city : " + city);
  const response = await axiosGet(
    `/productMaster/GetProductByName/${city}/${productName}`
  );

  return {
    props: {
      data: response,
    },
  };
}
