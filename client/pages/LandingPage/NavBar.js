import Head from "next/head";
import { Fragment } from "react";
function NavBar() {
  return (
    <Fragment>
      <div className="navBarContainer">
        <nav className="navBar">
          <span className="navLeft">
            <a href="#" className="navItem">
              HOME
            </a>
            <a href="#" className="navItem">
              ABOUT
            </a>
          </span>

          <span className="navRight">
            <a href="#" className="navItem">
              SIGN IN
            </a>
            <a href="#" className="navItem">
              SIGN UP
            </a>
          </span>
        </nav>
      </div>

      <style jsx>{`
        .navBarContainer {
          top: 0;
          position: fixed;
          width: 100%;
          z-index: 1;
        }
        .navBar {
          width: 100%;
          overflow: hidden;
          display: flex;
          justify-content: space-between;
        }

        .navItem {
          padding: 8px 16px;
          width: auto;
          border: none;
          outline: none;
          display: inline-block;
          color: inherit;
          background-color: inherit;
          text-align: center;
          cursor: pointer;
        }

        .navItem:hover {
          color: #000 !important;
          background-color: #ccc !important;
        }
      `}</style>
    </Fragment>
  );
}

export default NavBar;
