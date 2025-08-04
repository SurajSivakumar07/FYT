import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase/supabase";
import axios from "axios";
import { getBrowser, getDeviceType, getOS } from "../utlis/user_information";
import { useUserStore } from "../zustand/store";

import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";

// Replace this with your backend URL

const SignIn = () => {
  const url = import.meta.env.VITE_API_URL;

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

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
        { withCredentials: true }
      );

      useUserStore.getState().setUser(res.data);

      localStorage.setItem("gym_id", res.data.gym_id);

      const getLocation = () =>
        new Promise((resolve) => {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              resolve({
                lat: pos.coords.latitude,
                lon: pos.coords.longitude,
              });
            },
            (err) => {
              console.warn("Location error or permission denied:", err);
              resolve(null);
            }
          );
        });

      const location = await getLocation();
      // Run both session tracking and navigation in parallel
      const user_data = await Promise.all([
        axios.post(
          `${url}/track-session`,
          {
            os: getOS(),
            browser: getBrowser(),
            device_type: getDeviceType(),
            location: null,
          },
          { withCredentials: true }
        ),
        new Promise((resolve) => {
          navigate("/");
          resolve();
        }),
      ]);
      const session_id = user_data[0].data.session_id;

      localStorage.setItem("session_id", session_id);
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check credentials.");
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "24px 24px",
          }}
        ></div>
      </div>

      {/* Elegant geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-px h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
        <div className="absolute top-40 right-16 w-32 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        <div className="absolute bottom-32 left-1/4 w-px h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
        <div className="absolute bottom-20 right-1/3 w-24 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Minimalist logo section */}
          <div className="text-center mb-12">
            <div className="relative inline-block">
              <h1 className="text-5xl font-light tracking-[0.2em] text-white mb-3 relative">
                FYTZI
                <div className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent"></div>
              </h1>
            </div>
          </div>

          {/* Main form with subtle elegance */}
          <div className="relative">
            {/* Subtle border glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/5 to-white/10 p-px">
              <div className="w-full h-full bg-black rounded-2xl"></div>
            </div>

            <div className="relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="space-y-8">
                {/* Refined welcome text */}
                <div className="text-center mb-8">
                  <h2 className="text-xl font-light text-white mb-2 tracking-wide">
                    Welcome Back
                  </h2>
                  <div className="w-8 h-px bg-white/30 mx-auto"></div>
                </div>

                {/* Email field */}
                <div className="space-y-3">
                  <label className="text-gray-300 text-xs font-medium tracking-widest uppercase flex items-center gap-2">
                    Email
                  </label>
                  <div className="relative group">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className={`w-full h-12 px-4 bg-transparent border-b-2 text-white placeholder:text-gray-500 focus:outline-none transition-all duration-500 text-sm font-light tracking-wide ${
                        focusedField === "email"
                          ? "border-white shadow-sm"
                          : "border-gray-700 hover:border-gray-600"
                      }`}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      required
                      disabled={isSubmitting}
                    />
                    <Mail
                      className={`absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
                        focusedField === "email"
                          ? "text-white"
                          : "text-gray-600"
                      }`}
                    />
                  </div>
                </div>

                {/* Password field */}
                <div className="space-y-3">
                  <label className="text-gray-300 text-xs font-medium tracking-widest uppercase flex items-center gap-2">
                    Password
                  </label>
                  <div className="relative group">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className={`w-full h-12 px-4 pr-16 bg-transparent border-b-2 text-white placeholder:text-gray-500 focus:outline-none transition-all duration-500 text-sm font-light tracking-wide ${
                        focusedField === "password"
                          ? "border-white shadow-sm"
                          : "border-gray-700 hover:border-gray-600"
                      }`}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocusedField("password")}
                      onBlur={() => setFocusedField(null)}
                      required
                      disabled={isSubmitting}
                    />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      <button
                        type="button"
                        className="text-gray-600 hover:text-white transition-colors duration-300 p-1"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                      <Lock
                        className={`w-4 h-4 transition-colors duration-300 ${
                          focusedField === "password"
                            ? "text-white"
                            : "text-gray-600"
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Forgot password */}
                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    className="text-gray-400 text-xs font-light hover:text-white transition-colors duration-300 tracking-wide uppercase"
                    onClick={() =>
                      (window.location.href =
                        "https://fytzi.in/forgot-password")
                    }
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className={`w-full h-12 rounded-none border-2 font-light text-sm tracking-widest uppercase transition-all duration-500 relative overflow-hidden group ${
                    isSubmitting
                      ? "border-gray-600 bg-gray-800 text-gray-400 cursor-not-allowed"
                      : "border-white text-white hover:bg-white hover:text-black active:scale-[0.98]"
                  }`}
                  disabled={isSubmitting}
                >
                  <span className="relative flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                        Authenticating
                      </>
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Minimal footer */}
          <div className="text-center mt-12">
            <div className="flex items-center justify-center gap-4 text-gray-600 text-xs font-light tracking-wider">
              <div className="w-8 h-px bg-gray-700"></div>
              <span>FYTZI © 2025</span>
              <div className="w-8 h-px bg-gray-700"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
