import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";

import Signin from "./Pages/Signin";
import MemberDashboard from "./Pages/Dashboard/MemberDashboard/MemberDashboard";
import Home from "./Pages/Home";
import Allbooks from "./Pages/Allbooks";
import Header from "./Components/Header";
import AdminDashboard from "./Pages/Dashboard/AdminDashboard/AdminDashboard";

import OpenRoute from "./Auth/OpenRoute";
import ForgotPassword from "./Pages/ForgetPassword";
import UpdatePassword from "./Pages/UpdatePassword";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Header />

      <div className="App w-screen min-h-screen bg-richblue-900 flex flex-col font-inter">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/signin"
            element={
              user ? (
                <Navigate
                  to={user.isAdmin ? "/dashboard@admin" : "/dashboard@member"}
                />
              ) : (
                <Signin />
              )
            }
          />
          <Route
            path="/dashboard@member"
            element={
              user && !user.isAdmin ? <MemberDashboard /> : <Navigate to="/" />
            }
          />
          <Route
            path="/dashboard@admin"
            element={
              user && user.isAdmin ? <AdminDashboard /> : <Navigate to="/" />
            }
          />
          <Route path="/books" element={<Allbooks />} />
          <Route
            path="forgot-password"
            element={
              <OpenRoute>
                <ForgotPassword />
              </OpenRoute>
            }
          />

          <Route
            path="update-password/:id"
            element={
              <OpenRoute>
                <UpdatePassword />
              </OpenRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
