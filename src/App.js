import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import TodoUI from "./components/TodoUI";
import TodoList from "./components/TodoList";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<TodoUI />} />
        <Route path="/home" element={<TodoList />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Outlet />
    </BrowserRouter>
  );
}
export default App;
