import Head from "next/head";
import { Container } from "reactstrap";
import { Fragment } from "react";
const Layout = props => (
  <Fragment>
    <Head>
      <title>Aphrodite</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css"
      />
    </Head>
    <Container fluid style={{padding: 0}}>
      {props.children}
    </Container>

    <style jsx>{`
      .containerFluid {
        padding: 0 !important;
      }
    `}</style>
  </Fragment>
);

export default Layout;
