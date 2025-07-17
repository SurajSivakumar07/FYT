import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase/supabase";
import axios from "axios";

// Replace this with your backend URL

const SignIn = () => {
  const url = import.meta.env.VITE_API_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setLoading(true);

    try {
      const res = await axios.post(
        `${url}/login`,
        { email, password },
        { withCredentials: true } // Required to accept cookies!
      );

      console.log(res);

      localStorage.setItem("gym_id", res.data.gym_id);
      localStorage.setItem("oai-did", res.data.access_token);

      if (res.status === 200) {
        navigate("/");
      } else {
        alert("Unexpected response status");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check credentials.");
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);

  //   try {
  //     console.time("TotalSignInTime");

  //     const { data, error } = await supabase.auth.signInWithPassword({
  //       email: email,
  //       password: password,
  //     });

  //     if (error) {
  //       alert(error.message);
  //       console.timeEnd("TotalSignInTime");
  //       return;
  //     }

  //     const userId = data?.user?.id;
  //     const accessToken = data?.session?.access_token;

  //     sessionStorage.setItem("access_token", accessToken);
  //     console.time("FetchGymId"); // Start timing gym ID fetch

  //     try {
  //       const { data, error } = await supabase
  //         .from("user_profiles")
  //         .select("gym_id")
  //         .eq("id", userId)
  //         .single();

  //       if (error) {
  //         throw error;
  //       }
  //       console.timeEnd("Ending");
  //       sessionStorage.setItem("gym_id", data.gym_id);

  //       console.timeEnd("FetchGymId"); // End gym ID fetch timing
  //       console.timeEnd("TotalSignInTime"); // End total timing
  //       setLoading(false);
  //       navigate("/", { state: data });
  //     } catch (error) {
  //       console.error("Failed to fetch gym ID:", error);
  //       alert(error);
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     console.error("Sign in failed:", error);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  return (
    <div
      className="fixed inset-0 flex flex-col bg-gradient-to-br justify-center items-center overflow-hidden h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{
        fontFamily: 'Lexend, "Noto Sans", sans-serif',
      }}
    >
      {/* Main form container */}
      <div className="relative flex flex-col items-center w-full max-w-md mx-auto px-4 sm:px-6">
        {/* Logo */}
        <div className="w-full mb-6">
          <div className="flex flex-col items-center justify-center rounded-3xl min-h-[120px] sm:min-h-[140px] relative overflow-hidden">
            <div className="w-full mb-6 sm:mb-8">
              <div className="flex flex-col items-center justify-center rounded-3xl py-8 sm:py-12 relative overflow-hidden">
                <div className="relative z-10 text-center">
                  <span className="text-black text-4xl sm:text-5xl md:text-6xl font-black tracking-wider drop-shadow-lg">
                    {/* FYTZ */}DEMO
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sign In Form */}
        <div className="w-full bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-white/20 shadow-xl">
          <div className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-black text-sm font-semibold tracking-wide">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full h-12 sm:h-14 px-4 bg-slate-50/80 border-2 border-slate-200 rounded-2xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 text-base font-medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-black  text-sm font-semibold tracking-wide">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full h-12 sm:h-14 px-4 pr-12 bg-slate-50/80 border-2 border-slate-200 rounded-2xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 text-base font-medium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-300 transition-colors duration-200"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                className="text-black text-sm font-semibold transition-colors duration-200"
                onClick={() =>
                  (window.location.href = "https://fytzi.in/forgot-password")
                }
              >
                Forgot password?
              </button>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className={`w-full h-14 rounded-2xl font-bold text-base transition-all duration-300 shadow-lg ${
                isSubmitting
                  ? "bg-gray-700 cursor-not-allowed text-gray-400"
                  : "bg-gradient-to-r bg-black text-white hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              }`}
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-3">
                  <svg
                    className="animate-spin h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
