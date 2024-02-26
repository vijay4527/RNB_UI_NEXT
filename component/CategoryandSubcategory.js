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
                      ? category.map((item) => (
                          <li key={item.category_id}>
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
                      <Link
                        key={item.product_id}
                        href={`/${city}/p/${productName}`}
                        className={styles.itemCard}
                      >
                        <div className={styles.item}>
                          <div className={styles.itemInfo}>
                            <AddToFavoriteButton  productData={item}/>
                            <div className={`${styles.imgHvr}`}>
                              <img className={styles.plpProdctImg}
                                src={`${AppConfig.cdn}products/${image[0]}`}
                                alt="No image found"/>
                            </div>
                            <div className={`${styles["itemDesc"]}`}>
                              <h1>{item.product_name}</h1>
                              <h4>Sinful Collections</h4>
                              <p>₹ {item.cost}</p>
                            </div>
                          </div>
                        </div>
                      </Link>
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
    // <div className={styles.gkh}>
    //   <div id={styles.stars}></div>
    //   <div id={styles.stars2}></div>
    //   <div id={styles.stars3}></div>
    //   <div className={styles.plp_WrapContent} id={styles.title}>
    //     <div className={styles.common_header}>
    //       <div className={styles.container_fluid}>
    //         <div className={styles.content_heading}>
    //           <div className={styles.content_title_heading}>
    //             <span className={styles.back_to_shop}>
    //               {categoryName ? categoryName : ""}
    //             </span>
    //             <h1
    //               className={styles.text_title_heading}
    //               style={{ textDecoration: "none" }}
    //             >
    //               {categoryName ? categoryName : ""}
    //             </h1>
    //           </div>
    //           <div className={styles.breadcrumb}>
    //             <div className={styles.breadcrumb}>
    //               <a href="/">
    //                 {/* {categoryName && subcategoryName ? categoryName : ""} */}
    //                 {subcategoryName ? (
    //                   // <span className={styles.delimiter}>
    //                   <span>{subcategoryName}</span>
    //                 ) : (
    //                   ""
    //                 )}
    //               </a>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className={styles.plp_Wrap}>
    //       <div className={styles.container_fluid}>
    //         <div className={styles.plp_Body}>
    //           <div className={styles.plp_Filter}>
    //             <div className={styles.plp_FilterHead}>
    //               <div className={styles.plp_FilterHeadRibbon}>
    //                 Category
    //                 <i></i>
    //                 <i></i>
    //                 <i></i>
    //                 <i></i>
    //               </div>
    //             </div>
    //             <div className={styles.plp_FilterBody}>
    //               {category && category.length > 0
    //                 ? category.map((item) => (
    //                     <h4
    //                       className={styles.plp_FilterCate}
    //                       key={item.category_id}
    //                     >
    //                       {item.category_name}
    //                     </h4>
    //                   ))
    //                 : ""}
    //             </div>
    //           </div>
    //           {/* <div className={styles.plp_Filter}>
    //         <div className={styles.plp_FilterHead}>
    //           <div className={styles.plp_FilterHeadRibbon}>
    //             Sub Category
    //             <i></i>
    //             <i></i>
    //             <i></i>
    //             <i></i>
    //           </div>
    //         </div>
    //         <div className={styles.plp_FilterBody}>
    //           {subCategoryproduct.map((item) => (
    //             <h4
    //               className={styles.plp_FilterCate}
    //               key={item.sub_category_id}
    //             >
    //               {item.sub_category_name}
    //             </h4>
    //           ))}
    //         </div>
    //       </div> */}
    //           <div className={styles.plp_Cards}>
    //             {data && data.length > 0 ? (
    //               data.map((item) => {
    //                 const productName = item.product_name.split(" ").join("-");
    //                 var image = item.product_image.split(",");
    //                 return (
    //                   <Link
    //                     key={item.product_id}
    //                     href={`/${city}/p/${productName}`}
    //                   >
    //                     <div className={styles.plp_CardItems}>
    //                       <article
    //                         className={styles.fc}
    //                         // onMouseMove={handleMouseMove}
    //                         // onMouseLeave={handleMouseLeave}
    //                       >
    //                         <div
    //                           className={styles.fc__wrapper}
    //                           // style={{
    //                           //   transform: `rotateX(${rotate.rotateX}deg) rotateY(${rotate.rotateY}deg)`,
    //                           // }}
    //                         >
    //                           <img
    //                             src={`${AppConfig.cdn}products/${image[0]}`}
    //                             className={styles.fc__thumb}
    //                             alt="No image found"
    //                           />
    //                           <div className={styles.fc__content}>
    //                             <h1>{item.product_name}</h1>
    //                             <span className={styles.span}>{item.cost}</span>
    //                           </div>
    //                           <span
    //                             className={styles.fc__light}
    //                             // style={{
    //                             //   backgroundImage: `linear-gradient(${light.angle}deg, black, transparent ${light.width}%)`,
    //                             // }}
    //                           ></span>
    //                           <svg
    //                             className={styles.fc__border}
    //                             xmlns="http://www.w3.org/2000/svg"
    //                           >
    //                             <rect height="100%" width="100%" />
    //                           </svg>
    //                         </div>{" "}
    //                       </article>
    //                     </div>
    //                   </Link>
    //                 );
    //               })
    //             ) : (
    //               <>
    //                 <div className="display-flex-center">
    //                   <span className="text-center">
    //                     No Products Found for {categoryName}
    //                   </span>
    //                   <img src="https://static.vecteezy.com/system/resources/thumbnails/006/549/647/small/404-landing-page-free-vector.jpg" 
    //                             alt="No image found"/>
    //                 </div>
    //               </>
    //             )}
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
export default CategoryComponent;
