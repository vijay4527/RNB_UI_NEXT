import React from "react";
import axios from "axios";
import styles from "../pages/[city]/l/[l]/index.module.css";
import homeStyles from "../styles/Home.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { getCookie } from "@/cookieUtils";
import { useEffect, useState } from "react";
import AppConfig from "../AppConfig";
import RangeSlider from 'react-range-slider-input';
import Container from 'react-bootstrap/Container';
import AddToFavoriteButton from "./AddToFavoritesButton";

function CategoryComponent({ category, subcategoryName, data, categoryName }) {
  // const productData = data;
  // const categoryData = category;
  console.log("data in category and subcategory",data)
  const fcHalfHeight = 205;
  const fcHalfWidth = 135;
  const defaultLightWidth = 40;
  const defaultLightAngle = 45;
  const maxRotateX = 6;
  const maxRotateY = 6;
  const maxLightWidth = 25;
  const maxLightAngle = 20;
  const router = useRouter();
  const { city, l, subcategory } = router.query;
  // const [city, setCity] = useState(null);

  // useEffect(async () => {
  //   // Get the city from the cookie and set it in state
  //   const userCity = await getCookie("userCity");
  //   setCity(userCity);
  // }, []);
  // const handleMouseMove = (event) => {
  //   const fcRect = event.currentTarget.getBoundingClientRect();
  //   const mouseX = event.pageX - fcRect.left;
  //   const mouseY = event.pageY - fcRect.top;

  //   const diffX = -1 * (fcHalfWidth - mouseX);
  //   const diffY = fcHalfHeight - mouseY;
  //   const newRotateX = (diffY / fcHalfHeight) * maxRotateX;
  //   const newRotateY = (diffX / fcHalfWidth) * maxRotateY;

  //   const newLightWidth =
  //     defaultLightWidth - (diffY / fcHalfHeight) * maxLightWidth;
  //   const newLightAngle =
  //     defaultLightAngle + (diffX / fcHalfWidth) * maxLightAngle;
  // };
  // const handleMouseLeave = () => {};
  // const [value, setValue] = useState(50); // Initial value

  // const handleChange = (newValue) => {
  //   setValue(newValue);
  // };
  return (
    <>
      <div className={styles.breadcrumb}>

      </div>
      <section className={styles.plpPageMain}>
        <div className={homeStyles["container_fluid"]}>
          <div className={styles.plpPageWrap}>
            <div className={styles.plpPageFilter}>
                <div className={styles.plpFilterAction}>
                  <h4 className={styles.plpFilterInfoAction}>PRICE FILTER</h4>
                  <div className={styles.underLinecenter}>
                    <div className={"testimonialUnder"}>
                      <div className={"underLine"}></div>
                      <div className={"shapLine"}></div>
                    </div>
                  </div>
                  <div className={styles.plpFilterDescAction}>
                    <RangeSlider/>
                  </div>
                </div>
                <div className={styles.plpFilterAction}>
                  <h4 className={styles.plpFilterInfoAction}>CATEGORIES</h4>
                  <div className={styles.underLinecenter}>
                    <div className={"testimonialUnder"}>
                      <div className={"underLine"}></div>
                      <div className={"shapLine"}></div>
                    </div>
                  </div>
                  <div className={styles.plpFilterDescAction}>
                    
                    <ul>
                      {category && category.length > 0
                      ? category.map((item,index) => (
                          <li key={index}>
                            <a>{item.category_name}</a>
                          </li>
                        ))
                      : ""}
                      
                      {/* <li>
                        <a>Sensational Cakes</a>
                      </li> */}
                    </ul>
                  </div>
                </div>
            </div>
            <div className={styles.plpPageBody}>
              <div className={styles.plpPagetemsAction}>
                <h4 className={styles.plpItemsCount}>Showing 1-{data.length} of {data.length} results</h4>
                <div className={styles.plpSortby}>
                  <select className={"form-control"}  defaultValue="Default sorting">
                    <option>Default sorting</option>
                    <option>Sort by popularity</option>
                    <option>Sort by average rating</option>
                    <option>Sort by latest</option>
                    <option>Sort by price: low to high</option>
                    <option>Sort by price: high to low</option>
                  </select>
                </div>
              </div>
              <div className={styles.plpTiles}>
              {data && data.length > 0 ? (
                  data.map((item) => {
                    const productName = item.product_name.split(" ").join("-");
                    var image = item.product_image.split(",");
                    return (
                     
                        <div className={styles.item} key={item.product_id}>
                          <div className={styles.itemInfo}>
                            <AddToFavoriteButton  productData={item}/>
                            <Link
                        key={item.product_id}
                        href={`/${city}/p/${productName}`}
                        className={styles.itemCard}
                        prefetch={true}
                      >
                            <div className={`${styles.imgHvr}`}>
                              <img className={styles.plpProdctImg}
                                src={`${AppConfig.cdn}products/${image[0]}`}
                                alt="No image found"/>
                            </div>
                            </Link>

                            <div className={`${styles["itemDesc"]}`}>
                              <h1>{item.product_name}</h1>
                              <h4>Sinful Collections</h4>
                              <p>₹ {item.cost}</p>
                            </div>
                          </div>
                        </div>
                    );
                  })
                ) : (
                  <>
                    <div className="display-flex-center">
                      <span className="text-center">
                        No Products Found for {categoryName}
                      </span>
                      <img src="https://static.vecteezy.com/system/resources/thumbnails/006/549/647/small/404-landing-page-free-vector.jpg" 
                                alt="No image found"/>
                    </div>
                  </>
                )}
              </div>  
            </div>
          </div>
        </div>
      </section>
    </>
   
  );
}
export default CategoryComponent;
