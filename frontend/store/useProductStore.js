import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";

export const useProductStore = create((set) => ({
  products: [],
  product: null,
  featuredProducts: [],
  loading: false,
  setProducts: (products) => {
    set({ products });
  },
  createProduct: async (productData) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post("/product", productData);
      set((prev) => ({
        products: [...prev.products, res.data],
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response.data.message || "An error occurred creating products!"
      );
    }
  },
  updateProduct: async (id, productData) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.patch(`/product/${id}`, productData);
      set((prev) => ({
        products: prev.products.map((product) =>
          product._id === id ? res.data : product
        ),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response.data.message || "An error occurred updating product!"
      );
    }
  },
  fetchProductById: async (id) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get(`/product/${id}`);
      set({ product: res.data, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response.data.message || "An error occurred fetching product!"
      );
    }
  },
  fetchAllProduct: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/product");
      set({ products: res.data, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response.data.message || "An error occurred fetching products!"
      );
    }
  },
  fetchProductByCategory: async (category) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get(`/product/category/${category}`);
      set({ products: res.data, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response.data.message || "An error occurred fetching products!"
      );
    }
  },
  deleteProduct: async (id) => {
    set({ loading: true });
    try {
      await axiosInstance.delete(`/product/${id}`);
      set((prev) => ({
        products: prev.products.filter((product) => product._id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response.data.message || "An error occurred deleting product!"
      );
    }
  },
  toggleFeaturedProduct: async (id) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.put(`/product/${id}`);
      set((prevProducts) => ({
        products: prevProducts.products.map((product) =>
          product._id === id
            ? { ...product, isFeatured: res.data.isFeatured }
            : product
        ),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response.data.message || "An error occurred Featuring products!"
      );
    }
  },
  getFeaturedProducts: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/product/featured");
      set({ featuredProducts: res.data, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response.data.message || "An error occurred fetching products!"
      );
    }
  },
}));
