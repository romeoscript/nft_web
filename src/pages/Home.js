
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
import Navbar from "../components/Navbar";

function Home() {
  const token = localStorage.getItem("token")
  return (
    <main>
      {token?<Navbar />: <Navigation />}
      {/* <Navigation /> */}
      <HomeSection />

      <CreateInfo />
      <About />
      <Team />
      <Roadmap />
     
      <Faq />
      <Footer />
      <ScrollToTop />
    </main>
  );
}

export default Home;
