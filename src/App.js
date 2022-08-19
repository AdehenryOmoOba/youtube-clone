import "./App.css";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import Login from "./pages/Login";

const Container = styled.div`
  display: flex;
`;
const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bgLight};
`;
const Wrapper = styled.div`
  padding: 2.2rem 9.6rem;
  background-color: ${({ theme }) => theme.bg};
  height: 100%;
`;

const getTheme = () => {
  return localStorage.getItem("themeMode") || "light";
};

function App() {
  const [darkMode, setDarkMode] = useState(getTheme());

  useEffect(() => {
    localStorage.setItem("themeMode", darkMode);
  }, [darkMode]);

  return (
    <ThemeProvider theme={darkMode === "dark" ? darkTheme : lightTheme}>
      <Container>
        <Menu setDarkMode={setDarkMode} darkMode={darkMode} />
        <Main>
          <Navbar />
          <Wrapper>
            <Routes path="/">
              <Route index element={<Home />} />
              <Route path="video">
                <Route path=":id" element={<Video />} />
              </Route>
              <Route path="login" element={<Login />} />
            </Routes>
          </Wrapper>
        </Main>
      </Container>
    </ThemeProvider>
  );
}

export default App;
