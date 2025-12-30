"use client";

import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { removeFromCart, clearCart, updateCartItem } from "@/store/cartSlice";
import {
  X,
  ShoppingCart,
  Trash2,
  Calendar,
  MapPin,
  Clock,
  Package,
  DollarSign,
} from "lucide-react";
import CheckoutModal from "@/components/checkout/CheckoutModal";

interface CartProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Cart({
  isOpen: externalIsOpen,
  onClose,
}: CartProps = {}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalAmount = useAppSelector((state) => state.cart.totalAmount);
  const dispatch = useAppDispatch();

  // Calculate GST only for items that have a price (not free items)
  const taxableAmount = cartItems.reduce((total, item) => {
    const itemPrice = item.selectedPrice || item.price || 0;
    return itemPrice > 0 ? total + itemPrice : total;
  }, 0);

  const totalWithGst = cartItems[0]?.selectedCurrency === 'INR' ? totalAmount + (taxableAmount * 0.18) : totalAmount;
  const gstAmount = currency === 'INR' ? taxableAmount * 0.18 : 0;

  const getCurrencySymbol = (selectedCurrency: "INR" | "USD") =>
    selectedCurrency === "INR" ? "₹" : "$";

  // Get price based on selected currency and type
  const getPrice = (item: any, type: "industry" | "consulting") => {
    if (currency === "USD") {
      return type === "industry"
        ? item.industryPriceUSD
        : item.consultingPriceUSD;
    } else {
      return type === "industry"
        ? item.industryPriceINR
        : item.consultingPriceINR;
    }
  };

  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = (value: boolean) => {
    if (externalIsOpen === undefined) {
      setInternalIsOpen(value);
    } else {
      onClose?.();
    }
  };

  useEffect(() => {
    if (externalIsOpen !== undefined && externalIsOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [externalIsOpen]);

  useEffect(() => {
    if (isCheckoutOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCheckoutOpen]);

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleUpdatePriceType = (
    id: number,
    type: "Industry" | "Consulting",
    price: number
  ) => {
    dispatch(updateCartItem({ id, selectedType: type, selectedPrice: price }));
  };

  const cartCount = cartItems.length;

  console.log("cart page", cartItems);

  return (
    <>
      {/* Cart Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none ">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-30 animate-fade-in pointer-events-auto"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Cart Panel */}
          <div className="absolute right-0 top-0 h-full w-[90vw] sm:w-[480px] lg:w-[520px] bg-white shadow-2xl flex flex-col transform transition-transform animate-slide-in pointer-events-auto">
            {/* Header */}
            <div className="bg-[#2b8ffb] text-white p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <ShoppingCart className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Shopping Cart</h2>
                    <p className="text-sm text-white/90">
                      {cartCount} {cartCount === 1 ? "item" : "items"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-50 to-white">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 py-12">
                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-8 rounded-full mb-6">
                    <Package className="w-20 h-20 opacity-50" />
                  </div>
                  <p className="text-xl font-semibold text-gray-700 mb-2">
                    Your cart is empty
                  </p>
                  <p className="text-sm text-gray-500">
                    Add events to get started
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    >
                      {/* Event Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="bg-[#2b8ffb]/10 text-[#2b8ffb] px-3 py-1 rounded-full text-xs font-semibold">
                              {item.category}
                            </span>
                            {item.featured && (
                              <span className="bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                                ⭐ Featured
                              </span>
                            )}
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg mb-3 line-clamp-2 leading-tight">
                            {item.title}
                          </h3>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all ml-2"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Event Details */}
                      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 mb-4 space-y-3">
                        <div className="flex items-center text-sm text-gray-700">
                          <div className="bg-[#2b8ffb]/10 p-1.5 rounded-lg mr-3">
                            <Calendar className="w-4 h-4 text-[#2b8ffb]" />
                          </div>
                          <span className="font-medium">{item.date}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-700">
                          <div className="bg-[#6c7cae]/10 p-1.5 rounded-lg mr-3">
                            <MapPin className="w-4 h-4 text-[#6c7cae]" />
                          </div>
                          <span className="font-medium">{item.location}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-700">
                          <div className="bg-[#9c408c]/10 p-1.5 rounded-lg mr-3">
                            <Clock className="w-4 h-4 text-[#9c408c]" />
                          </div>
                          <span className="font-medium">{item.duration}</span>
                        </div>
                      </div>

                      {/* Price Type Selection */}
                      <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-800 mb-3">
                          Registration Type:
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <span
                            className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all transform ${
                              item.selectedType === "Industry"
                                ? "bg-gradient-to-r from-[#2b8ffb] to-[#2b8ffb]/90 text-white shadow-lg scale-105"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent hover:border-[#2b8ffb]/30"
                            }`}
                          >
                            <div className="text-xs opacity-90 mb-1">
                              {item?.selectedType}
                            </div>
                            <div className="text-lg font-bold">
                              {(
                                item.selectedPrice ||
                                item?.price ||
                                0
                              ).toLocaleString()}
                            </div>
                          </span>
                        </div>
                      </div>

                      {/* Selected Price */}
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#2b8ffb]/10 via-[#6c7cae]/10 to-[#2b8ffb]/10 rounded-xl border-2 border-[#2b8ffb]/20">
                        <span className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-[#2b8ffb]" />
                          Selected Price:
                        </span>
                        <span className="text-2xl font-bold text-[#2b8ffb]">
                          {getCurrencySymbol(item?.selectedCurrency || "USD")}
                          {(
                            item.selectedPrice ||
                            item.price ||
                            0
                          ).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t-2 border-gray-200 p-6 bg-gradient-to-br from-white via-gray-50 to-white shadow-2xl">
                <div className="mb-6 p-4 bg-gradient-to-r from-[#2b8ffb]/10 to-[#6c7cae]/10 rounded-xl border-2 border-[#2b8ffb]/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Subtotal ({getCurrencySymbol(cartItems[0]?.selectedCurrency || "USD")}{totalAmount.toLocaleString()})</span>
                  </div>
                  {cartItems[0]?.selectedCurrency === 'INR' && (
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">GST (18%) ({getCurrencySymbol('INR')}{gstAmount.toLocaleString()})</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-300/50">
                    <span className="text-lg font-semibold text-gray-800">Total Amount</span>
                    <span className="text-3xl font-bold text-[#2b8ffb]">
                      {getCurrencySymbol(cartItems[0]?.selectedCurrency || "USD")}
                      {totalWithGst.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleClearCart}
                    className="flex-1 bg-gray-200 text-gray-700 py-3.5 px-4 rounded-xl font-semibold hover:bg-gray-300 transition-all transform hover:scale-105 shadow-md"
                  >
                    Clear Cart
                  </button>
                  <button
                    onClick={() => {
                      setIsCheckoutOpen(true);
                      setIsOpen(false); // Close cart when opening checkout
                    }}
                    className="flex-1 bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] text-white py-3.5 px-4 rounded-xl font-semibold hover:from-[#2b8ffb]/90 hover:to-[#6c7cae]/90 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        totalAmount={totalWithGst}
        currency={cartItems[0]?.selectedCurrency || "USD"}
      />
    </>
  );
}
