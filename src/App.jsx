import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { selectThemeKey } from "./store/theme/theme.selector";

import HomePage from "./routes/HomePage";
import Navigation from "./routes/navigation/Navigation.component";

import { ThemeProvider } from "@mui/material";
import { THEME_DATA } from "./constants/theme-names.constant";

const App = () => {
  const themeKey = useSelector(selectThemeKey);

  return (
    <ThemeProvider theme={THEME_DATA[themeKey].value}>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<HomePage />}></Route>
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;
