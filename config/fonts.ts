import {
  Fira_Code as FontMono,
  Inter as FontSans,
  Jua as FontJua,
  Gaegu as FontGaegu,
} from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const fontJua = FontJua({
  subsets: ["latin"],
  variable: "--font-jua",
  weight: "400",
});

export const fontGaegu = FontGaegu({
  subsets: ["latin"],
  variable: "--font-gaegu",
  weight: "300",
});
