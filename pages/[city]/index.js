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
      <section class="wla_featured_category_section center_section-heading">
        <div class="container">
          <div class="row m-0">
            <div class="col-md-12">
              <h2 class="wla_section_heading">
                <span>Our Products</span>{" "}
              </h2>
            </div>
          </div>
          <ul class="category-main">
            <li>
              <a
                href="https://order.theobroma.in/products/salads"
                title="Salads"
              >
                <div class="category-outer">
                  <img
                    src="https://static.uengage.in/uploads/7175/image-TGQCJD-1693502303.jpg"
                    alt="Salads"
                    width="400"
                    height="400"
                  />
                </div>

                <h4>Salads</h4>
              </a>
            </li>
            <li>
              <a
                href="https://order.theobroma.in/products/diwali-specials"
                title="Diwali Specials"
              >
                <div class="category-outer">
                  <img
                    src="https://static.uengage.in/uploads/7175/image-993899-1698383612.jpeg"
                    alt="Diwali Specials"
                    width="400"
                    height="400"
                  />
                </div>

                <h4>Diwali Specials</h4>
              </a>
            </li>
            <li>
              <a
                href="https://order.theobroma.in/products/combos"
                title="Combos"
              >
                <div class="category-outer">
                  <img
                    src="https://static.uengage.in/uploads/7175/image-857588-1685775319.jpeg"
                    alt="Combos"
                    width="400"
                    height="400"
                  />
                </div>

                <h4>Combos</h4>
              </a>
            </li>
            <li>
              <a
                href="https://order.theobroma.in/products/gift-hampers"
                title="Gift Hampers"
              >
                <div class="category-outer">
                  <img
                    src="https://static.uengage.in/uploads/7175/image-4WQ6GV-1681891496.jpg"
                    alt="Gift Hampers"
                    width="400"
                    height="400"
                  />
                </div>

                <h4>Gift Hampers</h4>
              </a>
            </li>
            <li>
              <a
                href="https://order.theobroma.in/products/brownies"
                title="Brownies"
              >
                <div class="category-outer">
                  <img
                    src="https://static.uengage.in/uploads/7175/image-QEH716-1681384690.jpg"
                    alt="Brownies"
                    width="400"
                    height="400"
                  />
                </div>

                <h4>Brownies</h4>
              </a>
            </li>
            <li>
              <a href="https://order.theobroma.in/products/cakes" title="Cakes">
                <div class="category-outer">
                  <img
                    src="https://static.uengage.in/uploads/7175/image-3KSQFF-1681384601.jpg"
                    alt="Cakes"
                    width="400"
                    height="400"
                  />
                </div>

                <h4>Cakes</h4>
              </a>
            </li>
            <li>
              <a
                href="https://order.theobroma.in/products/pastries"
                title="Pastries"
              >
                <div class="category-outer">
                  <img
                    src="https://static.uengage.in/uploads/7175/image-148TD0-1681384622.jpg"
                    alt="Pastries"
                    width="400"
                    height="400"
                  />
                </div>

                <h4>Pastries</h4>
              </a>
            </li>
            <li>
              <a
                href="https://order.theobroma.in/products/desserts-cupcakes"
                title="Desserts &amp; Cupcakes"
              >
                <div class="category-outer">
                  <img
                    src="https://static.uengage.in/uploads/7175/image-4CDG68-1687877409.jpg"
                    alt="Desserts &amp; Cupcakes"
                    width="400"
                    height="400"
                  />
                </div>

                <h4>Desserts &amp; Cupcakes</h4>
              </a>
            </li>
            <li>
              <a
                href="https://order.theobroma.in/products/breads"
                title="Breads"
              >
                <div class="category-outer">
                  <img
                    src="https://static.uengage.in/uploads/7175/image-K496HP-1681384646.jpg"
                    alt="Breads"
                    width="400"
                    height="400"
                  />
                </div>

                <h4>Breads</h4>
              </a>
            </li>
            <li>
              <a
                href="https://order.theobroma.in/products/tea-cakes"
                title="Tea Cakes"
              >
                <div class="category-outer">
                  <img
                    src="https://static.uengage.in/uploads/7175/image-ZZ9ZUG-1681384659.jpg"
                    alt="Tea Cakes"
                    width="400"
                    height="400"
                  />
                </div>

                <h4>Tea Cakes</h4>
              </a>
            </li>
            <li>
              <a
                href="https://order.theobroma.in/products/biscuits-cookies-crackers"
                title="Biscuits, Cookies &amp; Crackers"
              >
                <div class="category-outer">
                  <img
                    src="https://static.uengage.in/uploads/7175/image-JZUNMF-1681384651.jpg"
                    alt="Biscuits, Cookies &amp; Crackers"
                    width="400"
                    height="400"
                  />
                </div>

                <h4>Biscuits, Cookies &amp; Crackers</h4>
              </a>
            </li>
            <li>
              <a
                href="https://order.theobroma.in/products/sandwiches-savories"
                title="Sandwiches &amp; Savories"
              >
                <div class="category-outer">
                  <img
                    src="https://static.uengage.in/uploads/7175/image-615652-1688531202.jpeg"
                    alt="Sandwiches &amp; Savories"
                    width="400"
                    height="400"
                  />
                </div>

                <h4>Sandwiches &amp; Savories</h4>
              </a>
            </li>
            <li>
              <a
                href="https://order.theobroma.in/products/croissants-danishes"
                title="Croissants &amp; Danishes"
              >
                <div class="category-outer">
                  <img
                    src="https://static.uengage.in/uploads/7175/image-P6S262-1681384636.jpg"
                    alt="Croissants &amp; Danishes"
                    width="400"
                    height="400"
                  />
                </div>

                <h4>Croissants &amp; Danishes</h4>
              </a>
            </li>
            <li>
              <a
                href="https://order.theobroma.in/products/hot-beverages"
                title="Hot Beverages"
              >
                <div class="category-outer">
                  <img
                    src="https://static.uengage.in/uploads/7175/image-EU4HTD-1681384607.jpg"
                    alt="Hot Beverages"
                    width="400"
                    height="400"
                  />
                </div>

                <h4>Hot Beverages</h4>
              </a>
            </li>
            <li>
              <a
                href="https://order.theobroma.in/products/cold-beverages"
                title="Cold Beverages"
              >
                <div class="category-outer">
                  <img
                    src="https://static.uengage.in/uploads/7175/image-YDIPAB-1686247737.jpg"
                    alt="Cold Beverages"
                    width="400"
                    height="400"
                  />
                </div>

                <h4>Cold Beverages</h4>
              </a>
            </li>
            <li>
              <a
                href="https://order.theobroma.in/products/theobroma-collectibles"
                title="Theobroma Collectibles"
              >
                <div class="category-outer">
                  <img
                    src="https://static.uengage.in/uploads/7175/image-AJ9DA7-1686051000.jpg"
                    alt="Theobroma Collectibles"
                    width="400"
                    height="400"
                  />
                </div>

                <h4>Theobroma Collectibles</h4>
              </a>
            </li>
          </ul>
        </div>
      </section>
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
