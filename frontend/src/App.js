//react router dom
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
//pages and components
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from "./pages/Home";
import Create from "./pages/Create";

//mui imports
import { Container, ThemeProvider, createTheme } from "@mui/material";
import AppBar from "./components/AppBar";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const theme = createTheme();
  const {user} = useAuthContext();

  return (
    <Container sx={{ backgroundColor: "#f4f4f4", padding: 2, borderRadius: 2 }}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AppBar />
          <Routes>
            <Route path="/" element={user ? <Home /> : <Navigate to="/login"/>} />
            <Route path="/create" element={user ? <Create /> : <Navigate to="/login"/>} />
            <Route path="/login" element={!user ? <Login/> : <Navigate to="/"/>} />
            <Route path="/signup" element={!user ? <Signup/> : <Navigate  to="/"/>} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Container>
  );
}

export default App;
