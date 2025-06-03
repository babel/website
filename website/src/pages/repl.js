import react from "react";
import Layout from "@theme/Layout";

export default function Repl() {
  react.useEffect(() => {
    const script = document.createElement("script");
    script.src = "/repl/index.js";
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <div>
      <Layout noFooter={true}>
        <div id="root">
          <noscript>You need to enable JavaScript to run this app.</noscript>
        </div>
      </Layout>
    </div>
  );
}
