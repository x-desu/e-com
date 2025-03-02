import { motion } from "framer-motion";
import { ArrowRight, Loader, Lock, LogIn, Mail } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useUserStore } from "../../store/useUserSore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, loading } = useUserStore();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate("/", { replace: true });
    navigate(0);
  };
  return (
    <div className=" h-full w-full flex justify-center items-center py-12 sm:py-6 lg:px-8 flex-col">
      <motion.div
        className="sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl tracking-wider mb-8 text-emerald-400 text-center font-extrabold ">
          Create your account
        </h1>
        <motion.div
          className="sm:mx-auto sm:w-full sm:max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-gray-800 px-4 py-8 sm:px-10 sm:rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  className="block text-sm font-medium text-gray-300"
                  htmlFor="email"
                >
                  Email address
                </label>
                <div className="flex gap-2 items-center bg-gray-600 rounded-md py-1 px-2">
                  <Mail />
                  <input
                    autoComplete="on"
                    className="px-3 focus:outline-none shadow-sm  placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 w-full py-2  bg-gray-700 border-gray-600 rounded-md "
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-300"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="flex gap-2 items-center bg-gray-600 rounded-md py-1 px-2">
                  <Lock />
                  <input
                    className="px-3 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 w-full py-2  bg-gray-700 border-gray-600 rounded-md "
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="******"
                  />
                </div>
              </div>

              <button
                disabled={loading}
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent
                rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600
                hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-emerald-500 transition duration-150 ease-in-out disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader
                      className="mr-2 h-5 w-5 animate-spin"
                      aria-hidden="true"
                    />
                    Loading...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-5 w-5" aria-label="true" />
                    Login
                  </>
                )}
              </button>
            </form>
          </div>
          <p className="text-center mt-8 text-sm text-gray-400">
            Not registered?{" "}
            <Link
              to={"/signup"}
              className="font-medium text-emerald-400 hover:text-emerald-300"
            >
              Sign up here <ArrowRight className="inline h-4 w-4" />
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};
export default LoginPage;
