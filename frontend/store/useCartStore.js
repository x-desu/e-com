import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

export const useCartStore = create((set, get) => ({
  cart: [],
  coupon: null,
  total: 0,
  subTotal: 0,
  isCouponApplied: false,

  getMyCoupon: async () => {
    try {
      const res = await axiosInstance.get("/coupon");
      set({ coupon: res.data });
    } catch (error) {
      set({ coupon: null });
      toast.error(error.response.data.message || "An error occurred");
    }
  },

  applyCoupon: async (coupon) => {
    try {
      const res = await axiosInstance.post("/coupon/validate", {
        code: coupon,
      });
      set({ coupon: res.data, isCouponApplied: true });
      get().calculateTotals();
    } catch (error) {
      set({ coupon: null });
      toast.error(error.response.data.message || "An error occurred");
    }
  },

  removeCoupon: async () => {
    set({ coupon: null, isCouponApplied: false });
    get().calculateTotals();
    toast.success("Coupon removed");
  },

  getCartItems: async () => {
    try {
      const res = await axiosInstance("/cart");
      set({ cart: res.data });
      get().calculateTotals();
    } catch (error) {
      set({ cart: [] });
      toast.error(error.response.data.message || "An error occurred");
    }
  },
  clearCart: () => set({ cart: [], coupon: null, total: 0, subTotal: 0 }),

  addToCart: async (product) => {
    try {
      await axiosInstance.post("/cart", { productId: product._id });
      toast.success("Product added to cart");

      set((prev) => {
        const existingItem = prev.cart.find((item) => item._id === product._id);
        const newCart = existingItem
          ? prev.cart.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...prev.cart, { ...product, quantity: 1 }];
        return { cart: newCart };
      });
      get().calculateTotals();
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred");
    }
  },

  updateQuantity: async (id, quantity) => {
    if (quantity === 0) {
      await get().removeFromCart(id);
      return;
    }
    await axiosInstance.put(`/cart/${id}`, { quantity });
    set((prev) => ({
      cart: prev.cart.map((item) =>
        item._id === id ? { ...item, quantity } : item
      ),
    }));
    get().calculateTotals();
  },

  calculateTotals: () => {
    const { cart, coupon, isCouponApplied } = get();
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    let total = subtotal;
    if (coupon && coupon.discountPercentage && isCouponApplied) {
      const discount = subtotal * (coupon.discountPercentage / 100);
      total = subtotal - discount;
    }
    set({ subtotal, total });
  },
  removeFromCart: async (id) => {
    await axiosInstance.delete("/cart", { data: { id } });
    set((prev) => ({ cart: prev.cart.filter((item) => item._id !== id) }));
    get().calculateTotals();
  },
}));
