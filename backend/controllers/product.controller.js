import cloudinary from "../lib/cloudinary.js";
import { redis } from "../lib/redis.js";
import Product from "../models/product.model.js";

export const getallproducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    if (!products) {
      return res.status(404).json({ message: "No products found" });
    }
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const getFeaturedProducts = async (req, res, next) => {
  try {
    //redis
    let featuredProducts = await redis.get("featured_products");
    if (featuredProducts) {
      return res.status(200).json(JSON.parse(featuredProducts));
    }
    featuredProducts = await Product.find({ isFeatured: true });
    if (!featuredProducts) {
      return res.status(404).json({ message: "No featured products found" });
    }
    //redis
    await redis.set("featured_products", JSON.stringify(featuredProducts));
    res.status(200).json(featuredProducts);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, images, category, stock } = req.body;
    if (!images) {
      return res.status(400).json({ message: "Images are required" });
    }
    const uploadedImages = await Promise.all(
      images.map(async (image) => {
        const result = await cloudinary.uploader.upload(image, {
          use_filename: true,
          unique_filename: false,
          folder: "products",
        });
        return result.secure_url || result.url || "";
      })
    );
    const product = await Product.create({
      name,
      description,
      price,
      images: uploadedImages,
      category,
      stock,
    });
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const { name, description, price, images, category, stock } = req.body;
    if (images) {
      const publicIds = product.images.map(
        (image) => image.split("/").pop().split(".")[0]
      );
      await Promise.all(
        publicIds.map(async (publicId) => {
          await cloudinary.uploader.destroy(`products/${publicId}`);
        })
      );
      const uploadedImages = await Promise.all(
        images.map(async (image) => {
          const result = await cloudinary.uploader.upload(image, {
            use_filename: true,
            unique_filename: false,
            folder: "products",
          });
          return result.secure_url || result.url || "";
        })
      );
      product.images = uploadedImages;
    }
    product.name = name;
    product.description = description;
    product.price = price;
    product.category = category;
    product.stock = stock;
    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const publicId = product.image.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(`products/${publicId}`);
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const getRecommendedProducts = async (req, res, next) => {
  try {
    const products = await Product.aggregate([
      {
        $sample: { size: 3 },
      },
      {
        $project: {
          name: 1,
          description: 1,
          price: 1,
          images: 1,
        },
      },
    ]);

    if (!products) {
      return res.status(404).json({ message: "No products found" });
    }
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const getCategoryProducts = async (req, res, next) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category });
    if (!products) {
      return res.status(404).json({ message: "No products found" });
    }
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const toggleFeatureProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    product.isFeatured = !product.isFeatured;
    const updatedProduct = await product.save();
    await updateFeaturedProductsCache();
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

async function updateFeaturedProductsCache() {
  try {
    const featuredProducts = await Product.find({ isFeatured: true });
    await redis.set("featured_products", JSON.stringify(featuredProducts));
  } catch (error) {
    next(error);
  }
}

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
