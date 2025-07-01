import React from "react";
import Dashboard from "./pages/Dashboard";
import BottomNav from "./components/Navigation/BottomNav";
import TopTabNav from "./components/Navigation/TopTabNav";
import Navbar from "./components/DashboardCards/Navbar";
import { Route, Routes } from "react-router-dom";
import Members from "./pages/Members";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<Dashboard />} path="/" />
        <Route element={<Members />} path="/members" />
      </Routes>
      <BottomNav />
    </>
  );
}
