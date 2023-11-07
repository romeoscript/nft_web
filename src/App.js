import GlobalStyles from "./styles/GlobalStyles";
import { light } from "./styles/Themes";
import { ThemeProvider } from "styled-components";
import { Route, Routes , Navigate} from "react-router-dom";
import Home from "./pages/Home";
import "./index.css";
import Detail from "./pages/Detail";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Create from "./pages/Create";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Mynfts from "./pages/Mynfts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// import { lazy, Suspense } from "react";
const queryClient = new QueryClient();
console.log('alright');
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  console.log('mea',token);
  return token ? children : <Navigate to="/login" replace />;
};
function App() {
  return (
    <>
      <ToastContainer />
      <QueryClientProvider client={queryClient}>
        <main>
          <GlobalStyles />
          <ThemeProvider theme={light}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/nft/:tokenId" element={<Detail />} />
              <Route path="/mynft" element={<Mynfts />} />
              <Route
                path="/create"
                element={
                  <ProtectedRoute>
                    <Create />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </ThemeProvider>
        </main>
      </QueryClientProvider>
    </>
  );
}

export default App;
