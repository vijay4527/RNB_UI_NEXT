import React from "react";
import { useRouter } from "next/router";
import CategoryComponent from "../../../../../component/CategoryandSubcategory";
import axios from "axios";
import https from "https";
import { getCookie, setCookie } from "../../../../../cookieUtils";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});
function SubCategoryPage({ data, category, categoryName, subcategoryName }) {
  // const router = useRouter();
  // const { city, l, subcategory } = router.query;
  return (
    <CategoryComponent
      category={category}
      subcategoryName={subcategoryName}
      data={data}
      categoryName={categoryName}
    />
  );
}

export async function getServerSideProps(context) {
  const apiurl = process.env.API_URL;

  const city = context.query.city;
  const url = context.query;
  const categoryname = url.l.split("-").join(" ") || "";
  const subcategoryname = url.subcategory.split("-").join(" ") || "";
  try {
    const obj = {
      category_name: categoryname || "",
      sub_category_name: subcategoryname || "",
      city_name: "mumbai",
    };

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
    // console.log("city object is : " + JSON.stringify(cityObj));
    const category = await axios.post(
      `${apiurl}/Category/GetAllCategories`,
      cityObj
    );
    //  console.log("category : " + category);

    return {
      props: {
        category: category.data,
        subcategoryName: subcategoryname,
        data: response.data,
        categoryName: categoryname,
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

export default SubCategoryPage;
