import React from "react";
import { useRouter } from "next/router";
import CategoryComponent from "../../../../component/CategoryandSubcategory";
import { axiosGet, axiosPost, axiosGetAll } from "@/api";

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

    const response = await axiosPost("/ProductMaster/GetB2CProducts", obj);
    const cityObj = {
      city_name: city,
    };
    const category = await axiosPost("/Category/GetAllCategories", cityObj);
    return {
      props: {
        data: response,
        category: category,
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
