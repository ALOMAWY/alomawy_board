import "./App.css";
import "normalize.css";
import Landing from "./components/Landing";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { useEffect, useRef, useState } from "react";
import Services from "./components/Services";
import styled from "styled-components";
import Paths from "./components/MyPath";
import { getItemFromLocalStorage } from "./utils/localStorage";
import Contact_Us from "./components/Contact_Us";
import Socials from "./components/Socials";
import About_Us from "./components/About_Us";
import Dashboard from "./components/Dashboard";
import AdminForm from "./components/AdminForm";
import { useDispatch, useSelector } from "react-redux";
import { handleChangeTheme } from "./utils";
import Portfolio from "./components/Portfolio";

function App() {
  const [headerSize, setHeaderSize] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  // Test
  const user = useSelector(
    (state: { admin: { user: true | null } }) => state.admin.user
  );
  // Test--

  const [inMobileSize, setIsInMobileSize] = useState(window.innerWidth < 992);

  const headerRef = useRef<HTMLDivElement>(null);

  const Holder = styled.div`
    min-height: ${!inMobileSize ? `calc(100vh - ${headerSize.height}px)` : ""};
    height: ${!inMobileSize ? `calc(100vh - ${headerSize.height}px)` : ""};
  `;

  useEffect(() => {
    if (headerRef.current) {
      const { width, height } = headerRef.current.getBoundingClientRect();

      setHeaderSize({ width, height });
    }

    const currentLang = getItemFromLocalStorage("lang", "null");

    if (currentLang == "ar") {
      document.body.style.fontFamily = `Alexandria, sans-serif`;
      document.body.style.direction = `rtl`;
    } else {
      document.body.style.fontFamily = `"Anta", sans-serif`;
      document.body.style.direction = `ltr`;
    }

    const currentColor = getItemFromLocalStorage("theme-color", "blue");

    handleChangeTheme(currentColor);
  }, []);

  return (
    <>
      <BrowserRouter>
        <Menu />

        <div className="container">
          <div ref={headerRef}>
            <Header />
            <Paths />
          </div>
          <Routes>
            <Route
              path="/"
              element={
                <Holder>
                  <Landing />
                </Holder>
              }
            />
            <Route
              path="/services"
              element={
                <Holder>
                  <Services />
                </Holder>
              }
            />
            <Route
              path="/portfolio"
              element={
                <Holder>
                  <Portfolio />
                </Holder>
              }
            />

            <Route
              path="/contact_us"
              element={
                <Holder>
                  <Contact_Us />
                </Holder>
              }
            />
            <Route
              path="/about_us"
              element={
                <Holder>
                  <About_Us />
                </Holder>
              }
            />
            <Route
              path="/social_media"
              element={
                <Holder>
                  <Socials />
                </Holder>
              }
            />
            <Route
              path="/dash"
              element={<Holder>{user ? <Dashboard /> : <Dashboard />}</Holder>}
            />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
