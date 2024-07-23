"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FoodCard from "./FoodCard";

export interface IRecipe {
  recipe_id: number;
  recipe_title: string;
  recipe_thumbnail: string;
  cate_no: number;
  situ_no: number;
}

interface CarouselProps {
  data: IRecipe[];
  cName: string;
}

const CardCarousel: React.FC<CarouselProps> = ({ data, cName }) => {
  const [current, setCurrent] = useState(0);

  const cardsPerPage = 4;
  const totalPages = Math.ceil(data.length / cardsPerPage);

  const nextSlide = () => {
    setCurrent((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  if (!Array.isArray(data) || data.length <= 0) {
    return null;
  }

  return (
    <div className="relative w-full overflow-hidden">
      <button
        className="absolute left-0 top-1/2 z-10 p-2 bg-gray-800 rounded-full text-white hover:bg-gray-600 transform -translate-y-1/2"
        onClick={prevSlide}
      >
        &#10094;
      </button>
      <div className="overflow-hidden">
        <motion.div
          className="flex flex-wrap md:flex-nowrap"
          animate={{ x: `${-current * 100}%` }}
          transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
        >
          {data.map((food, index) => (
            <div
              key={food.recipe_id}
              className="w-1/2 md:w-1/4 p-2 flex-shrink-0"
            >
              <FoodCard cName={cName} index={index} food={food} />
            </div>
          ))}
        </motion.div>
      </div>
      <button
        className="absolute right-0 top-1/2 z-10 p-2 bg-gray-800 rounded-full text-white hover:bg-gray-600 transform -translate-y-1/2"
        onClick={nextSlide}
      >
        &#10095;
      </button>
    </div>
  );
};

export default CardCarousel;
