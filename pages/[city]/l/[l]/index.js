import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import CategoryComponent from "../../../../component/CategoryandSubcategory";
import useUserData from "@/component/verifyEmail";
import { axiosGet, axiosPost, axiosGetAll } from "@/api";
import { useState,useEffect } from "react";
import { useSession } from "next-auth/react";
function CategoryPage({ data, category }) {
  const router = useRouter();
  const { l, subcategory } = router.query;
  const [hitAPi,setHitApi] = useState(false)
  const { isLoggedIn, loading } = useUserData(hitAPi);
  const { data:session, status } = useSession();

  useEffect(()=>{
    if(session && session.user){
      console.log(session)
        setHitApi(true)
    }
  },[session])
  return (
    <>
    
    <Head>
      {/* <meta charset="utf-8"></meta>
      <title>Online Cake Delivery in Mumbai, Pune and Mangalore</title>
      <meta name="description" content="Online Cakes Shop in Mumbai, Pune and Mangalore . Online Cakes Delivery . Buy,Order &amp; Send Birthday, Wedding Anniversary &amp; Chocolate Cakes anywhere in Mumbai from best Cake Shop Ribbons &amp; Balloons."></meta>
      <meta name="keywords" content="Ribbons and Balloons, Buy Cakes Online, Online Cake delivery, Cakes Mumbai, Cakes to Mumbai, order cakes online, cake delivery in mumbai, Send Cakes to Mumbai, Mumbai Cake Shop, Online Cakes to Mumbai, Cakes Mumbai, Cake delivery to Mumbai, Chocolate Cakes Mumbai, Heart Shape Cakes, Eggless Cakes, Occasion Cakes, birthday cakes online delivery, Send Birthday Cakes, Congratulations Cakes, Missing You Cakes, Baby and Kids Cakes, Anniversary Cakes Online, Thank You Cakes, House Warming Cakes, Wedding Cakes Mumbai, customised cakes in mumbai, cup cakes mumbai, Online Cakes Shop Mumbai, valentine special cakes mumbai, plum cakes mumbai, fresh fruit cakes online"></meta>
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"></meta>
      <link rel="icon" href="https://ribbonsandballoons.com/frontassets/images/fav.png" type="image/x-icon" />
      <meta name="google-site-verification" content="hj44_Ud2995b4jkL3My7hTX96_sALd3yQ7tlf0El0IE"></meta>
      <meta name="p:domain_verify" content="e35c0804c87b42f9187c00fa30ff64f9"></meta>
      <meta name="facebook-domain-verification" content="1cpqqtudq8imtqkiwxpq0vd20x3b69"></meta> */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha2/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha2/dist/js/bootstrap.bundle.min.js"></script>

        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
      </Head>
      
      <CategoryComponent
      category={category}
      subcategoryName={subcategory}
      data={data}
      categoryName={l}
    />
    </>
    
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
