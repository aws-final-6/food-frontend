import React from "react";

export function getRandomItems(arr: any, numItems: number) {
  // Shuffle the array using Fisher-Yates algorithm
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  // Return the first `numItems` elements
  return arr.slice(0, numItems);
}
