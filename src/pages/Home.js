
import React from "react";
import Navigation from "../components/Navigation";
import About from "../components/sections/About";
import HomeSection from "../components/sections/Home";
import Roadmap from "../components/sections/Roadmap";
import Team from "../components/sections/Team";
import Footer from "../components/Footer";
import Faq from "../components/sections/Faq";
import ScrollToTop from "../components/ScrollToTop";
import CreateInfo from "../components/sections/CreateInfo";

function Home() {
  return (
    <main>
      <Navigation />
      <HomeSection />

      <CreateInfo />
      <About />
      <Roadmap />
      <Team />
      <Faq />
      <Footer />
      <ScrollToTop />
    </main>
  );
}

export default Home;