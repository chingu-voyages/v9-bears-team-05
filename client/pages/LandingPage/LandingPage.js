import Head from "next/head";
import NavBar from "./NavBar"
import ParallaxImage from "./ParallaxImage";
import AboutUs from "./AboutUs";
import Layout from "../Layout";
import JoinUs from "./JoinUs";
import Footer from "./Footer"
import {Fragment} from 'react';

function LandingPage() {
  return (
    <Layout>
      <NavBar />
      <ParallaxImage />
      <AboutUs />
      <JoinUs />
      <Footer />

      
      <style jsx>{`
        
      `}</style>
    </Layout>
  );
}

export default LandingPage;
