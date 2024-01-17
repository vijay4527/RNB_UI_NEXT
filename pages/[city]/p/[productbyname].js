import React from "react";
import axios from "axios";
import { getCookie } from "@/cookieUtils";
import styles from "./productbyname.module.css";
import AddToCart from "@/component/addToCartButton";
import ReviewDetails from "@/component/ReviewDetails"
import ProducDetails from "@/component/productDetails";
import https from "https";
import AppConfig from "@/AppConfig";
import { axiosGet, axiosPost, axiosGetAll } from "@/api";
import { useRouter } from "next/router";
import Head from "next/head";
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

const productbyname = ({ data }) => {
  let image = data.product_image.split(",");
  const router = useRouter();
  const { city } = router.query;
  return (
    <>
    <Head>
      <meta charset="utf-8"></meta>
      <title>{data.product_name} | Online Cake Delivery in Mumbai, Pune and Mangalore</title>
      <meta name="description" content="Online Cakes Shop in Mumbai, Pune and Mangalore . Online Cakes Delivery . Buy,Order &amp; Send Birthday, Wedding Anniversary &amp; Chocolate Cakes anywhere in Mumbai from best Cake Shop Ribbons &amp; Balloons."></meta>
      <meta name="keywords" content="Ribbons and Balloons, Buy Cakes Online, Online Cake delivery, Cakes Mumbai, Cakes to Mumbai, order cakes online, cake delivery in mumbai, Send Cakes to Mumbai, Mumbai Cake Shop, Online Cakes to Mumbai, Cakes Mumbai, Cake delivery to Mumbai, Chocolate Cakes Mumbai, Heart Shape Cakes, Eggless Cakes, Occasion Cakes, birthday cakes online delivery, Send Birthday Cakes, Congratulations Cakes, Missing You Cakes, Baby and Kids Cakes, Anniversary Cakes Online, Thank You Cakes, House Warming Cakes, Wedding Cakes Mumbai, customised cakes in mumbai, cup cakes mumbai, Online Cakes Shop Mumbai, valentine special cakes mumbai, plum cakes mumbai, fresh fruit cakes online"></meta>
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"></meta>
      <link rel="icon" href="https://ribbonsandballoons.com/frontassets/images/fav.png" type="image/x-icon" />
      <meta name="google-site-verification" content="hj44_Ud2995b4jkL3My7hTX96_sALd3yQ7tlf0El0IE"></meta>
      <meta name="p:domain_verify" content="e35c0804c87b42f9187c00fa30ff64f9"></meta>
      <meta name="facebook-domain-verification" content="1cpqqtudq8imtqkiwxpq0vd20x3b69"></meta>
      </Head>

      
    <div className={styles.pdp_WrapContent}>
      <div className={styles.common_header}>
        <div className={styles.container_fluid}>
          <div className={styles.content_heading}>
            <div className={styles.content_title_heading}>
              <span className={styles.back_to_shop}>READY REGULARS</span>
              <h1 className={styles.text_title_heading}>
                <a
                  href={`/${city}/l/${data.category_name.split(" ").join("-")}`}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  {data ? data.category_name : ""}
                </a>
              </h1>
            </div>
            <div className={styles.breadcrumb}>
              <div className={styles.breadcrumb}>
                <a
                  href={`/${city}/l/${data.category_name
                    .split(" ")
                    .join("-")}/${data.sub_category_name.split(" ").join("-")}`}
                  style={{ textDecoration: "none", color: "white" }}
                >
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
              <div className={styles.pdp_detailImgs}>
                <div className={styles.pdp_DetailImg}>
                  {image ? (
                    <>
                      <div className={styles.pdp_ProductImgs}>
                        <ul>
                          {image.slice(1).map((item, index) => (
                            <li
                              key={item}
                              className={index === 0 ? styles.active : ""}
                            >
                              <img
                                src={AppConfig.cdn + "products/" + item}
                                alt="No image found"
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className={styles.pdp_ProductImg}>
                        <img
                          src={AppConfig.cdn + "products/" + image[0]}
                          alt="No image found"
                        />
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className={styles.pdp_detailDesc}>
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
                  {/* <div className={styles.pdp_ProductContent}>
                    <h4>
                      Call Us For Instant Help:{" "}
                      <a href="tel:18002096323">18002096323</a>
                    </h4>
                    <p>10:30 AM To 5:30 PM (Mon To Sat)</p>
                  </div> */}

                  <AddToCart data={data}></AddToCart>
                </div>
                
                <ProducDetails data={data}></ProducDetails>
              </div>
            </div>

            <div className={styles.reviewSection}>
              <ReviewDetails></ReviewDetails>
            </div>
          </div>
        </div>
      ) : (
        <>
          <img src="https://static.vecteezy.com/system/resources/thumbnails/006/549/647/small/404-landing-page-free-vector.jpg" 
                                alt="No image found"/>
          <span>Product not found</span>
        </>
      )}
    </div>
    </>
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
