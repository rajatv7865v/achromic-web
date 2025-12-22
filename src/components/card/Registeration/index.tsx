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

export default function RegisterCard({ event }: { event: any }) {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const isInCart = cartItems.some((item) => item.id === event.id);
  const { openCart } = useCart();

  const getProgressPercentage = (registered: number, seats: string) => {
    return (registered / parseInt(seats)) * 100;
  };

  const handleAddToCart = () => {
    const eventItem: EventItem = {
      id: event.id,
      title: event.title,
      date: event.date,
      location: event.location,
      price: event.price || 0,
      earlyBirdPrice: event.earlyBirdPrice,
      industryPrice: event.industryPrice,
      industryEarlyBird: event.industryEarlyBird,
      consultingPrice: event.consultingPrice,
      consultingEarlyBird: event.consultingEarlyBird,
      category: event.category,
      duration: event.duration,
      seats: event.seats,
      registered: event.registered,
      featured: event.featured,
      description: event.description,
      benefits: event.benefits,
      selectedPrice: event.industryEarlyBird || event.industryPrice || event.price || 0,
      selectedType: 'Industry',
    };
    dispatch(addToCart(eventItem));
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
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 text-sm mb-3">
            registeration Fees:
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
                  ₹
                  {event.industryPrice?.toLocaleString() ||
                    event.price?.toLocaleString()}
                </div>
                <div className="text-xl font-bold text-gray-900">
                  ₹
                  {(
                    event.industryEarlyBird ||
                    event.industryPrice ||
                    event.price
                  )?.toLocaleString()}
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
                  ₹
                  {event.consultingPrice?.toLocaleString() ||
                    event.earlyBirdPrice?.toLocaleString()}
                </div>
                <div className="text-xl font-bold text-gray-900">
                  ₹
                  {(
                    event.consultingEarlyBird ||
                    event.consultingPrice ||
                    event.earlyBirdPrice
                  )?.toLocaleString()}
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
    </div>
  );
}
