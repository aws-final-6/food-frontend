"use client";

import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    title: "네이버 쇼핑 최저가",
    description: "가보자구",
    bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
  },
  {
    id: 2,
    title: "당신을 위한 레시피 추천",
    description: "한군데에서 편하게 보기!",
    bg: "bg-gradient-to-r from-pink-50 to-blue-50",
  },
  {
    id: 3,
    title: "오늘은 뭐해 먹지?",
    description: "고민하지마요!",
    bg: "bg-gradient-to-r from-pink-50 to-blue-50",
  },
  {
    id: 4,
    title: "쉽고 편하게 관리!",
    description: "냉장고 유통기한",
    bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
  },
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);

  // Log the current index to ensure it updates correctly
  useEffect(() => {
    console.log("Current slide index:", current);
  }, [current]);

  // Slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 9000); // Adjust the interval time as needed

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[calc(100vh-80px)] overflow-hidden">
      <div
        className="w-full h-full flex transition-transform ease-in-out duration-1000"
        style={{ transform: `translateX(-${current * 50}vw)` }}
      >
        {slides.map((slide, index) => (
          <div
            className={`${slide.bg} w-screen h-full flex flex-col gap-16 xl:flex-row`}
            key={slide.id}
          >
            <div className="h-1/2 xl:w-1/2 xl:h-full flex flex-col items-center justify-center gap-8 2xl:gap-12 text-center">
              <h2 className="text-xl lg:text-3xl 2xl:text-5xl">
                {slide.description}
              </h2>
              <h1 className="text-5xl lg:text-6xl 2xl:text-8xl font-semibold">
                {slide.title}
              </h1>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute left-1/2 bottom-8 transform -translate-x-1/2 flex gap-4">
        {slides.map((slide, index) => (
          <div
            className={`w-3 h-3 rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center ${
              current === index ? "scale-150" : ""
            }`}
            key={slide.id}
            onClick={() => {
              setCurrent(index);
              console.log("Clicked slide index:", index);
            }}
          >
            {current === index && (
              <div className="w-[6px] h-[6px] bg-gray-600 rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
