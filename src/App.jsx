import Dashboard from "./pages/Dashboard";
import BottomNav from "./components/Navigation/BottomNav";
import Navbar from "./components/DashboardCards/Navbar";
import { Route, Routes } from "react-router-dom";
import Members from "./pages/Members";

import AddMembers from "./components/members/AddMembers";
import AddPlans from "./components/plans/AddPlans";
import AddTrainer from "./components/trainers/AddTrainer";
import EnquiryForm from "./components/enquiry/EnquiryForm";
import GymMemberDetails from "./components/GymMemberDetails";
import ProfilePage from "./pages/ProfilePage";

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
        <Route element={<EnquiryForm />} path="/add-enquiry" />
        <Route element={<ProfilePage />} path="/users/:userId" />
      </Routes>
      <BottomNav />
    </>
  );
}
