import { BarChart, PlusCircle, ShoppingBasket } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CreateProductForm from "../components/CreateProductForm";
import ProductsList from "../components/ProductsList";
import AnalyticsTab from "../components/AnalyticsTab";
import { useProductStore } from "../../store/useProductStore";
const tabs = [
  {
    id: "create",
    label: "Create Product",
    icon: <PlusCircle className="mr-2" size={18} />,
  },
  {
    id: "products",
    label: "Products",
    icon: <ShoppingBasket className="mr-2" size={18} />,
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: <BarChart className="mr-2" size={18} />,
  },
];

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("create");
  const { fetchAllProduct } = useProductStore();

  useEffect(() => {
    fetchAllProduct();
  }, [fetchAllProduct]);
  return (
    <div className="min-h-screen -mt-6  relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.h1
          className="text-4xl font-bold text-center  mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-emerald-400">Admin</span> Dashboard
        </motion.h1>
        <div className=" flex items-center justify-center mb-8 gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-md transition-colors duration-200 ease-in-out  ${
                activeTab === tab.id
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
        {activeTab === "create" && <CreateProductForm />}
        {activeTab === "products" && <ProductsList />}
        {activeTab === "analytics" && <AnalyticsTab />}
      </div>
    </div>
  );
};
export default AdminPage;
