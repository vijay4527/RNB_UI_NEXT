import React from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { getCookie, setCookie, removeCookie } from "@/cookieUtils";
import styles from "./index.module.css";
import Nav from "../../component/nav";
const Index = ({ city }) => {
  // const router = useRouter();
  // const userCity = router.query.city;

  // if (userCity) {
  //   Cookies.set("userCity", userCity, { expires: 365 });
  // }

  return (
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
