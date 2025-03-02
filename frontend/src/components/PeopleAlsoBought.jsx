import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axiosInstance from "../../lib/axios";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";

const PeopleAlsoBought = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await axiosInstance.get("/product/recommendations");

        setRecommendations(res.data);
      } catch (error) {
        toast.error(error.response.data.message || "An error occurred!");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [loading, setLoading, setRecommendations]);

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold text-emerald-400">
        People also bought
      </h3>
      <div className="mt-6 grid grid-cols-2 grid-flow-row-dense gap-4 sm:grid-cols-3 lg:grid-cols-3">
        {recommendations?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};
export default PeopleAlsoBought;
