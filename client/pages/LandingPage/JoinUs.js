import Head from "next/head";
import { Fragment } from "react";
function JoinUs() {
  return (
    <Fragment>
      <div className="section">
        <h3 className="title">Getting Started</h3>
        <p className="subTitle">
          <em># Aphrodite</em>
        </p>
        <p className="story">Join us now to experience our network for free</p>
        <a className="getStartedLink" href="#">
          <button type="submit" className="buttonGetStarted button">
            Get Started
          </button>
        </a>
      </div>

      <style jsx>{`
        .buttonGetStarted {
          padding: 9px 22px;
          cursor: pointer;
          border: none;
          -webkit-appearance: none;
          border-radius: 0px;
          font-family: "PT Mono", monospace;
        }

        .getStartedLink:focus {
            outline: 0;
          }

        .getStartedLink:hover {
          text-decoration: underline;
          color: #fff;
        }
      `}</style>

      <style global jsx>{`
        .button {
          display: block;
          margin: 0 auto;
          border: 0;
          outline: none;
          border-radius: 0;
          padding: 15px 0;
          font-size: 1.2em;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          background: #1ab188;
          color: #ffffff;
          -webkit-transition: all 0.5s ease;
          transition: all 0.5s ease;
          -webkit-appearance: none;
        }
      `}</style>
    </Fragment>
  );
}

export default JoinUs;
