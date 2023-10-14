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
  // console.log("category pages: " + l);
  // console.log("subcategory page: " + subcategory);
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
  //const city = getCookie("userCity");
  const city = context.query.city;
  // console.log("Users City is : " + city);
  const categoryname = context.query.l || "";
  //  console.log("Category Name : " + categoryname);
  const subcategoryname = context.query.subcategory || "";
  // console.log("SubCategory Name : " + subcategoryname);

  try {
    const obj = {
      category_name: context.query.categoryName || "",
      sub_category_name: context.query.subcategory || "",
      city_name: "mumbai",
    };
    // console.log("object is :" + obj);

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
      city_name: "mumbai",
    };
    // console.log("city object is : " + JSON.stringify(cityObj));
    const category = await axios.post(
      `${apiurl}/Category/GetAllCategories`,
      cityObj
    );
    //  console.log("category : " + category);

    return {
      props: {
        category: JSON.stringify(category.data),
        subcategoryName: subcategoryname,
        data: JSON.stringify(response.data),
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
