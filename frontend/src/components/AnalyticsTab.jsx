import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axiosInstance from "../../lib/axios";
import { DollarSign, Package, ShoppingCart, Users, X } from "lucide-react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
const AnalyticsTab = () => {
  const [analyticsData, setAnalyticsData] = useState({
    users: 0,
    Products: 0,
    totalSales: 0,
    totalRevenue: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [dailySalesData, setDailySalesData] = useState([]);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await axiosInstance.get("/analytics");
        setAnalyticsData(response.data.analyticsData);
        setDailySalesData(response.data.dailySalesData);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);
  console.log(dailySalesData);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
          <div className="relative">
            <div className="w-20 h-20 border-emerald-200 border-2 rounded-full" />
            <div className="w-20 h-20 border-emerald-500 border-t-2 animate-spin rounded-full absolute left-0 top-0" />
            <div className="sr-only">Loading</div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        <AnalyticsCard
          title={"Total Users"}
          value={analyticsData.users.toLocaleString()}
          icon={Users}
          color="from-emerald-600 to-teal-900"
        />
        <AnalyticsCard
          title={"Total Products"}
          value={analyticsData.Products.toLocaleString()}
          icon={Package}
          color="from-emerald-600 to-teal-900"
        />
        <AnalyticsCard
          title={"Total Sales"}
          value={`${analyticsData.totalSales.toLocaleString()}`}
          icon={ShoppingCart}
          color="from-emerald-600 to-teal-900"
        />
        <AnalyticsCard
          title={"Total Revenue"}
          value={`$${analyticsData.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          color="from-emerald-600 to-teal-900"
        />
      </div>
      <motion.div
        className="bg-gray-800/60 rounded-lg p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={dailySalesData}>
            <CartesianGrid stroke="#555" strokeDasharray={"3 3"} />
            <XAxis dataKey="date" stroke="#D1D5D8" />
            <YAxis yAxisId={"left"} stroke="#D1D5D8" />
            <YAxis yAxisId={"right"} orientation="right" stroke="#D1D5D8" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId={"left"}
              type={"monotone"}
              dataKey="sales"
              stroke="#10B981"
              activeDot={{ r: 8 }}
              name="Sales"
            />
            <Line
              yAxisId={"right"}
              type={"monotone"}
              dataKey="revenue"
              stroke="#3B82F6"
              activeDot={{ r: 8 }}
              name="Revenue"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};
export default AnalyticsTab;

const AnalyticsCard = ({ title, value, icon: Icon, color }) => (
  <motion.div
    className={`bg-gray-800 rounded-lg p-6 shadow-lg overflow-hidden relative ${color}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex justify-between items-center">
      <div className="z-10">
        <p className="text-emerald-300 text-sm mb-1 font-semibold">{title}</p>
        <h3 className="text-white text-3xl font-bold">{value}</h3>
      </div>
    </div>
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-emerald-900 opacity-30" />
    <div className="absolute -bottom-4 -right-4 text-emerald-800 opacity-50">
      <Icon className="h-32 w-32" />
    </div>
  </motion.div>
);
