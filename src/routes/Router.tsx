import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import MainLayout from "../layout.tsx/MainLayout";
import Login from "../pages/Login/Login";
import PrivetRoute from "./PrivetRoute";
import Signup from "../pages/Signup/Signup";

const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<MainLayout />}
          children={
            <>
              <Route path="/" element={<Home></Home>}></Route>
              <Route
                path="/about"
                element={
                  <PrivetRoute>
                    <About />
                  </PrivetRoute>
                }
              />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default Routers;
