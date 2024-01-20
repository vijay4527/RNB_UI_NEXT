import React, { useState } from 'react';
import axios from "axios";
import { getCookie } from "@/cookieUtils";
import styles from "./productbyname.module.css";
import reviewStyles from "./Review.module.css"
import homeStyles from "../../../styles/Home.module.css";
import AddToCart from "@/component/addToCartButton";
import ReviewDetails from "@/component/ReviewDetails"
import ProducDetails from "@/component/productDetails";
import ProductImageZoom from "@/component/productImageZoom"
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
  const [activeIndex, setActiveIndex] = useState(0);

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
  };
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
        <div className={homeStyles["container_fluid"]}>
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
          <div className={homeStyles["container_fluid"]}>
            <div className={styles.pdp_DetailBody}>
              <div className={styles.pdp_detailImgs}>
                <div className={styles.pdp_DetailImg}>
                {image ? (
        <>
          <div className={styles.pdp_ProductImgs}>
            <ul>
              {image.map((item, index) => (
                <li
                  key={item}
                  className={index === activeIndex ? styles.active : ""}
                  onClick={() => handleThumbnailClick(index)}
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
            <ProductImageZoom
              imageSrc={AppConfig.cdn + "products/" + image[activeIndex]}
            />
          </div>
        </>
      ) : (
        <p>No images available</p>
      )}
                </div>
              </div>
              <div className={styles.pdp_detailDesc}>
                <div className={styles.pdp_DetailDesc}>
                  {data ? (
                    <>
                    <h2 className={styles.pdp_ProductName}>
                      {data.product_name}
                    </h2>
                    <div className={styles.reviewProductWrap}>
                      <h4>3.5</h4>
                      <div className={reviewStyles.reviewStart}>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                        </span>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                        </span>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                        </span>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-half" viewBox="0 0 16 16">
                                <path d="M5.354 5.119 7.538.792A.52.52 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.54.54 0 0 1 16 6.32a.55.55 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.5.5 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.6.6 0 0 1 .085-.302.51.51 0 0 1 .37-.245zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.56.56 0 0 1 .162-.505l2.907-2.77-4.052-.576a.53.53 0 0 1-.393-.288L8.001 2.223 8 2.226z"/>
                            </svg>
                        </span>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
                            </svg>
                        </span>
                      </div>
                    </div>
                    <div className={styles.underLineSeperator}>

                    </div>
                    </>
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
          </div>
          <div className={homeStyles["container_fluid"]}>
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
