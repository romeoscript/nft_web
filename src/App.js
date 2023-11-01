import GlobalStyles from "./styles/GlobalStyles";
import { light } from "./styles/Themes";
import { ThemeProvider } from "styled-components";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import './index.css'
import Detail from "./pages/Detail";

// import { lazy, Suspense } from "react";

function App() {
  return (
    <main>
      <GlobalStyles />
      <ThemeProvider theme={light}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Nft/:id" element={<Detail />} />
        </Routes>
      </ThemeProvider>
    </main>
  );
}

export default App;
