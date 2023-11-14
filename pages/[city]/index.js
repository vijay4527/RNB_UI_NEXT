import React from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { getCookie, setCookie, removeCookie } from "@/cookieUtils";
import styles from "./index.module.css";
import Nav from "../../component/nav";
import Link from "next/link";
import Head from "next/head";
import { useState, useEffect } from "react";
const Index = ({ city }) => {
  // const router = useRouter();
  // const userCity = router.query.city;

  // if (userCity) {
  //   Cookies.set("userCity", userCity, { expires: 365 });
  // }
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    // Initialize the Bootstrap carousel manually
    const carousel = new bootstrap.Carousel(
      document.getElementById("carouselExampleCaptions"),
      {
        interval: false, // Disable automatic sliding
      }
    );

    // Clean up the carousel instance when the component unmounts
    return () => {
      carousel.dispose();
    };
  }, []); // Run this effect only once, when the component mounts

  const handlePrev = () => {
    // Move to the previous slide
    const carouselInstance = new bootstrap.Carousel(
      document.getElementById("carouselExampleCaptions")
    );
    carouselInstance.prev();
  };

  const handleNext = () => {
    // Move to the next slide
    const carouselInstance = new bootstrap.Carousel(
      document.getElementById("carouselExampleCaptions")
    );
    carouselInstance.next();
  };
  return (
    <>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha2/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha2/dist/js/bootstrap.bundle.min.js"></script>
      </Head>
      <Nav />

      <div className={styles.pdp_WrapContent}>
        {/* <div className={styles.common_header}>
          <div className={styles.container_fluid}>
            <div className={styles.content_heading}>
              <div className={styles.content_title_heading}>
                <span className={styles.back_to_shop}>READY REGULARS</span>
                <h1 className={styles.text_title_heading}>
                   {data ? data.category_name : ""}
                  Home
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
        </div> */}
        {/* <div id="carouselExampleFade" class="carousel slide carousel-fade">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img className="bannerimg img-fluid" src="banner Image1.png"></img>
            </div>
            <div class="carousel-item">
              <img className="bannerimg" src="banner Image1.png"></img>
            </div>
            <div class="carousel-item">
              <img className="bannerimg" src="banner Image1.png"></img>
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div> */}
        <div id="carouselExampleCaptions" className="carousel slide">
          <div className="carousel-indicators">
            {/* Add your carousel indicators here if needed */}
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="banner Image1.png"
                className="d-block w-100"
                alt="Slide 1"
              />
            </div>
            <div className="carousel-item">
              <img
                src="banner Image1.png"
                className="d-block w-100"
                alt="Slide 2"
              />
            </div>
            {/* Add more carousel items as needed */}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            onClick={handlePrev}
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            onClick={handleNext}
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className={styles.plp_Wrap}>
        <h4 className="text-center mb-4">Our Products</h4>
        <div className={styles.container_fluid}>
          <div className={styles.plp_Cards}>
            <Link href={`/${city}/p/Red Velvet Strawberry Cake`}>
              <div className={styles.plp_CardItems}>
                <article className={styles.fc}>
                  <div className={styles.fc__wrapper}>
                    <img
                      src="https://fama.b-cdn.net/RnB/Dev/products/20231025124657968.jpeg"
                      className={styles.fc__thumb}
                    />
                    <div className={styles.fc__content}>
                      <h1>Red Velvet Strawberry Cake</h1>
                      <span className={styles.span}>800</span>
                    </div>
                    <span
                      className={styles.fc__light}
                      // style={{
                      //   backgroundImage: `linear-gradient(${light.angle}deg, black, transparent ${light.width}%)`,
                      // }}
                    ></span>
                    <svg
                      className={styles.fc__border}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect height="100%" width="100%" />
                    </svg>
                  </div>{" "}
                </article>
              </div>
            </Link>

            <Link href={`/${city}/p/Red Velvet Strawberry Cake`}>
              <div className={styles.plp_CardItems}>
                <article className={styles.fc}>
                  <div className={styles.fc__wrapper}>
                    <img
                      src="https://fama.b-cdn.net/RnB/Dev/products/20231025124657968.jpeg"
                      className={styles.fc__thumb}
                    />
                    <div className={styles.fc__content}>
                      <h1>Red Velvet Strawberry Cake</h1>
                      <span className={styles.span}>800</span>
                    </div>
                    <span
                      className={styles.fc__light}
                      // style={{
                      //   backgroundImage: `linear-gradient(${light.angle}deg, black, transparent ${light.width}%)`,
                      // }}
                    ></span>
                    <svg
                      className={styles.fc__border}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect height="100%" width="100%" />
                    </svg>
                  </div>{" "}
                </article>
              </div>
            </Link>

            <Link href={`/${city}/p/Red Velvet Strawberry Cake`}>
              <div className={styles.plp_CardItems}>
                <article className={styles.fc}>
                  <div className={styles.fc__wrapper}>
                    <img
                      src="https://fama.b-cdn.net/RnB/Dev/products/20231025124657968.jpeg"
                      className={styles.fc__thumb}
                    />
                    <div className={styles.fc__content}>
                      <h1>Red Velvet Strawberry Cake</h1>
                      <span className={styles.span}>800</span>
                    </div>
                    <span
                      className={styles.fc__light}
                      // style={{
                      //   backgroundImage: `linear-gradient(${light.angle}deg, black, transparent ${light.width}%)`,
                      // }}
                    ></span>
                    <svg
                      className={styles.fc__border}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect height="100%" width="100%" />
                    </svg>
                  </div>{" "}
                </article>
              </div>
            </Link>

            <Link href={`/${city}/p/Red Velvet Strawberry Cake`}>
              <div className={styles.plp_CardItems}>
                <article className={styles.fc}>
                  <div className={styles.fc__wrapper}>
                    <img
                      src="https://fama.b-cdn.net/RnB/Dev/products/20231025124657968.jpeg"
                      className={styles.fc__thumb}
                    />
                    <div className={styles.fc__content}>
                      <h1>Red Velvet Strawberry Cake</h1>
                      <span className={styles.span}>800</span>
                    </div>
                    <span
                      className={styles.fc__light}
                      // style={{
                      //   backgroundImage: `linear-gradient(${light.angle}deg, black, transparent ${light.width}%)`,
                      // }}
                    ></span>
                    <svg
                      className={styles.fc__border}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect height="100%" width="100%" />
                    </svg>
                  </div>{" "}
                </article>
              </div>
            </Link>

            <Link href={`/${city}/p/Red Velvet Strawberry Cake`}>
              <div className={styles.plp_CardItems}>
                <article className={styles.fc}>
                  <div className={styles.fc__wrapper}>
                    <img
                      src="https://fama.b-cdn.net/RnB/Dev/products/20231025124657968.jpeg"
                      className={styles.fc__thumb}
                    />
                    <div className={styles.fc__content}>
                      <h1>Red Velvet Strawberry Cake</h1>
                      <span className={styles.span}>800</span>
                    </div>
                    <span
                      className={styles.fc__light}
                      // style={{
                      //   backgroundImage: `linear-gradient(${light.angle}deg, black, transparent ${light.width}%)`,
                      // }}
                    ></span>
                    <svg
                      className={styles.fc__border}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect height="100%" width="100%" />
                    </svg>
                  </div>{" "}
                </article>
              </div>
            </Link>

            <Link href={`/${city}/p/Red Velvet Strawberry Cake`}>
              <div className={styles.plp_CardItems}>
                <article className={styles.fc}>
                  <div className={styles.fc__wrapper}>
                    <img
                      src="https://fama.b-cdn.net/RnB/Dev/products/20231025124657968.jpeg"
                      className={styles.fc__thumb}
                    />
                    <div className={styles.fc__content}>
                      <h1>Red Velvet Strawberry Cake</h1>
                      <span className={styles.span}>800</span>
                    </div>
                    <span
                      className={styles.fc__light}
                      // style={{
                      //   backgroundImage: `linear-gradient(${light.angle}deg, black, transparent ${light.width}%)`,
                      // }}
                    ></span>
                    <svg
                      className={styles.fc__border}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect height="100%" width="100%" />
                    </svg>
                  </div>{" "}
                </article>
              </div>
            </Link>

            <Link href={`/${city}/p/Red Velvet Strawberry Cake`}>
              <div className={styles.plp_CardItems}>
                <article className={styles.fc}>
                  <div className={styles.fc__wrapper}>
                    <img
                      src="https://fama.b-cdn.net/RnB/Dev/products/20231025124657968.jpeg"
                      className={styles.fc__thumb}
                    />
                    <div className={styles.fc__content}>
                      <h1>Red Velvet Strawberry Cake</h1>
                      <span className={styles.span}>800</span>
                    </div>
                    <span
                      className={styles.fc__light}
                      // style={{
                      //   backgroundImage: `linear-gradient(${light.angle}deg, black, transparent ${light.width}%)`,
                      // }}
                    ></span>
                    <svg
                      className={styles.fc__border}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect height="100%" width="100%" />
                    </svg>
                  </div>{" "}
                </article>
              </div>
            </Link>

            <Link href={`/${city}/p/Red Velvet Strawberry Cake`}>
              <div className={styles.plp_CardItems}>
                <article className={styles.fc}>
                  <div className={styles.fc__wrapper}>
                    <img
                      src="https://fama.b-cdn.net/RnB/Dev/products/20231025124657968.jpeg"
                      className={styles.fc__thumb}
                    />
                    <div className={styles.fc__content}>
                      <h1>Red Velvet Strawberry Cake</h1>
                      <span className={styles.span}>800</span>
                    </div>
                    <span
                      className={styles.fc__light}
                      // style={{
                      //   backgroundImage: `linear-gradient(${light.angle}deg, black, transparent ${light.width}%)`,
                      // }}
                    ></span>
                    <svg
                      className={styles.fc__border}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect height="100%" width="100%" />
                    </svg>
                  </div>{" "}
                </article>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const city = context.query.city;
  removeCookie("userCity");
  if (city) {
    setCookie("userCity", city);
    console.log("Cookie set with value: " + getCookie("userCity"));
  }

  return {
    props: {
      city,
    },
  };
}

export default Index;
