import React, { useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import BottomNav from "./components/Navigation/BottomNav";
import TopTabNav from "./components/Navigation/TopTabNav";
import Navbar from "./components/DashboardCards/Navbar";
import { Route, Routes } from "react-router-dom";
import Members from "./pages/Members";
import { useTrainers } from "./hooks/useTrainers";
import { usePlans } from "./hooks/usePlans";
import AddMembers from "./components/members/AddMembers";
import AddPlans from "./components/plans/AddPlans";
import AddTrainer from "./components/trainers/AddTrainer";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<Dashboard />} path="/" />
        <Route element={<Members />} path="/members" />
        <Route element={<AddMembers />} path="/add-member" />
        <Route element={<AddPlans />} path="/add-plan" />
        <Route element={<AddTrainer />} path="/add-trainer" />
      </Routes>
      <BottomNav />
    </>
  );
}
