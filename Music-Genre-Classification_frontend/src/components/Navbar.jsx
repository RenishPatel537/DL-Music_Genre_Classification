import { Link, useLocation } from "react-router-dom";
import { Activity } from "lucide-react";

export default function Navbar() {
  const location = useLocation();

  const links = [
    { name: "Home", path: "/" },
    { name: "Predict", path: "/predict" },
    { name: "Analysis", path: "/analysis" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-900/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center p-1 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all">
            <Activity className="w-full h-full text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Music<span className="text-white">Gener</span>
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                location.pathname === link.path
                  ? "bg-purple-500/10 text-purple-400"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
