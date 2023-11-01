import GlobalStyles from "./styles/GlobalStyles";
import { light } from "./styles/Themes";
import { ThemeProvider } from "styled-components";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./index.css";
import Detail from "./pages/Detail";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// import { lazy, Suspense } from "react";
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <GlobalStyles />
        <ThemeProvider theme={light}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Nft/:id" element={<Detail />} />
          </Routes>
        </ThemeProvider>
      </main>
    </QueryClientProvider>
  );
}

export default App;
