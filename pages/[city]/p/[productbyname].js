import React from "react";
import axios from "axios";
import { getCookie } from "@/cookieUtils";
import styles from "./productbyname.module.css";
import AddToCart from "@/component/addToCartButton";
import ProducDetails from "@/component/productDetails";
import https from "https";
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});
const productbyname = ({ data }) => {
  //  console.log("data : " + data);
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
                {/* <div className={styles.pdp_ProductContentButton}>
                <h4 className={styles.pdp_ProductContentPrice}>₹ 450</h4> */}
                <AddToCart data={data}></AddToCart>
                {/* </div> */}
              </div>
              <div className={styles.pdp_DetailImg}>
                <div className={styles.pdp_ProductImg}>
                  <img src="https://fama.b-cdn.net/RnB/Cake.png" alt="" />
                </div>
                <div className={styles.pdp_ProductImgs}>
                  <ul>
                    <li className={styles.active}>
                      <img src="https://fama.b-cdn.net/RnB/Cake.png" alt="" />
                    </li>
                    <li>
                      <img src="https://fama.b-cdn.net/RnB/Cake.png" alt="" />
                    </li>
                    <li>
                      <img src="https://fama.b-cdn.net/RnB/Cake.png" alt="" />
                    </li>
                  </ul>
                </div>
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
  // console.log("Product Name is : " + productName);
  // const city = getCookie("userCity");
  const city = context.query.city;
  // console.log("City of : " + city);
  const apiurl = process.env.API_URL;
  const response = await axios.get(
    `${apiurl}/productMaster/GetProductByName/${city}/${productName}`
  );
  // console.log("response of product : " + JSON.stringify(response.data));
  return {
    props: {
      data: response.data,
    },
  };
}
