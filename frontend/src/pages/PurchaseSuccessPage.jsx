import { ArrowRight, CheckCircle, HandHeart } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import axiosInstance from "../../lib/axios";
import { useCartStore } from "../../store/useCartStore";
import Confetti from "react-confetti";

const PurchaseSuccessPage = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const hasProcessed = useRef(false);
  const { clearCart } = useCartStore();
  const stableClearCart = useCallback(() => {
    clearCart();
  }, [clearCart]);

  const [error, setError] = useState(null);
  useEffect(() => {
    const handleCheckoutSuccess = async (sessionId) => {
      try {
        if (hasProcessed.current) return;
        hasProcessed.current = true;
        setIsProcessing(true);

        // Check if the session ID was already processed
        const processedSession = localStorage.getItem(`processed_${sessionId}`);
        if (processedSession) {
          console.log("Session already processed.");
          return;
        }

        await axiosInstance.post("/payment/checkout-success", { sessionId });

        // Mark session as processed
        localStorage.setItem(`processed_${sessionId}`, "true");

        stableClearCart();
        setIsProcessing(false);
      } catch (error) {
        console.error(error);
        setError("Error processing payment.");
      } finally {
        setIsProcessing(false);
      }
    };

    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id"
    );

    if (sessionId) {
      handleCheckoutSuccess(sessionId);
    } else {
      setIsProcessing(false);
      setError("Invalid session ID");
    }

    return () => {
      stableClearCart();
    };
  }, [stableClearCart]);

  if (isProcessing) {
    return (
      <div className="h-screen flex items-center justify-center px-4">
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={700}
          recycle={false}
          gravity={0.1}
          style={{ zIndex: 99 }}
        />
        <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-xl overflow-hidden relative z-10">
          <div className="p-6 sm:p-8">
            <div className="flex  justify-center items-center">
              <HandHeart className="h-16 w-16 text-red-500 mb-4" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-red-500 text-center">
              Payment Processing
            </h1>
            <p className="text-gray-300 text-center mb-2">Please wait...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-xl overflow-hidden relative z-10">
          <div className="p-6 sm:p-8">
            <div className="flex  justify-center items-center">
              <HandHeart className="h-16 w-16 text-red-500 mb-4" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-red-500 text-center">
              Payment Error
            </h1>
            <p className="text-gray-300 text-center mb-2">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-xl overflow-hidden relative z-10">
        <div className="p-6 sm:p-8">
          <div className="flex  justify-center items-center">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-emerald-400 text-center">
            Purchase Successful
          </h1>
          <p className="text-gray-300 text-center mb-2">
            Thank you for your Order. We have received your payment and your
            order is being processed.
          </p>
          <p className="text-emerald-400 text-center text-sm mb-6">
            Check your email for order details and updates.
          </p>
          <div className="bg-gray-700 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Order number</span>
              <span className="text-sm font-semibold text-emerald-400">
                #12345
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Estimated delivery</span>
              <span className="text-sm font-semibold text-emerald-400">
                3-5 business days
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <button
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4
             rounded-lg transition duration-300 flex items-center justify-center"
            >
              <HandHeart className="mr-2" size={18} />
              Thanks for trusting us!
            </button>
            <Link
              to={"/"}
              className="w-full bg-gray-700 hover:bg-gray-600 text-emerald-400 font-bold py-2 px-4 
            rounded-lg transition duration-300 flex items-center justify-center"
            >
              Continue Shopping
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PurchaseSuccessPage;
