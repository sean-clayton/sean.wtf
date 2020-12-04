import "@/styles/globals.css";
import Seo from "@/components/Seo";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <Seo />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
