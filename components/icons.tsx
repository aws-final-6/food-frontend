import * as React from "react";

import { IconSvgProps } from "@/types";

export const GoogleLogo: React.FC<IconSvgProps> = ({ ...props }) => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.04 12.2614C23.04 11.4459 22.9668 10.6618 22.8309 9.90912H12V14.3575H18.1891C17.9225 15.795 17.1123 17.013 15.8943 17.8284V20.7139H19.6109C21.7855 18.7118 23.04 15.7637 23.04 12.2614Z"
        fill="#4285F4"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 23.4998C15.105 23.4998 17.7081 22.47 19.6109 20.7137L15.8943 17.8282C14.8645 18.5182 13.5472 18.9259 12 18.9259C9.00474 18.9259 6.46951 16.903 5.56519 14.1848H1.72314V17.1644C3.61542 20.9228 7.50451 23.4998 12 23.4998Z"
        fill="#34A853"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.56523 14.1851C5.33523 13.4951 5.20455 12.758 5.20455 12.0001C5.20455 11.2421 5.33523 10.5051 5.56523 9.81506V6.83551H1.72318C0.944318 8.38801 0.5 10.1444 0.5 12.0001C0.5 13.8557 0.944318 15.6121 1.72318 17.1646L5.56523 14.1851Z"
        fill="#FBBC05"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 5.07386C13.6884 5.07386 15.2043 5.65409 16.3961 6.79364L19.6945 3.49523C17.7029 1.63955 15.0997 0.5 12 0.5C7.50451 0.5 3.61542 3.07705 1.72314 6.83545L5.56519 9.815C6.46951 7.09682 9.00474 5.07386 12 5.07386Z"
        fill="#EA4335"
      />
    </svg>
  );
};

export const NaverLogo: React.FC<IconSvgProps> = ({ ...props }) => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_403_243)">
        <path
          d="M18 20H2C0.9 20 0 19.1 0 18V2C0 0.9 0.9 0 2 0H18C19.1 0 20 0.9 20 2V18C20 19.1 19.1 20 18 20Z"
          fill="#03C75A"
        />
        <path
          d="M11.35 10.25L8.50002 6.19995H6.15002V13.8H8.65002V9.74995L11.5 13.8H13.85V6.19995H11.35V10.25Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_403_243">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const KakaoLogo: React.FC<IconSvgProps> = ({ ...props }) => {
  return (
    <svg
      viewBox="0 0 99.61801 92.147011"
      height="46" // Adjusted for example
      width="50" // Adjusted for example
      xmlSpace="preserve"
      id="svg2"
      version="1.1"
      style={{ display: "block" }} // Added style to ensure block display
      {...props} // Spread props to allow additional styling
    >
      <defs>
        <clipPath id="clipPath692" clipPathUnits="userSpaceOnUse">
          <path id="path690" d="m 0,595.28 841.89,0 L 841.89,0 0,0 Z" />
        </clipPath>
      </defs>
      <g transform="matrix(1,0,0,-1,-362.26358,234.09895)">
        <g clipPath="url(#clipPath692)">
          <g transform="translate(163.2612,376.6777)">
            <path
              id="path696"
              style={{
                fill: "#3c1e1e",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              d="m 248.81039,-143.57875 c -26.953,0 -48.80801,-17.256 -48.80801,-38.555 0,-13.68101 9.05201,-25.69301 22.64601,-32.54901 l -4.599,-17.167 c -0.176,-0.527 -0.03,-1.085 0.352,-1.465 0.263,-0.265 0.614,-0.411 0.995,-0.411 0.294,0 0.586,0.117 0.85,0.322 l 19.775,13.36 c 2.872,-0.41 5.802,-0.644 8.789,-0.644 26.953,0 48.81,17.255 48.81,38.55401 0,21.299 -21.857,38.555 -48.81,38.555"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};
