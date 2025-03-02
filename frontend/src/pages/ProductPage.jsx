import { useLocation } from "react-router";
import { useCartStore } from "../../store/useCartStore";
import { useUserStore } from "../../store/useUserSore";
import toast from "react-hot-toast";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { useSwipeable } from "react-swipeable";
import CustomCarousel from "../components/Caraousel";
const ProductPage = () => {
  const [activeTab, setActiveTab] = useState("Description");
  const { state: product, pathname } = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const pathnames = pathname.split("/").filter((x) => x);
  const { user } = useUserStore();
  const { addToCart, cart, updateQuantity } = useCartStore();
  const item = cart.find((item) => item._id === product._id);

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add products to cart", { id: "login" });
      return;
    } else {
      addToCart(product);
    }
  };
  return (
    <div>
      <nav className="flex justify-between items-center ml-4">
        <ol className="flex ">
          <li>
            <Link className="text-gray-300 hover:text-emerald-400" to={"/"}>
              Home
              {pathnames.length > 1 && "/"}
            </Link>
          </li>
          <li>
            <Link
              className="text-gray-300 hover:text-emerald-400"
              to={"/category/" + pathnames[1]}
            >
              {pathnames[0] + "/"}
            </Link>
          </li>
        </ol>
      </nav>
      <div
        className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col 
       gap-8"
      >
        <div className="flex flex-col sm:flex-row justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="aspect-square  relative w-96 overflow-hidden rounded-lg shadow-lg"
          >
            {/* <motion.img
              {...handlers}
              className="transition-all duration-150 ease-in-out 
              w-full h-full object-cover object-center"
              transition={{ duration: 0.5 }}
              style={
                zoomed ? { scale: 1.2, transition: "transform 0.3s ease" } : {}
              }
              key={product.images[currentIndex]}
              src={product.images[currentIndex]}
            ></motion.img> */}
            <CustomCarousel images={product.images} />
            <div className="flex justify-center mt-2 space-x-2 absolute bottom-2 left-1/2 -translate-x-1/2">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-emerald-500" : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </motion.div>
          {/* side */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 flex flex-col gap-4"
          >
            <div className="flex flex-1 flex-col gap-4">
              <h2 className="text-3xl font-bold text-gray-300">
                {product.name}
              </h2>
              <div className="flex items-center gap-2 text-gray-300">
                <span className="">reviews</span>
              </div>
              <h2 className="text-2xl font-medium text-gray-300 mt-4">
                ₹{product.price}
              </h2>
            </div>
            <hr className="h-1  w-full text-gray-600 my-16" />
            <div className="flex items-center justify-between">
              {cart && item && cart.length > 0 && (
                <div className="flex items-center gap-4">
                  <button
                    className="inline-flex h-10 w-10 p-1 shrink-0 items-center justify-center rounded-md border
                  border-gray-600 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2
                  focus:ring-emerald-500"
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  >
                    <Minus className="text-gray-300" />
                  </button>
                  <p className="text-gray-300 font-bold text-2xl">
                    {item?.quantity}
                  </p>
                  <button
                    className="inline-flex  h-10 w-10 p-1 shrink-0 items-center justify-center rounded-md border
                  border-gray-600 bg-gray-700 hover:bg-gray-600 focus:outline-none 
                  focus:ring-2 focus:ring-emerald-500"
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  >
                    <Plus className="text-gray-300" />
                  </button>
                </div>
              )}
              <button
                className="flex w-1/2 items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-center text-sm font-medium
              text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300"
                onClick={handleAddToCart}
              >
                <ShoppingCart size={22} className="mr-2" />
                Add to cart
              </button>
            </div>
          </motion.div>
        </div>
        {/* side end */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className=" flex space-x-4 items-center">
            {["Description", "Reviews"].map((tab) => (
              <button
                onClick={() => setActiveTab(tab)}
                className={`py-2 text-xl font-medium ${
                  activeTab === tab
                    ? "text-emerald-400 underline underline-offset-4"
                    : "text-gray-300 opacity-50"
                }`}
                key={tab}
              >
                {tab}
              </button>
            ))}
          </div>
          {activeTab === "Description" && (
            <p className="text-gray-300 text-xl ">{product.description}</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};
export default ProductPage;
