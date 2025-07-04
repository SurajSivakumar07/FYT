import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import BottomNav from "./components/Navigation/BottomNav";
import Navbar from "./components/DashboardCards/Navbar";

// Lazy load components for code splitting
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Members = lazy(() => import("./pages/Members"));
const AddMembers = lazy(() => import("./components/members/AddMembers"));
const AddPlans = lazy(() => import("./components/plans/AddPlans"));
const AddTrainer = lazy(() => import("./components/trainers/AddTrainer"));
const EnquiryForm = lazy(() => import("./components/enquiry/EnquiryForm"));
const GymMemberDetails = lazy(() => import("./components/GymMemberDetails"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    <span className="ml-3 text-gray-600">Loading...</span>
  </div>
);

// Error boundary for route errors
class RouteErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Route Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
            <p className="text-gray-600 mb-4">Please refresh the page and try again.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  return (
    <RouteErrorBoundary>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route element={<Dashboard />} path="/" />
            <Route element={<Members />} path="/members" />
            <Route element={<AddMembers />} path="/add-member" />
            <Route element={<AddPlans />} path="/add-plan" />
            <Route element={<AddTrainer />} path="/add-trainer" />
            <Route element={<EnquiryForm />} path="/add-enquiry" />
            <Route element={<ProfilePage />} path="/users/:userId" />
          </Routes>
        </Suspense>
      </main>
      <BottomNav />
    </RouteErrorBoundary>
  );
}
