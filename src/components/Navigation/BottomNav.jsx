import { Home, Search, User, Plus } from "lucide-react"; // or any icons you want
import { NavLink } from "react-router-dom";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-10 bg-white/80 backdrop-blur-md border border-gray-200 shadow-xl rounded-full px-8 py-3">
        <NavLink to="/" className="group">
          <Home className="w-6 h-6 text-gray-500 group-hover:text-black transition-colors" />
        </NavLink>

        {/* Center Add Button */}
        <NavLink
          to="/add"
          className="bg-black text-white p-3 rounded-full shadow-lg flex items-center justify-center -mt-8 border-4 border-white"
        >
          <Plus className="w-6 h-6" />
        </NavLink>

        <NavLink to="/members" className="group relative">
          <User className="w-6 h-6 text-gray-500 group-hover:text-black transition-colors" />
          <span className="absolute -top-2 -right-3 text-[10px] bg-green-500 text-white rounded-full px-1.5 py-0.5 shadow">
            3
          </span>
        </NavLink>
      </div>
    </nav>
  );
}
