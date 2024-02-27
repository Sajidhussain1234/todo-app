import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import TodoUI from "./components/TodoUI";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import TodoList from "./components/TodoList";
import { useSelector } from "react-redux";

// Custom Route component for authentication
const ProtectedRoute = ({ element, ...props }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/login" replace state={{ from: props.location }} />
  );
};

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<TodoUI />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* Private Routes */}
        <Route
          path="/home"
          element={<ProtectedRoute element={<TodoList />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
