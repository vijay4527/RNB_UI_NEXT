import { Html, Head, Main, NextScript } from "next/document";
import Links from "@/component/Links/link";
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <Links></Links>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
