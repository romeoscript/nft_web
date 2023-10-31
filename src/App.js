import GlobalStyles from "./styles/GlobalStyles";
import { light } from "./styles/Themes";
import { ThemeProvider } from "styled-components";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

// import { lazy, Suspense } from "react";

function App() {
  return (
    <main>
      <GlobalStyles />
      <ThemeProvider theme={light}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </ThemeProvider>
    </main>
  );
}

export default App;
