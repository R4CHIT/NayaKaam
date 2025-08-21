import React, { useEffect, useState } from "react";
import {
  FaSearch,
  FaBell,
  FaMapMarkerAlt,
  FaStar,
  FaHome,
  FaCut,
  FaCar,
  FaTools,
  FaPaintBrush,
  FaLaptop,
  FaShieldAlt,
  FaClock,
  FaFire,
  FaPercent,
  FaChevronRight,
  FaHeart,
  FaWrench,
  FaBroom,
  FaLeaf,
  FaCamera,
  FaUserTie,
  FaGift,
  FaArrowRight,
} from "react-icons/fa";
import {
  MdCleaningServices,
  MdElectricalServices,
  MdPlumbing,
  MdAcUnit,
  MdLocalLaundryService,
  MdPestControl,
  MdSecurity,
  MdFitnessCenter,
} from "react-icons/md";
import { BiTime, BiMoney } from "react-icons/bi";
import { AiOutlineThunderbolt } from "react-icons/ai";
import Category from "./Category";
import ServicesGrid from "./ServicesGrid";
import getServices from "../../api/Services/getServices";

const Services = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [location, setLocation] = useState("Bharatpur, Bagmati");
  const [popularServices, setPopularServices] = useState([]);
  useEffect(() => {
    getServices(setPopularServices);
  }, []);
  const categories = [
    { id: "all", name: "All", icon: FaHome, color: "bg-blue-500" },
    {
      id: "cleaning",
      name: "Cleaning",
      icon: MdCleaningServices,
      color: "bg-green-500",
    },
    { id: "repairs", name: "Repairs", icon: FaTools, color: "bg-orange-500" },
    { id: "beauty", name: "Beauty", icon: FaCut, color: "bg-pink-500" },
    {
      id: "appliances",
      name: "Appliances",
      icon: MdAcUnit,
      color: "bg-purple-500",
    },
    {
      id: "painting",
      name: "Painting",
      icon: FaPaintBrush,
      color: "bg-yellow-500",
    },
    {
      id: "pest",
      name: "Pest Control",
      icon: MdPestControl,
      color: "bg-red-500",
    },
    {
      id: "electrical",
      name: "Electrical",
      icon: MdElectricalServices,
      color: "bg-indigo-500",
    },
  ];

  const quickServices = [
    {
      icon: MdCleaningServices,
      name: "Bathroom Cleaning",
      price: "₹299",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: MdElectricalServices,
      name: "Switch Repair",
      price: "₹99",
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      icon: MdPlumbing,
      name: "Tap Repair",
      price: "₹149",
      color: "bg-red-100 text-red-600",
    },
    {
      icon: MdAcUnit,
      name: "AC Service",
      price: "₹299",
      color: "bg-green-100 text-green-600",
    },
  ];

  const offers = [
    {
      id: 1,
      title: "First Service FREE",
      subtitle: "Get your first booking at no cost",
      code: "FIRST100",
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      icon: FaGift,
    },
    {
      id: 2,
      title: "Flat 30% OFF",
      subtitle: "On all home cleaning services",
      code: "CLEAN30",
      color: "bg-gradient-to-r from-green-500 to-blue-500",
      icon: FaPercent,
    },
  ];
  const filteredServices =
  selectedCategory === "all"
  ? popularServices
  : popularServices.filter(
    (service) => service.category.toLowerCase() === selectedCategory.toLowerCase()
  );
  console.log(selectedCategory)
        console.log(filteredServices)
  const searchFilteredServices = filteredServices.filter((service) =>
    service.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className={`${offer.color} rounded-xl p-6 text-white relative overflow-hidden`}
              >
                <div className="relative z-10">
                  <offer.icon className="w-8 h-8 mb-3 opacity-80" />
                  <h3 className="text-xl font-bold mb-1">{offer.title}</h3>
                  <p className="text-sm opacity-90 mb-3">{offer.subtitle}</p>
                  <div className="flex items-center justify-between">
                    <span className="bg-white bg-opacity-20 px-3 py-1 rounded-lg text-sm font-medium">
                      Code: {offer.code}
                    </span>
                    <FaArrowRight className="w-4 h-4" />
                  </div>
                </div>
                <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white bg-opacity-10 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Quick Services
            </h2>
            <button className="text-blue-600 text-sm font-medium flex items-center">
              View All <FaChevronRight className="w-3 h-3 ml-1" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickServices.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <div
                  className={`w-12 h-12 ${service.color} rounded-xl flex items-center justify-center mb-3`}
                >
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="font-medium text-gray-800 text-sm mb-1">
                  {service.name}
                </h3>
                <p className="text-blue-600 font-semibold text-sm">
                  {service.price}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Categories
          </h2>
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Category
                category={category}
                setSelectedCategory={setSelectedCategory}
                selectedCategory={selectedCategory}
              />
            ))}
          </div>
        </div>

        <ServicesGrid
          selectedCategory={selectedCategory}
          categories={categories}
          searchFilteredServices={searchFilteredServices}
        />
      </div>
    </div>
  );
};

export default Services;
