import Head from "next/head";
import { Fragment } from "react";
import { Container, Row, Col } from "reactstrap";

function AboutUs() {
  return (
    <Fragment>
      <div className="about">
        <div className="section">
          <h3 className="title">ABOUT US</h3>
          <p className="subTitle">
            <em># Aphro<span style={{color: '#1ab188'}}>dite</span></em>
          </p>
          <p className="story">
            We are a group of friends who have the same concern about gender
            equality and desire to together affect this problem in someway.
            Realising that every girl/woman always have trouble in choosing for
            themself a apropiate outfit without taking too much time and that
            effect the way they feel about themself. So, to help them improve
            their confident in their daily life we create this website.
          </p>
        </div>
        <Row>
          <Col className="rowPart" md="6">
            <img
              src="static/basic-describe.png"
              className="image"
              alt="Basic describe"
            />
          </Col>
          <Col className="rowPart" md="6">
            <p>
              <strong>Features we offer: </strong>
              <br />
              <ul>
                <li>Check your closet any time any where.</li>
                <li>Classify your closet.</li>
                <li>Easy to choose your match outfit.</li>
                <li>
                  Share your closet within our network and get to know more
                  about fashion trend.
                </li>
              </ul>
            </p>
            <p>
              # Closet where your closet are organized in the most precise and
              cleverest way to make your life easier.
            </p>
          </Col>
        </Row>
      </div>

      <style jsx>{`
        .about:before {
          content: "";
          display: table;
          clear: both;
        }

        .rowPart {
          padding: 12px 24px !important;
        }
        .image {
          width: 100%;
          opacity: 0.6;
        }

        .image:hover {
          opacity: 1;
        }
      `}</style>
      <style global jsx>{`
        p {
          margin: 0.85em auto;
        }

        .subTitle {
          text-align: center;
        }
        .title {
          text-align: center;
          font-weight: 600;
          font-size: 20px;
          line-height: 1.1em;
          margin-bottom: 8px;
        }
        .section {
          background-color: #d1ebd0;
          padding: 40px 300px 100px;
        }
        .story {
          text-align: center;
        }
      `}</style>
    </Fragment>
  );
}

export default AboutUs;
