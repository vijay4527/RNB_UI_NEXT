import React from "react";
import CategoryComponent from "../../../../../component/CategoryandSubcategory";
import { axiosPost, axiosGet, axiosGetAll } from "@/api";
import useUserData from "@/component/verifyEmail";
import { useState,useEffect } from "react";
import { useSession } from "next-auth/react";
function SubCategoryPage({ data, category, categoryName, subcategoryName }) {
  const [hitAPi,setHitApi] = useState(false)
  // const { isLoggedIn, loading } = useUserData(hitAPi);
  const { data:session, status } = useSession();

  // useEffect(()=>{
  //   if(session && session.user){
  //     console.log(session)
  //       setHitApi(true)
  //   }
  // },[session])
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
  const city = context.query.city;
  const url = context.query;
  const categoryname = url.l.split("-").join(" ") || "";
  const subcategoryname = url.subcategory.split("-").join(" ") || "";

  try {
    const obj = {
      category_name: categoryname || "",
      sub_category_name: subcategoryname || "",
      city_name: city,
    };
    const response = await axiosPost("/ProductMaster/GetB2CProducts", obj);

    const cityObj = {
      city_name: city,
    };
    const category = await axiosPost("/Category/GetAllCategories", cityObj);

    return {
      props: {
        category: category,
        subcategoryName: subcategoryname,
        data: response,
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
