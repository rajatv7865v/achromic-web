"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/assets/logo/logo.png";
import {
  BuildingIcon,
  CalendarIcon,
  CheckCircleIcon,
  UserIcon,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart, removeFromCart } from "@/store/cartSlice";
import type { EventItem } from "@/store/cartSlice";
import { useCart } from "@/components/cart/CartProvider";
import { useState } from "react";

export default function RegisterCard({ event }: { event: any }) {
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const [showModal, setShowModal] = useState(false);
  const [selectedType, setSelectedType] = useState<"Industry" | "Consulting">(
    "Industry"
  );
  const [modalCurrency, setModalCurrency] = useState<"INR" | "USD">("INR");
  console.log("eveee", event);
  // Get price based on selected currency
  const getPrice = (
    type: "industry" | "consulting",
    priceType: "normal" | "strike"
  ) => {
    if (currency === "USD") {
      if (type === "industry") {
        return priceType === "strike"
          ? event.industryStrikePriceINR
          : event.industryPriceINR;
      } else {
        return priceType === "strike"
          ? event.consultingStrikePriceUSD
          : event.consultingPriceUSD;
      }
    } else {
      if (type === "industry") {
        return priceType === "strike"
          ? event.industryStrikePriceINR
          : event.industryPriceINR;
      } else {
        return priceType === "strike"
          ? event.consultingStrikePriceINR
          : event.consultingPriceINR;
      }
    }
  };

  const getCurrencySymbol = () => (currency === "INR" ? "₹" : "$");

  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const isInCart = cartItems.some((item) => item.id === event.id);
  const { openCart } = useCart();

  const getProgressPercentage = (registered: number, seats: string) => {
    return (registered / parseInt(seats)) * 100;
  };

  const handleAddToCart = () => {
    // Open modal instead of directly adding to cart
    setModalCurrency(currency);
    setShowModal(true);
  };

  const confirmAddToCart = () => {
    const selectedPrice =
      modalCurrency === "USD"
        ? selectedType === "Industry"
          ? event.industryPriceUSD
          : event.consultingPriceUSD
        : selectedType === "Industry"
        ? event.industryPriceINR
        : event.consultingPriceINR;

    const eventItem: EventItem = {
      id: event.id,
      title: event.title,
      date: event.date,
      location: event.location,
      price: selectedPrice || 0,
      category: event.category,
      duration: event.duration,
      seats: event.seats,
      registered: event.registered,
      featured: event.featured,
      description: event.description,
      benefits: event.benefits,
      selectedPrice: selectedPrice || 0,
      selectedCurrency: modalCurrency,
      selectedType: selectedType,
    };
    dispatch(addToCart(eventItem));
    setShowModal(false);
    openCart();
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(event.id));
  };
  return (
    <div
      key={event.id}
      className={`group relative cursor-pointer transition-all duration-300 ${
        isInCart ? "ring-4 ring-[#2b8ffb] ring-opacity-50" : ""
      }`}
      // onClick={() => {
      //   setSelectedEvent(event.id);
      //   setFormData((prev) => ({
      //     ...prev,
      //     eventId: event.id.toString(),
      //   }));
      // }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#2b8ffb]/10 to-[#6c7cae]/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
      <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover-lift border border-gray-100">
        {event.featured && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] text-white px-3 py-1 rounded-full text-sm font-semibold">
            Featured
          </div>
        )}

        <div className="mb-4">
          <span className="bg-[#2b8ffb]/10 text-[#2b8ffb] px-3 py-1 rounded-full text-sm font-medium">
            {event.category}
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2">
          {event.title}
        </h3>

        <div className="space-y-3 mb-6">
          <div className="flex items-center text-gray-600">
            <CalendarIcon className="w-5 h-5 mr-2 text-[#2b8ffb]" />
            <span className="font-medium">{event.date}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <BuildingIcon className="w-5 h-5 mr-2 text-[#6c7cae]" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <UserIcon className="w-5 h-5 mr-2 text-[#9c408c]" />
            <span>{event.duration}</span>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-6 line-clamp-3">
          {event.description}
        </p>

        {/* Currency Switch */}
        <div className="mb-4 flex justify-end">
          <div className="inline-flex rounded-lg border border-gray-300 bg-white p-1 shadow-sm">
            <button
              onClick={() => setCurrency("INR")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                currency === "INR"
                  ? "bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              ₹ INR
            </button>
            <button
              onClick={() => setCurrency("USD")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                currency === "USD"
                  ? "bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              $ USD
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 text-sm mb-3">
            Registration Fees:
          </h4>
          <div className="space-y-3">
            {/* Industry Price */}
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-[#2b8ffb]/5 to-[#2b8ffb]/10 rounded-lg border border-[#2b8ffb]/20">
              <div>
                <div className="text-sm font-medium text-gray-700">
                  Industry
                </div>
                <div className="text-xs text-gray-500">Corporate Delegates</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 line-through">
                  {getCurrencySymbol()}
                  {getPrice("industry", "strike")?.toLocaleString()}
                </div>
                <div className="text-xl font-bold text-gray-900">
                  {getCurrencySymbol()}
                  {getPrice("industry", "normal")?.toLocaleString()}
                </div>
                {event.industryEarlyBird && (
                  <div className="text-xs text-green-600 font-medium">
                    Early Bird Price
                  </div>
                )}
              </div>
            </div>

            {/* Consulting Price */}
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-[#6c7cae]/5 to-[#6c7cae]/10 rounded-lg border border-[#6c7cae]/20">
              <div>
                <div className="text-sm font-medium text-gray-700">
                  Consulting
                </div>
                <div className="text-xs text-gray-500">
                  Professional Services
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 line-through">
                  {getCurrencySymbol()}
                  {getPrice("consulting", "strike")?.toLocaleString()}
                </div>
                <div className="text-xl font-bold text-gray-900">
                  {getCurrencySymbol()}
                  {getPrice("consulting", "normal")?.toLocaleString()}
                </div>
                {event.consultingEarlyBird && (
                  <div className="text-xs text-green-600 font-medium">
                    Early Bird Price
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <h4 className="font-semibold text-gray-900 text-sm">
            What's Included:
          </h4>
          {event.benefits.slice(0, 3).map((benefit: any, index: any) => (
            <div
              key={index}
              className="flex items-center text-sm text-gray-600"
            >
              <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
              <span>{benefit}</span>
            </div>
          ))}
        </div>

        <button
          onClick={isInCart ? handleRemoveFromCart : handleAddToCart}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
            isInCart
              ? "bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] text-white shadow-lg"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {isInCart ? "Remove from Cart" : "Add to Cart"}
        </button>
      </div>

      {/* Selection Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={() => setShowModal(false)}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          <div
            className="relative z-10 bg-white rounded-2xl shadow-2xl w-[90%] max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] text-white p-6 rounded-t-2xl">
              <h3 className="text-2xl font-bold mb-2">
                Select Registration Option
              </h3>
              <p className="text-sm text-white/90">
                Choose your registration type and currency
              </p>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Currency Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Currency:
                </label>
                <div className="inline-flex rounded-lg border border-gray-300 bg-gray-50 p-1 w-full">
                  <button
                    onClick={() => setModalCurrency("INR")}
                    className={`flex-1 px-4 py-3 text-sm font-medium rounded-md transition-all duration-200 ${
                      modalCurrency === "INR"
                        ? "bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] text-white shadow-md"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    ₹ INR
                  </button>
                  <button
                    onClick={() => setModalCurrency("USD")}
                    className={`flex-1 px-4 py-3 text-sm font-medium rounded-md transition-all duration-200 ${
                      modalCurrency === "USD"
                        ? "bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] text-white shadow-md"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    $ USD
                  </button>
                </div>
              </div>

              {/* Registration Type Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Registration Type:
                </label>
                <div className="space-y-3">
                  {/* Industry Option */}
                  <button
                    onClick={() => setSelectedType("Industry")}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      selectedType === "Industry"
                        ? "border-[#2b8ffb] bg-gradient-to-r from-[#2b8ffb]/10 to-[#2b8ffb]/5 shadow-md"
                        : "border-gray-200 hover:border-[#2b8ffb]/50 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">
                          Industry
                        </div>
                        <div className="text-xs text-gray-500">
                          Corporate Delegates
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500 line-through">
                          {modalCurrency === "INR" ? "₹" : "$"}
                          {(modalCurrency === "USD"
                            ? event.industryStrikePriceUSD
                            : event.industryStrikePriceINR
                          )?.toLocaleString()}
                        </div>
                        <div className="text-xl font-bold text-[#2b8ffb]">
                          {modalCurrency === "INR" ? "₹" : "$"}
                          {(modalCurrency === "USD"
                            ? event.industryPriceUSD
                            : event.industryPriceINR
                          )?.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Consulting Option */}
                  <button
                    onClick={() => setSelectedType("Consulting")}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      selectedType === "Consulting"
                        ? "border-[#6c7cae] bg-gradient-to-r from-[#6c7cae]/10 to-[#6c7cae]/5 shadow-md"
                        : "border-gray-200 hover:border-[#6c7cae]/50 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">
                          Consulting
                        </div>
                        <div className="text-xs text-gray-500">
                          Professional Services
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500 line-through">
                          {modalCurrency === "INR" ? "₹" : "$"}
                          {(modalCurrency === "USD"
                            ? event.consultingStrikePriceUSD
                            : event.consultingStrikePriceINR
                          )?.toLocaleString()}
                        </div>
                        <div className="text-xl font-bold text-[#6c7cae]">
                          {modalCurrency === "INR" ? "₹" : "$"}
                          {(modalCurrency === "USD"
                            ? event.consultingPriceUSD
                            : event.consultingPriceINR
                          )?.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-gray-50 rounded-b-2xl flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmAddToCart}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] text-white rounded-lg font-semibold hover:from-[#2b8ffb]/90 hover:to-[#6c7cae]/90 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
