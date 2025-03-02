import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { Routes, Route, Navigate, NavLink, useNavigate } from "react-router";
import Homepage from "./pages/Homepage";
import SignUpPage from "./pages/SignUpPage";
import { useUserStore } from "../store/useUserSore";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import { useCartStore } from "../store/useCartStore";
import { motion } from "framer-motion";
import ProductPage from "./pages/ProductPage";
import EditProduct from "./components/EditProduct";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";
const App = () => {
  const { user, checkAuth, checkingAuth } = useUserStore();
  const { getCartItems } = useCartStore();
  const navigate = useNavigate();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (user) return;
    getCartItems();
  }, [getCartItems, user]);

  if (checkingAuth) return <LoadingSpinner />;
  return (
    <div
      className="min-h-screen bg-gray-900 text-white relative
    overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full
          bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]
          animate-slow-gradient"
          />
        </div>
      </div>
      <div className="relative z-20 pt-20">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/signup"
            element={user ? <Navigate to={"/"} /> : <SignUpPage />}
          />
          <Route path="/login" element={user ? <Homepage /> : <LoginPage />} />
          <Route
            path="/secret-dashboard"
            element={
              user?.role === "admin" ? (
                <AdminPage />
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route
            path="/cart"
            element={user ? <CartPage /> : <NavLink to={"/login"} />}
          />
          <Route
            path="/category/:category/product/:id"
            element={<ProductPage />}
          />
          <Route
            path="edit/product/:id"
            element={
              user?.role === "admin" ? (
                <EditProduct />
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
          <Route
            path="/purchase-success"
            element={user ? <PurchaseSuccessPage /> : <NavLink to={"/login"} />}
          />
          <Route
            path="/purchase-cancel"
            element={user ? <PurchaseCancelPage /> : <NavLink to={"/login"} />}
          />
          <Route
            path="*"
            element={
              <>
                <div className="flex flex-col items-center justify-center h-screen">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="text-9xl font-extrabold text-emerald-400 "
                  >
                    404
                  </motion.h1>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="text-3xl font-semibold mt-4"
                  >
                    Page Not Found
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="text-lg mt-2"
                  >
                    The page you are looking for does not exist.
                  </motion.p>
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-emerald-400 text-white px-4 py-2 rounded-md mt-4
                    hover:bg-emerald-500 transition-colors duration-300
                    ease-in-out"
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    Go Home
                  </motion.button>
                </div>
              </>
            }
          />
        </Routes>
        <Toaster />
      </div>
    </div>
  );
};
export default App;

// export const AnimationWrapper = ({ children }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       transition={{ duration: 0.3 }}
//     >
//       {children}
//     </motion.div>
//   );
// };
