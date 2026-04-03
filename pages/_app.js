import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [history, setHistory] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setHistory((h) => [h[h.length - 1], router.pathname]);
  }, [router]);

  return (
    <>
      <Component history={history} {...pageProps} />
      <SpeedInsights />
    </>
  );
}

export default MyApp;
