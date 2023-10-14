import React from "react";
import { useRouter } from "next/router";
import CategoryComponent from "../../../../component/CategoryandSubcategory";
import axios from "axios";
import https from "https";
import Cookies from "js-cookie";
import { getCookie, setCookie } from "../../../../cookieUtils";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});
axios.defaults.httpsAgent = httpsAgent;

function CategoryPage({ data, category }) {
  const router = useRouter();

  //console.log("category on category page is : " + category);
  // console.log("data is :" + data);
  // console.log("category is :" + category);

  const { l, subcategory } = router.query;

  return (
    <CategoryComponent
      category={category}
      subcategoryName={subcategory}
      data={data}
      categoryName={l}
    />
  );
}

export async function getServerSideProps(context) {
  const apiurl = process.env.API_URL;
  // const city = getCookie("userCity");
  const city = context.query.city;
  const subcategoryurl = context.query.subcategory;
  // const subcategoryName = subcategoryurl.split("-").join(" ");
  try {
    const obj = {
      category_name: context.query.l || "",
      sub_category_name: context.query.subcategory || "",
      city_name: city,
    };
    console.log("object is :" + JSON.stringify(obj));

    const response = await axios.post(
      `${apiurl}/ProductMaster/GetB2CProducts`,
      obj,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const cityObj = {
      city_name: city,
    };
    console.log("city object is : " + JSON.stringify(cityObj));
    const category = await axios.post(
      `${apiurl}/Category/GetAllCategories`,
      cityObj
    );
    // console.log("category : " + category);

    return {
      props: {
        data: response.data,
        category: category.data,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        data: null,
        additionalData: null,
      },
    };
  }
}

export default CategoryPage;
