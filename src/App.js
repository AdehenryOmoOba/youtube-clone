import "./App.css";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";

const Container = styled.div`
  display: flex;
`;
const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bgLight};
`;
const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.bg};
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <Menu setDarkMode={setDarkMode} />
        <Main>
          <Navbar />
          <Wrapper>
            <Routes path="/">
              <Route index element={<Home />} />
              <Route path="video" element={<Video />} />
            </Routes>
          </Wrapper>
        </Main>
      </Container>
    </ThemeProvider>
  );
}

export default App;
