import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase/supabase";
import axios from "axios";

// Replace this with your backend URL
const url = import.meta.env.VITE_API_URL;

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        alert(error.message);
        return;
      }

      const userId = data?.user?.id;
      const accessToken = data?.session?.access_token;

      sessionStorage.setItem("access_token", accessToken);

      try {
        const response = await axios.post(`${url}/get-gym-id`, {
          uuid: userId,
        });

        const result = response.data;
        sessionStorage.setItem("gym_id", result.gym_id);

        setLoading(false);
        navigate("/", { state: result });
      } catch (error) {
        console.error("Failed to fetch gym ID:", error);
        setLoading(false);
      }
    } catch (error) {
      console.error("Sign in failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="relative flex h-screen flex-col bg-gradient-to-br from-blue-50 via-white to-white-50 justify-center overflow-hidden"
      style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}
    >
      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-teal-200/30 to-blue-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Main form container */}
      <div className="relative flex flex-col items-center w-full max-w-md mx-auto px-4 py-4">
        {/* Logo */}
        <div className="w-full mb-4 sm:mb-6">
          <div className="flex flex-col items-center justify-center rounded-3xl min-h-[100px] sm:min-h-[120px] relative overflow-hidden">
            <div className="relative z-10 text-center">
              <span className="text-black text-4xl sm:text-5xl font-black tracking-wider drop-shadow-lg">
                FYTZ
              </span>
            </div>
          </div>
        </div>

        {/* Sign In Form */}
        <div className="w-full bg-white/80 rounded-3xl p-4 sm:p-6 border border-white/20">
          <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="space-y-2">
              <label className="text-slate-700 text-sm font-semibold tracking-wide">
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
              <label className="text-slate-700 text-sm font-semibold tracking-wide">
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
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                className="text-blue-600 hover:text-blue-700 text-sm font-semibold transition-colors duration-200"
                onClick={() => console.log("Forgot password clicked")}
              >
                Forgot password?
              </button>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className={`w-full h-12 sm:h-14 rounded-2xl font-bold text-base transition-all duration-300 shadow-lg ${
                isSubmitting
                  ? "bg-slate-400 cursor-not-allowed text-black"
                  : "bg-white text-black hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-3">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
