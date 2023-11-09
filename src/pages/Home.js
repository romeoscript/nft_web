import React from "react";
import Navigation from "../components/Navigation";
import About from "../components/sections/About";
import HomeSection from "../components/sections/Home";
import Roadmap from "../components/sections/Roadmap";
import Team from "../components/sections/Team";

import Faq from "../components/sections/Faq";
import ScrollToTop from "../components/ScrollToTop";

import Layout from "../components/Layout";
import Featured from "../components/Featured";


function Home() {
  return (
    <main>
      <Layout>
        <HomeSection />
        <Featured />

        <About />
        <Team />
        <Roadmap />

        <Faq />
        <ScrollToTop />
      </Layout>
    </main>
  );
}

export default Home;
