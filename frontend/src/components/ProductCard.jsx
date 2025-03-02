import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import { useUserStore } from "../../store/useUserSore";
import { useCartStore } from "../../store/useCartStore";
import { Link } from "react-router";
const ProductCard = ({ product }) => {
  const { user } = useUserStore();
  const { addToCart } = useCartStore();
  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add products to cart", { id: "login" });
      return;
    } else {
      addToCart(product);
    }
  };

  return (
    <div className="flex w-full relative flex-col overflow-hidden rounded-lg border border-gray-700 shadow-lg">
      <Link
        to={"/category/" + product.category + "/product/" + product._id}
        state={product}
        className="cursor-pointer"
      >
        <div className="relative flex h-60 overflow-hidden rounded-t-xl">
          <img
            className="object-cover w-full"
            src={product.images[0]}
            alt={product.name}
          />
          <div className="absolute inset-0 bg-black opacity-20" />
        </div>
      </Link>
      <div className="mt-4 px-5 pb-5">
        <h5 className="text-xl font-semibold tracking-tight text-white">
          {product.name}
        </h5>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-emerald-400">
              ₹{product.price}
            </span>
          </p>
        </div>
        <button
          className="flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-center text-sm font-medium
        text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300"
          onClick={handleAddToCart}
        >
          <ShoppingCart size={22} className="mr-2" />
          Add to cart
        </button>
      </div>
    </div>
  );
};
export default ProductCard;
