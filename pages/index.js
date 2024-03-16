import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import useUserData from '@/component/verifyEmail'; // Import the useUserData hook
import { useEffect,useState } from "react";
const inter = Inter({ subsets: ["latin"] });

export default function Home({ city }) {
  const { data: session } = useSession();
  const { isLoggedIn, loading } = useUserData(session);
  useEffect(()=>{
   console.log("user is logged in",isLoggedIn)
  },[isLoggedIn])

  return (
    <>
     <NextSeo
        title="Home | Ribbons and Balloons"
        description="Online Cakes Shop in Mumbai, Pune and Mangalore . Online Cakes Delivery . Buy,Order &amp; Send Birthday, Wedding Anniversary &amp; Chocolate Cakes anywhere in Mumbai from best Cake Shop Ribbons &amp; Balloons."
        openGraph={{
          title:"Home | Ribbons and Balloons",
          description:"Online Cakes Shop in Mumbai, Pune and Mangalore . Online Cakes Delivery . Buy,Order &amp; Send Birthday, Wedding Anniversary &amp; Chocolate Cakes anywhere in Mumbai from best Cake Shop Ribbons &amp; Balloons.",
          images: [
            {
              // url: data[0].yoast_head_json.og_image[0].url,
              height: 1200,
              width: 600,
              alt: "Alt",
            },
          ],
        }}
      />
      <main className={`${styles.main} ${inter.className}`}>{city}</main>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const city = context.query.city;
    if (city) {
      return {
        redirect: {
          destination: `/${city}`,
          permanent: false,
        },
      };
    } else {
      return {
        redirect: {
          destination: "/mumbai",
          permanent: false,
        },
      };
    }
  } catch (error) {
    console.error("Error fetching category data:", error);
    return {
      props: {
        city: null,
      },
    };
  }
}
