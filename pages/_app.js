import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import ReactModal from "react-modal";
import Nav from "../component/nav";
if (typeof window !== "undefined") {
  ReactModal.setAppElement("#__next");
}
export default function App({ Component, pageProps }) {
  return (
    <SessionProvider>
      <Nav></Nav>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
