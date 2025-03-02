import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export const getCartItems = async (req, res, next) => {
  try {
    const products = await Product.find({ _id: { $in: req.user.cartItems } });

    // add quantity for each product
    const cartItems = products.map((product) => {
      const item = req.user.cartItems.find(
        (cartItem) => cartItem.id === product.id
      );
      return { ...product.toJSON(), quantity: item.quantity };
    });
    res.status(200).json(cartItems);
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const user = req.user;
    const existingItem = user.cartItems.find((item) => item.id === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cartItems.push(productId);
    }
    await user.save();
    res.status(200).json(user.cartItems);
  } catch (error) {
    next(error);
  }
};

export const removeAllFromCart = async (req, res, next) => {
  const { id } = req.body;

  try {
    const user = req.user;
    if (id) {
      user.cartItems = user.cartItems.filter((item) => item.id !== id);
    } else {
      user.cartItems = [];
    }
    await user.save();
    res.status(200).json(user.cartItems);
  } catch (error) {
    next(error);
  }
};

export const updateQuantity = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const user = req.user;
    const cartItem = user.cartItems.find((item) => item.id == id);
    if (cartItem) {
      if (quantity === 0) {
        user.cartItems = user.cartItems.filter((item) => item.id !== id);
      } else {
        cartItem.quantity = quantity;
      }
    }

    await user.save();
    res.status(200).json(user.cartItems);
  } catch (error) {
    next(error);
  }
};
