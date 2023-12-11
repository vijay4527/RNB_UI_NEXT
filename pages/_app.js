import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import ReactModal from "react-modal";
import Nav from "../component/nav";
import Footer from "../component/Footer";
if (typeof window !== "undefined") {
  ReactModal.setAppElement("#__next");
}
export default function App({ Component, pageProps }) {
  return (
    <SessionProvider>
      <Nav></Nav>
      <Component {...pageProps} />
      <Footer></Footer>
    </SessionProvider>
  );
}
