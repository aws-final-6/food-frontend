import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-geist-mono)"],
        jua: ["var(--font-jua)"],
        gaegu: ["var(--font-gaegu)"],
      },
      colors: {
        kakao: "#FEE500",
        naver: "#03C75A",
        main: "#FC9F6D",
        sub: "#FFD163",
        subdark: "#4F4B4A",
        selectedmain: "#e7673e",
        selectedsub: "#e6a045",
        norang: "#F9F7A4",
        norangdark: "#BD9906",
        mint: "#A1D4C5",
        mintdark: "#109071",
        yeondoo: "#CEE282",
        yeondoodark: "#7D9600",
        haneul: "#97D1DF",
        haneuldark: "#0084AE",
        bora: "#ECCAED",
        boradark: "#852BB1",
        boonhong: "#EEBBCD",
        boonhongdark: "#BA446C",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
