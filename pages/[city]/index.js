import React from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { getCookie, setCookie, removeCookie } from "@/cookieUtils";
import styles from "./index.module.css";
import Nav from "../../component/nav";
import Link from "next/link";
const Index = ({ city }) => {
  // const router = useRouter();
  // const userCity = router.query.city;

  // if (userCity) {
  //   Cookies.set("userCity", userCity, { expires: 365 });
  // }

  return (
    <>
      <div className={styles.pdp_WrapContent}>
        <div className={styles.common_header}>
          <div className={styles.container_fluid}>
            <div className={styles.content_heading}>
              <div className={styles.content_title_heading}>
                <span className={styles.back_to_shop}>READY REGULARS</span>
                <h1 className={styles.text_title_heading}>
                  {/* {data ? data.category_name : ""} */}
                  Home
                </h1>
              </div>
              <div className={styles.breadcrumb}>
                <div className={styles.breadcrumb}>
                  <a href="/">
                    {/* {data ? data.category_name : ""}{" "}
                  <span className={styles.delimiter}>
                    {data ? data.sub_category_name : ""}
                  </span> */}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Nav />
      </div>
      <div className={styles.plp_Wrap}>
        <h4 className="text-center mb-4">Our Products</h4>
        <div className={styles.container_fluid}>
          <div className={styles.plp_Cards}>
            <Link key="123" href={`/${city}/p/Red Velvet Strawberry Cake`}>
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

            <Link key="123" href={`/${city}/p/Red Velvet Strawberry Cake`}>
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

            <Link key="123" href={`/${city}/p/Red Velvet Strawberry Cake`}>
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

            <Link key="123" href={`/${city}/p/Red Velvet Strawberry Cake`}>
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

            <Link key="123" href={`/${city}/p/Red Velvet Strawberry Cake`}>
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

            <Link key="123" href={`/${city}/p/Red Velvet Strawberry Cake`}>
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

            <Link key="123" href={`/${city}/p/Red Velvet Strawberry Cake`}>
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

            <Link key="123" href={`/${city}/p/Red Velvet Strawberry Cake`}>
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
