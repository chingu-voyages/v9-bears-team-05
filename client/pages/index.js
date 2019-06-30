import Head from "next/head";
import LandingPage from "./LandingPage/LandingPage";
export default function HomePage() {
  return (
    
    <React.Fragment>
      <LandingPage />
      <style global jsx>{`
        body {
          height: 100%;
          margin: 0;
          font-family: "PT Mono", monospace;
          box-sizing: border-box;
          padding: 0;
          border: 0;
          color: #444;
          line-height: 1em;
          font-size: 100%;
          -webkit-tap-highlight-color: rgba(0,0,0,0);
        }
      `}</style>
    </React.Fragment>
  );
}
