import Head from "next/head";
import {Fragment} from 'react';

function ParallaxImage() {
  return (
    <Fragment>

      <div className="parallaxImage">
        <div className="titleWrapper">
          <span className="headTitle"><span style={{color: '#1ab188'}}># Aphro</span> dite</span>
        </div>
      </div>
      <style jsx>{`
        .parallaxImage {
          position: relative;
          background-image: url(./static/clothestore2.jpg);
          background-attachment: fixed;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          min-height: 100%;
          opacity: 0.75;
          height: 100vh;
        }
        .titleWrapper {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .headTitle {
          color: #fff !important;
          background-color: #000 !important;
          padding: 12px 24px !important;
          text-align: center !important;
          font-size: 24px !important;
          animation: opac 0.8s;
          letter-spacing: 4px;
        }
      `}</style>
    </Fragment>
  );
}

export default ParallaxImage;
