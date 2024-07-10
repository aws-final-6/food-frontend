// providers/RefrigeratorContext.tsx
"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";
import { IColumn, IRefrigerator, IIngredients } from "./page"; // Adjust the import path as needed

interface IColName {
  refrigerator_id: number;
  refrigerator_type: number;
  refrigerator_name: string;
}

interface RefrigeratorContextProps {
  refrig: IColumn | null;
  setRefrig: React.Dispatch<React.SetStateAction<IColumn | null>>;
  updateRefrigerators: (newRefrigerators: IRefrigerator[]) => void;
  getRefrigInfo: () => IColName[];
  addIngredient: (newIngredient: IIngredients) => void;
  addMultipleIngredients: (newIngredients: IIngredients[]) => void;
}

const RefrigeratorContext = createContext<RefrigeratorContextProps | undefined>(
  undefined
);

export const useRefrigeratorContext = () => {
  const context = useContext(RefrigeratorContext);
  if (!context) {
    throw new Error(
      "useRefrigeratorContext must be used within a RefrigeratorProvider"
    );
  }
  return context;
};

export const RefrigeratorProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [refrig, setRefrig] = useState<IColumn | null>(null);

  const updateRefrigerators = (newRefrigerators: IRefrigerator[]) => {
    if (refrig) {
      setRefrig({ ...refrig, refrigerators: newRefrigerators });
    }
  };

  const getRefrigInfo = (): IColName[] => {
    return refrig
      ? refrig.refrigerators.map((item) => ({
          refrigerator_id: item.refrig.refrigerator_id,
          refrigerator_type: item.refrig.refrigerator_type,
          refrigerator_name: item.refrig.refrigerator_name,
        }))
      : [];
  };

  const addIngredient = (newIngredient: IIngredients) => {
    if (refrig) {
      const updatedRefrigerators = refrig.refrigerators.map((item) => {
        if (item.refrig.refrigerator_id === newIngredient.refrigerator_id) {
          return {
            ...item,
            ingredients: [...item.ingredients, newIngredient],
          };
        }
        return item;
      });
      setRefrig({ ...refrig, refrigerators: updatedRefrigerators });
    }
  };

  const addMultipleIngredients = (newIngredients: IIngredients[]) => {
    if (refrig) {
      const updatedRefrigerators = refrig.refrigerators.map((item) => {
        const matchingIngredients = newIngredients.filter(
          (ingredient) =>
            ingredient.refrigerator_id === item.refrig.refrigerator_id
        );
        if (matchingIngredients.length > 0) {
          return {
            ...item,
            ingredients: [...item.ingredients, ...matchingIngredients],
          };
        }
        return item;
      });
      setRefrig({ ...refrig, refrigerators: updatedRefrigerators });
    }
  };

  return (
    <RefrigeratorContext.Provider
      value={{
        refrig,
        setRefrig,
        updateRefrigerators,
        getRefrigInfo,
        addIngredient,
        addMultipleIngredients,
      }}
    >
      {children}
    </RefrigeratorContext.Provider>
  );
};
