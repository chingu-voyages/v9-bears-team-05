import Head from "next/head";
import { Fragment } from "react";
function Footer() {
  return (
    <Fragment>
      <footer className="footer">
        <a href="#home" className="button buttonToTop">
          <i class="fa fa-arrow-up w3-margin-right" />
          To the top
        </a>
        <div class="w3-xlarge w3-section">
          <i class="fa fa-facebook-official w3-hover-opacity" />
          <i class="fa fa-instagram w3-hover-opacity" />
          <i class="fa fa-snapchat w3-hover-opacity" />
          <i class="fa fa-pinterest-p w3-hover-opacity" />
          <i class="fa fa-twitter w3-hover-opacity" />
          <i class="fa fa-linkedin w3-hover-opacity" />
        </div>
      </footer>

      <style jsx>{`
        .footer {
          color: #fff !important;
          background-color: #000 !important;
          padding-top: 64px !important;
          padding-bottom: 64px !important;
          text-align: center !important;
          opacity: 0.6;
        }

        .footer:hover {
          opacity: 1;
        }
        .buttonToTop {
          display: inline-block;
          color: #000 !important;
          background-color: #f1f1f1 !important;
          padding: 8px 16px;
          font-weight: 400;
          text-transform: initial;
        }
      `}</style>
    </Fragment>
  );
}

export default Footer;
