import React, { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import BottomNav from "./components/Navigation/BottomNav";
import Navbar from "./components/DashboardCards/Navbar";
import SignIn from "./pages/SignIn";
import ProtectedRoute from "./routes/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeliveryLogs from "./components/webhooks/DeliveryLogs";
import { lazyWithPreload } from "./utlis/lazywithPrelaod";
import useSessionTracking from "./hooks/session_tracking/useSectionTracking";

// Lazy load components for code splitting

const Dashboard = lazy(() => import("./pages/Dashboard"));
// const Members = lazy(() => import("./pages/Members"));
// const AddMembers = lazy(() => import("./components/members/AddMembers"));
const AddPlans = lazy(() => import("./components/plans/AddPlans"));
const AddTrainer = lazy(() => import("./components/trainers/AddTrainer"));
// const EnquiryForm = lazy(() => import("./components/enquiry/EnquiryForm"));
// const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const Members = lazyWithPreload(() => import("./pages/Members"));
const ProfilePage = lazyWithPreload(() => import("./pages/ProfilePage"));

// const Trainers = lazy(() => import("./pages/Trainers"));
const Analysis = lazy(() => import("./pages/Analysis"));
// const Plans = lazy(() => import("./pages/Plans"));
// const Enquiries = lazy(() => import("./pages/Enquiries"));

const Trainers = lazyWithPreload(() => import("./pages/Trainers"));
const Plans = lazyWithPreload(() => import("./pages/Plans"));
const Enquiries = lazyWithPreload(() => import("./pages/Enquiries"));
const AddMembers = lazyWithPreload(() =>
  import("./components/members/AddMembers")
);

const EnquiryForm = lazyWithPreload(() =>
  import("./components/enquiry/EnquiryForm")
);

// Loading fallback component
export const PageLoader = () => (
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
  useSessionTracking();
  useEffect(() => {
    Members.preload();

    const preloadOtherPages = () => {
      ProfilePage.preload();
      Trainers.preload(); // /view-trainer
      Plans.preload(); // /view-plans
      Enquiries.preload(); // /enquries
      AddMembers.preload();
      EnquiryForm.preload();
      // optionally
    };

    if ("requestIdleCallback" in window) {
      requestIdleCallback(preloadOtherPages);
    } else {
      setTimeout(preloadOtherPages, 4000); // safe fallback
    }
  }, []);
  return (
    <RouteErrorBoundary>
      {/* Push content below the fixed navbar */}

      {!hideTabBar && <Navbar />}

      <ToastContainer position="top-right" autoClose={3000} />

      {/* <main className="pt-13 pr-2 overflow-y-scroll scrollbar-hide h-[calc(100vh-64px)]"> */}
      <main className="pt-13 overflow-y-scroll overflow-x-hidden w-screen scrollbar-hide h-[calc(100vh-64px)]">
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
              path="view-plans"
              element={
                <ProtectedRoute>
                  <Plans />
                </ProtectedRoute>
              }
            />
            <Route
              path="logs"
              element={
                <ProtectedRoute>
                  <DeliveryLogs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/enquries"
              element={
                <ProtectedRoute>
                  <Enquiries />
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
