import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../../store/useCartStore";
import { Link } from "react-router-dom";
const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCartStore();

  return (
    <div className="rounded-lg border p-4 shadow-sm border-gray-700 bg-gray-800 md:p-6">
      <div className="space-y-4 flex flex-col sm:flex-row md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
        <Link
          to={"/category/" + item?.category + "/product/" + item?._id}
          state={item}
          className="shrink-0 md:order-1"
        >
          <img
            src={item?.images[0]}
            className="sm:h-20 h-72 w-full md:h-40 sm:w-36 rounded object-cover"
          />
        </Link>
        <label className="sr-only">Choose quantity</label>
        <div className="flex items-center justify-between md:order-3 md:justify-end">
          <div className="flex items-center gap-2">
            <button
              className="inline-flex h-12 w-12  sm:h-5 sm:w-5 shrink-0 items-center justify-center rounded-md border
							 border-gray-600 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2
							  focus:ring-emerald-500"
              onClick={() => updateQuantity(item._id, item.quantity - 1)}
            >
              <Minus className="text-gray-300" />
            </button>
            <p className="sm:text-base text-2xl px-4 font-semibold text-white">
              {item.quantity}
            </p>
            <button
              className="inline-flex h-12 w-12  sm:h-5 sm:w-5 shrink-0 items-center justify-center rounded-md border
							 border-gray-600 bg-gray-700 hover:bg-gray-600 focus:outline-none 
						focus:ring-2 focus:ring-emerald-500"
              onClick={() => updateQuantity(item._id, item.quantity + 1)}
            >
              <Plus className="text-gray-300" />
            </button>
          </div>

          <div className="text-end md:order-4 md:w-32">
            <p className="sm:text-base text-4xl px-4 font-bold text-emerald-400">
              ₹{item.price}
            </p>
          </div>
        </div>
        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
          <p className="sm:text-base text-4xl font-medium text-white hover:text-emerald-400 hover:underline">
            {item.name}
          </p>
          <p className="text-sm text-gray-400">{item.description}</p>

          <div className="flex items-center gap-4">
            <button
              className="inline-flex items-center text-sm font-medium text-red-400
							 hover:text-red-300 hover:underline"
              onClick={() => removeFromCart(item._id)}
            >
              <Trash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartItem;
