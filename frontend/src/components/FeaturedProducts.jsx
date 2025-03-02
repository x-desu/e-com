import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { useCartStore } from "../../store/useCartStore";

const FeaturedProducts = ({ featuredProducts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const { addToCart } = useCartStore();
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  console.log(featuredProducts);
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % itemsPerPage);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? itemsPerPage - 1 : prevIndex - 1
    );
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold sm:text-6xl text-emerald-400 mb-4 text-center">
          Featured Products
        </h2>
        <div className=" relative">
          <div className="overflow-hidden ">
            <div
              className="flex transition-transform duration-300 ease-in-out "
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / itemsPerPage)
                }%)`,
              }}
            >
              {featuredProducts.map((product) => (
                <div
                  key={product._id}
                  className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 px-2 "
                >
                  <div className="bg-gray-800 bg-opacity-10 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden h-full transition-all duration-300 hover:shadow-xl border border-emerald-500/30">
                    <div className="overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-48 object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2 text-white">
                        {product.name}
                      </h3>
                      <p className="text-emerald-300 font-medium mb-4">
                        ₹{product.price.toFixed(2)}
                      </p>
                      <button
                        onClick={() => addToCart(product)}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 px-4 rounded transition-colors duration-300 
												flex items-center justify-center"
                      >
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className={
              "absolute z-90 -left-2 top-1/2  transform -translate-y-1/2 bg-emerald-600 hover:bg-emerald-500 text-white w-9 h-9  grid place-items-center justify-center font-semibold py-2 px-4 rounded transition-colors duration-300  "
            }
            onClick={prevSlide}
          >
            <ChevronLeft className="w-6 h-6 " />
          </button>
          <button
            className="absolute z-90 -right-2 top-1/2 transform -translate-y-1/2 bg-emerald-600 hover:bg-emerald-500 grid place-items-center justify-center w-9 h-9 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
            onClick={nextSlide}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default FeaturedProducts;
