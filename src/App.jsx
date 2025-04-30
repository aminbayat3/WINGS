import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { selectThemeKey } from "./store/theme/theme.selector";

import HomePage from "./routes/HomePage";
import Navigation from "./routes/navigation/Navigation.component";
import PlayView from "./routes/PlayView";

import { ThemeProvider } from "@mui/material";
import { THEME_DATA } from "./constants/theme-names.constant";

import ModalHost from "./components/modal-system/ModalHost";

const App = () => {
  const themeKey = useSelector(selectThemeKey);

  return (
    <ThemeProvider theme={THEME_DATA[themeKey].value}>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<HomePage />}></Route>
        </Route>
        <Route path="/play" element={<PlayView />}></Route>
      </Routes>
      <ModalHost />
    </ThemeProvider>
  );
};

export default App;
