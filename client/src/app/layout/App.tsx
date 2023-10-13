import Header from "./Header";
import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStoreContext } from "../context/StoreContext";
import { getCookie } from "../util/util";
import agent from "../api/agent";
import Loading from "./Loading";

function App() {
  const { setBasket } = useStoreContext();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const buyerId = getCookie("buyerId");
    if (buyerId) {
      agent.Basket.get()
        .then(basket => { setBasket(basket) })
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    }
  }, [setBasket])
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#fff" : "#121212"
      },
      primary: {
        main: '#EFEFEF',
      },
      secondary: {
        main: '#007247',
      },
      text: {
        primary: paletteType === "light" ? '#121212' : "#fff",
        secondary: paletteType === "light" ? '#0C0C0C' : "#338E6B",
        disabled: '#414141',
      },
      error: {
        main: '#8e0000',
      },
      warning: {
        main: '#cb5d00',
      },
      info: {
        main: '#004671',
      },
      success: {
        main: '#007247',
      },
    },
    typography: {
      fontFamily: 'Poppins',
    },
  })
  function handleThemeChange() {
    setDarkMode(!darkMode);
  }
  if (loading) {
    return <Loading message="App is initilaising..." />
  }
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Box>
        <Outlet />
      </Box>
    </ThemeProvider>
  );
}

export default App;
