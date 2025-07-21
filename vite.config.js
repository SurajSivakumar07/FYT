import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0", // optional, useful if you're testing on mobile or over network
    port: 5173, // your dev port
    strictPort: true,
    allowedHosts: [
      "0b6742e40bc7.ngrok-free.app", // ✅ Replace with your current ngrok frontend URL
    ],
  },
});
