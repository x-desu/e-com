import { useEffect, useState } from "react";
import { useProductStore } from "../../store/useProductStore";
import { motion } from "framer-motion";
import { Loader, PlusCircle, Upload, X } from "lucide-react";
import { useParams } from "react-router";
const categories = [
  "jeans",
  "t-shirts",
  "shoes",
  "glasses",
  "jackets",
  "suits",
  "bags",
];

const EditProduct = () => {
  const { fetchProductById, product, updateProduct, loading, createProduct } =
    useProductStore();
  const { id } = useParams();

  useEffect(() => {
    fetchProductById(id);
  }, [fetchProductById, id]);

  useEffect(() => {
    if (product) {
      setNewProduct({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        category: product.category || "",
        stock: product.stock || "",
        images: product?.images?.length ? [...product.images] : [],
      });
    }
  }, [product]);

  const [newProduct, setNewProduct] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || "",
    category: product?.category || "",
    stock: product?.stock || "",
    images: product?.images?.length ? [...product.images] : [],
  });
  console.log(newProduct);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    processFile(files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    processFile(files);
  };

  const processFile = (files) => {
    const validImages = files.filter((file) => file.type.startsWith("image/"));
    const readers = validImages.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((images) => {
      setNewProduct((prev) => ({
        ...prev,
        images: [...prev.images, ...images],
      }));
    });
  };
  const removeImage = (index) => {
    setNewProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(product?._id, newProduct);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        images: "",
      });
    } catch {
      console.log("error creating a product");
    }
  };
  return (
    <motion.div
      className="bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-emerald-300">
        Update Product
      </h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <label
            className="text-sm block font-medium text-gray-300"
            htmlFor="name"
          >
            Product Name
          </label>
          <input
            type="text"
            id="name"
            required
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="w-full border-gray-600 border rounded-md py-2 px-3 mt-1 block text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <div>
          <label
            className="text-sm block font-medium text-gray-300"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            type="text"
            id="description"
            required
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            className="w-full border-gray-600 border rounded-md py-2 px-3 mt-1 block text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <div>
          <label
            className="text-sm block font-medium text-gray-300"
            htmlFor="stock"
          >
            Stock
          </label>
          <input
            type="number"
            id="stock"
            required
            value={newProduct.stock}
            step="1"
            onChange={(e) =>
              setNewProduct({ ...newProduct, stock: e.target.value })
            }
            className="w-full border-gray-600 border rounded-md py-2 px-3 mt-1 block text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <div>
          <label
            className="text-sm block font-medium text-gray-300"
            htmlFor="price"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            required
            value={newProduct.price}
            step="0.01"
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            className="w-full border-gray-600 border rounded-md py-2 px-3 mt-1 block text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <div>
          <label
            className="text-sm block font-medium text-gray-300"
            htmlFor="category"
          >
            Category
          </label>
          <select
            id="category"
            required
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
            className="w-full border-gray-600 border rounded-md py-2 px-3 mt-1 block text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option className="bg-gray-700" value={""}>
              Select a category
            </option>
            {categories.map((cat) => (
              <option className="bg-gray-700" value={cat} key={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="file"
            id="image"
            className="sr-only"
            required
            accept="image/*"
            onChange={handleImageChange}
            step="0.01"
          />
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="border-2 border-dashed border-gray-400 rounded-lg p-1 text-center w-80 h-60 flex flex-col items-center justify-center cursor-pointer"
          >
            {newProduct.images.length > 0 ? (
              <div className="grid grid-cols-3 gap-2">
                {newProduct.images.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={img}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    <X
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-emerald-500 text-white p-1 rounded-full cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            ) : newProduct.image ? (
              <img
                src={newProduct.image}
                className="w-24 h-24 object-cover rounded-md"
              />
            ) : (
              <p className="text-gray-500">Drag & Drop or Upload Images</p>
            )}
          </div>
          <label
            className="cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600 focus:outline-none
            focus:ring-2 focus:ring-offset-0 focus:ring-emerald-500
            "
            htmlFor="image"
          >
            <Upload className="h-5 w-5 inline-block mr-2" />
            Upload image
          </label>
          {/* {newProduct.image && (
            <span className="ml-3 text-sm text-gray-400">
              {newProduct.image}
            </span>
          )} */}
        </div>
        <button
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md bg-emerald-600 hover:bg-emerald-700 shadow-md text-sm font-medium
        text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
          disabled={loading}
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
              <PlusCircle className="mr-2 h-5 w-5" />
              Update Product
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};
export default EditProduct;
