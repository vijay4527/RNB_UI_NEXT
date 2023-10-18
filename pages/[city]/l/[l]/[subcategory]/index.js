import React from "react";
import { useRouter } from "next/router";
import CategoryComponent from "../../../../../component/CategoryandSubcategory";
import axios from "axios";
import https from "https";
import { getCookie, setCookie } from "../../../../../cookieUtils";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});
axios.defaults.httpsAgent = httpsAgent;
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
  const url = context.query;
  const categoryname = url.l.split("-").join(" ") || "";
  //  console.log("Category Name : " + categoryname);
  const subcategoryname = url.subcategory.split("-").join(" ") || "";
  // console.log("SubCategory Name : " + subcategoryname);

  try {
    const obj = {
      category_name: categoryname || "",
      sub_category_name: subcategoryname || "",
      city_name: city,
    };
    // console.log("object is :" + obj);

    const response = await axios.post(
      `${apiurl}/ProductMaster/GetB2CProducts`,
      obj
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
