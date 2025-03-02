import { Link, useNavigate } from "react-router";
import {
  ShoppingCart,
  Lock,
  LogOut,
  UserPlus,
  LogIn,
  Menu,
  X,
} from "lucide-react";
import { useUserStore } from "../../store/useUserSore";
import { useCartStore } from "../../store/useCartStore";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const { cart } = useCartStore();
  const navigate = useNavigate();
  const admin = user?.role === "admin";
  const [isOpen, setIsOpen] = useState(false);

  const viewNavigate = (newRoute) => {
    if (!document.startViewTransition) {
      return navigate(newRoute);
    } else {
      return document.startViewTransition(() => {
        navigate(newRoute);
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 border-b border-emerald-800">
      <div className="px-4 py-3 container mx-auto flex justify-between items-center">
        {/* Logo */}
        <button
          onClick={() => viewNavigate("/")}
          className="cursor-pointer text-2xl font-bold text-emerald-400 flex items-center"
        >
          E-Commerce
        </button>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Nav Links */}
        <nav
          className={`lg:flex items-center gap-4 ${
            isOpen ? "block" : "hidden"
          } lg:block absolute lg:relative top-16 lg:top-0 left-0 w-full lg:w-auto bg-gray-900 lg:bg-transparent p-4 lg:p-0 shadow-lg lg:shadow-none transition-all`}
        >
          <button
            className="text-gray-300 hover:text-emerald-400"
            onClick={() => viewNavigate("/")}
          >
            Home
          </button>
          {user && (
            <Link
              className="flex gap-1 items-center relative group text-gray-300 hover:text-emerald-400"
              to="/cart"
            >
              <ShoppingCart size={28} />
              <span className="hidden sm:inline">Cart</span>
              {cart.length > 0 && (
                <span className="absolute -top-2 -left-2 bg-emerald-500 text-white rounded-full px-2 py-0.5 text-xs">
                  {cart.length}
                </span>
              )}
            </Link>
          )}
          {admin && (
            <Link
              className="bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1 rounded-md font-medium flex items-center"
              to="/secret-dashboard"
            >
              <Lock className="mr-1" size={18} />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
          )}
          {user ? (
            <button
              onClick={logout}
              className="flex gap-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline ml-2">Logout</span>
            </button>
          ) : (
            <>
              <Link
                className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md flex items-center"
                to="/signup"
              >
                <UserPlus className="mr-2" size={18} />
                Sign up
              </Link>
              <Link
                className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center"
                to="/login"
              >
                <LogIn className="mr-2" size={18} />
                Login
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
