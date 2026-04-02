const { useRouter } = require("next/router");
const { useEffect, useState } = require("react");
require("../styles/globals.css");

function MyApp({ Component, pageProps }) {
  const [history, setHistory] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setHistory((h) => [h[h.length - 1], router.pathname]);
  }, [router]);

  return <Component history={history} pageProps={pageProps} />;
}

module.exports = MyApp;
