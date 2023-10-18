import React from "react";
import { useRouter } from "next/router";
import CategoryComponent from "../../../../component/CategoryandSubcategory";
import axios from "axios";
import https from "https";
import { getCookie, setCookie } from "../../../../cookieUtils";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});
axios.defaults.httpsAgent = httpsAgent;

function CategoryPage({ data, category }) {
  const router = useRouter();

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
  const city = context.query.city;
  const subcategoryurl = context.query.subcategory;
  try {
    const obj = {
      category_name: context.query.l || "",
      sub_category_name: context.query.subcategory || "",
      city_name: city,
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
    const category = await axios.post(
      `${apiurl}/Category/GetAllCategories`,
      cityObj
    );

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
