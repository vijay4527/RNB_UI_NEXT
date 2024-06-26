import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import ReactModal from "react-modal";
import Nav from "../component/nav";
import Footer from "../component/Footer";
import LoginModal from '@/component/loginModal';
import React from 'react';
import { DefaultSeo } from 'next-seo';
import SEOConfig from '../next-seo.config';
import { useSession } from "next-auth/react";
import useUserData from '@/component/verifyEmail'; // Import the useUserData hook
import { useState,useEffect } from "react";

if (typeof window !== "undefined") {
  ReactModal.setAppElement("#__next");
}
export default function App({ Component, pageProps,session }) {
  const [isLoginModalOpen, setLoginModalOpen] = React.useState(false);
  const [apiResponse, setApiResponse] = useState(null);

  // const [data,status] = useSession()
  // const { isLoggedIn, loading } = useUserData(session);

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };
  
  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };
  return (
    <SessionProvider session={session}>
      <DefaultSeo {...SEOConfig} />
      <Nav></Nav>
      <Component {...pageProps}/>
      <Footer></Footer>
      {/* <LoginModal isOpen={isLoginModalOpen} onRequestClose={closeLoginModal} closeLoginModal={closeLoginModal} /> */}
    </SessionProvider>
  );
}
