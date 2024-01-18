import React, { useState } from "react";
import RangeSlider from 'react-range-slider-input';
import styles from "./p/productbyname.module.css";
import Container from 'react-bootstrap/Container';

function plpPage() {
  const cakesData = [
    {
      id: 1,
      name: "Pull Me up Cake",
      collection: "Sinful Collections",
      price: "₹ 900",
      imageUrl: "https://ribbonsandballoons.com/assets1/uploads/Pull-me-up-cake-3_416627.jpg",
      hoverStyle: "hvr11"
    },
    {
      id: 2,
      name: "Tobleron Chocolate",
      collection: "Sinful Collections",
      price: "₹ 510",
      imageUrl: "https://ribbonsandballoons.com/assets1/uploads/Tobleron-Chocolate.jpg",
      hoverStyle: "hvr10"
    },
    {
      id: 3,
      name: "Red Velvet Cake",
      collection: "Sinful Collections",
      price: "₹ 610",
      imageUrl: "https://ribbonsandballoons.com/assets1/uploads/Red-Velvet.jpg",
      hoverStyle: "hvr6"
    },
    {
      id: 4,
      name: "Oreo Chocolate",
      collection: "Sinful Collections",
      price: "₹ 510",
      imageUrl: "https://ribbonsandballoons.com/assets1/uploads/Orea-Chocolate.jpg",
      hoverStyle: "hvr3"
    },
    {
      id: 5,
      name: "Kids",
      collection: "Sinful Collections",
      price: "₹ 510",
      imageUrl: "https://ribbonsandballoons.com/assets1/uploads/Kids.jpg",
      hoverStyle: "hvr10"
    },
  ];
  const [value, setValue] = useState(50); // Initial value

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <div className={styles.breadcrumb}>

      </div>
      <section className={styles.plpPageMain}>
        <Container fluid>
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
                      <li>
                        <a>Ready Regulars</a>
                      </li>
                      <li>
                        <a>Sinful Collections</a>
                      </li>
                      <li>
                        <a>Photo cakes</a>
                      </li>
                      <li>
                        <a>Signature Cakes</a>
                      </li>
                      <li>
                        <a>Fancy Cakes</a>
                      </li>
                      <li>
                        <a>Sensational Cakes</a>
                      </li>
                    </ul>
                  </div>
                </div>
            </div>
            <div className={styles.plpPageBody}>
              <div className={styles.plpPagetemsAction}>
                <h4 className={styles.plpItemsCount}>Showing 1-8 of 38 results</h4>
                <div className={styles.plpSortby}>
                  <select className={"form-control"}>
                    <option selected>Default sorting</option>
                    <option>Sort by popularity</option>
                    <option>Sort by average rating</option>
                    <option>Sort by latest</option>
                    <option>Sort by price: low to high</option>
                    <option>Sort by price: high to low</option>
                  </select>
                </div>
              </div>
              <div className={styles.plpTiles}>
              {cakesData.map((cake) => (
                <div className={styles.item} key={cake.id}>
                  <div className={styles.itemInfo}>
                    <div className={`${styles.imgHvr} ${styles[cake.hoverStyle]}`}>
                      <div className={styles.inner}>
                        <div className={styles.text}>
                          <a href="#" className={styles.add_to_cart_button} aria-label={`Add “${cake.name}” to your cart`}>
                            Add to cart
                          </a>
                        </div>
                      </div>
                      <img className={styles.plpProdctImg} src={cake.imageUrl} alt={cake.name} />
                    </div>
                    <div className={styles.itemDesc}>
                      <a>{cake.name}</a>
                      <h4>{cake.collection}</h4>
                      <p>{cake.price}</p>
                    </div>
                  </div>
                </div>
              ))}
              </div>  
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

export default plpPage;
