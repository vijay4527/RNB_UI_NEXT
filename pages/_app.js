import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import ReactModal from "react-modal";

if (typeof window !== "undefined") {
  ReactModal.setAppElement("#__next");
}
export default function App({ Component, pageProps }) {
  return (
    <SessionProvider>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
