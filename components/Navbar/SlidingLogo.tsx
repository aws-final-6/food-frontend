"use client";
import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";

const logos = [
  { src: "/team/DaPanDa_logo.png", url: "https://dapanda.com" },
  { src: "/team/InterviewMaster_logo.png", url: "https://mlr.com" },
  { src: "/team/MyLittleRecipeBook_logo.png", url: "https://adv.com" },
  { src: "/team/PlaceHolder_logo.png", url: "https://adv.com" },
  { src: "/team/QuickCatch_logo.png", url: "https://adv.com" },
  { src: "/team/SPOID_logo.png", url: "https://adv.com" },
  { src: "/team/DaPanDa_logo.png", url: "https://dapanda.com" },
  { src: "/team/InterviewMaster_logo.png", url: "https://mlr.com" },
  { src: "/team/MyLittleRecipeBook_logo.png", url: "https://adv.com" },
  { src: "/team/PlaceHolder_logo.png", url: "https://adv.com" },
  { src: "/team/QuickCatch_logo.png", url: "https://adv.com" },
  { src: "/team/SPOID_logo.png", url: "https://adv.com" },
  { src: "/team/DaPanDa_logo.png", url: "https://dapanda.com" },
  { src: "/team/InterviewMaster_logo.png", url: "https://mlr.com" },
  { src: "/team/MyLittleRecipeBook_logo.png", url: "https://adv.com" },
  { src: "/team/PlaceHolder_logo.png", url: "https://adv.com" },
  { src: "/team/QuickCatch_logo.png", url: "https://adv.com" },
  { src: "/team/SPOID_logo.png", url: "https://adv.com" },
];

const SlidingLogos: React.FC = () => {
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = React.useState(0);
  const [totalLogosWidth, setTotalLogosWidth] = React.useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
      setTotalLogosWidth(containerRef.current.scrollWidth);
    }
  }, []);

  useEffect(() => {
    if (totalLogosWidth > 0) {
      controls.start({
        x: [0, -totalLogosWidth / 2],
        transition: {
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          duration: 20,
        },
      });
    }
  }, [totalLogosWidth, controls]);

  return (
    <div className="overflow-hidden w-full" ref={containerRef}>
      <motion.div
        className="flex"
        animate={controls}
        onMouseEnter={() => controls.stop()}
        onMouseLeave={() =>
          controls.start({
            x: [0, -totalLogosWidth / 2],
            transition: {
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
              duration: 20,
            },
          })
        }
      >
        {logos.map((logo, index) => (
          <div key={index} className="flex-shrink-0 mx-4">
            <a href={logo.url} target="_blank" rel="noopener noreferrer">
              <Image
                src={logo.src}
                alt={`logo-${index}`}
                width={100}
                height={100}
                className="w-24 h-24"
              />
            </a>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default SlidingLogos;
