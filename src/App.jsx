import React, { Suspense, lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import BottomNav from "./components/Navigation/BottomNav";
import Navbar from "./components/DashboardCards/Navbar";
import SignIn from "./pages/SignIn";
import ProtectedRoute from "./routes/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PaymentBalanceModal from "./components/payment/PaymentBalanceModal";
// Lazy load components for code splitting
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Members = lazy(() => import("./pages/Members"));
const AddMembers = lazy(() => import("./components/members/AddMembers"));
const AddPlans = lazy(() => import("./components/plans/AddPlans"));
const AddTrainer = lazy(() => import("./components/trainers/AddTrainer"));
const EnquiryForm = lazy(() => import("./components/enquiry/EnquiryForm"));
const GymMemberDetails = lazy(() => import("./components/GymMemberDetails"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const Trainers = lazy(() => import("./pages/Trainers"));
const Analysis = lazy(() => import("./pages/Analysis"));
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
    console.error("Route Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Something went wrong
            </h2>
            <p className="text-gray-600 mb-4">
              Please refresh the page and try again.
            </p>
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
  const location = useLocation();
  const hideTabBar = location.pathname === "/signin";

  return (
    <RouteErrorBoundary>
      {!hideTabBar && <Navbar />}
      <ToastContainer position="top-right" autoClose={3000} />

      <main className=" bg-gray-50 flex flex-col overflow-hidden">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public route */}
            <Route path="/signin" element={<SignIn />} />
            {/* Protected routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/members"
              element={
                <ProtectedRoute>
                  <Members />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-member"
              element={
                <ProtectedRoute>
                  <AddMembers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-plan"
              element={
                <ProtectedRoute>
                  <AddPlans />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-trainer"
              element={
                <ProtectedRoute>
                  <AddTrainer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-enquiry"
              element={
                <ProtectedRoute>
                  <EnquiryForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users/:userId"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/view-trainer"
              element={
                <ProtectedRoute>
                  <Trainers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/view-analysis"
              element={
                <ProtectedRoute>
                  <Analysis />
                </ProtectedRoute>
              }
            />
            <Route
              path="/balance"
              element={
                <ProtectedRoute>
                  <PaymentBalanceModal />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </main>
      {!hideTabBar && <BottomNav />}
    </RouteErrorBoundary>
  );
}
