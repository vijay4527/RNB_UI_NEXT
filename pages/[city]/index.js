import React from "react";
import { getCookie, setCookie, removeCookie } from "@/cookieUtils";
import Container from 'react-bootstrap/Container';
import Head from "next/head";
const Index = ({ city }) => {
  return (
    <>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha2/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha2/dist/js/bootstrap.bundle.min.js"></script>
      </Head>
      
      <div className="banner-wrap">
        <Container>
          <div className="banner-body">
            <div className="banner-sec1">
                <div className="banner-img">
                  <img src="http://127.0.0.1:5501/Albama/cake-img2.jpg" />
                </div>
                <div className="banner-img">
                  <img src="http://127.0.0.1:5501/Albama/cake-img2.jpg" />
                </div>
            </div>
            <div className="banner-sec1">
                <div className="banner-img">
                  <img src="http://127.0.0.1:5501/Albama/cake-img2.jpg" />
                </div>
            </div>
            <div className="banner-sec1">
                <div className="banner-img">
                  <img src="http://127.0.0.1:5501/Albama/cake-img2.jpg" />
                </div>
                <div className="banner-img">
                  <img src="http://127.0.0.1:5501/Albama/cake-img2.jpg" />
                </div>
            </div>
          </div>
        </Container>
      </div>
    </>
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
