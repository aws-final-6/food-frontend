"use client";

import React, { createContext, useState, ReactNode, useEffect } from "react";
import { LogoutAPI } from "./action";
import { checkSession } from "@/components/Auth/action";

interface IUserData {
  id: string;
  email: string;
  nickname: string;
  provider: string;
  refreshToken: string;
  accessToken: string;
  cate_no: number;
  situ_no: number;
}

interface IUserContext {
  userData: IUserData | null;
  favorite: number[];
  setUserData: (data: IUserData) => void;
  clearUserData: () => void;
  updateProvider: (newProvider: string) => void;
  updateUserData: (newData: Partial<IUserData>) => void;
  setFavorite: (item: number[]) => void;
  addFavorite: (item: number) => void;
  removeFavorite: (item: number) => void;
  clearFavorites: () => void;
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<IUserContext>({
  userData: null,
  favorite: [],
  setUserData: () => {},
  clearUserData: () => {},
  updateProvider: () => {},
  updateUserData: () => {},
  setFavorite: () => {},
  addFavorite: () => {},
  removeFavorite: () => {},
  clearFavorites: () => {},
});

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<IUserData | null>(() => {
    if (typeof window !== "undefined") {
      const localData = localStorage.getItem("userData");
      return localData
        ? JSON.parse(localData)
        : {
            id: "testid",
            email: "hylee@dshub.com",
            nickname: "kevin",
            provider: "kakao",
            refreshToken: "testRefreshToken",
            accessToken: "testtoken",
            cate_no: 54,
            situ_no: 19,
          };
    }
    return null;
  });
  const [favorite, setFavorite] = useState<number[]>(() => {
    if (typeof window !== "undefined") {
      const localData = localStorage.getItem("favorite");
      return localData ? JSON.parse(localData) : [];
    }
    return [];
  });
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (userData) {
        localStorage.setItem("userData", JSON.stringify(userData));
      } else {
        setUserData({
          id: "testid",
          email: "hylee@dshub.com",
          nickname: "kevin",
          provider: "kakao",
          refreshToken: "testRefreshToken",
          accessToken: "testtoken",
          cate_no: 54,
          situ_no: 19,
        });
      }
    }
    // async function checkStatus() {
    //   if (userData && userData.nickname) {
    //     const result = await checkSession(
    //       userData.provider,
    //       userData.id,
    //       userData.accessToken
    //     );
    //     console.log("provider", result);
    //     if (result != 200) {
    //       clearUserData();
    //     }
    //   }
    // }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("favorite", JSON.stringify(favorite));
      setIsInitialized(true);
    }
  }, [favorite]);

  const clearUserData = async () => {
    if (typeof window !== "undefined") {
      setFavorite([]);
      setUserData(null);
      localStorage.removeItem("userData");
      localStorage.removeItem("favorite");

      if (userData) {
        const res = await LogoutAPI(
          userData.provider,
          userData.id,
          userData.accessToken
        );
      }
    }
  };

  const clearFavorites = () => {
    if (typeof window !== "undefined") {
      setFavorite([]);
      localStorage.removeItem("favorite");
    }
  };

  const updateProvider = (newProvider: string) => {
    if (userData) {
      const updatedData = { ...userData, provider: newProvider };
      setUserData(updatedData);
    } else {
      setUserData({ provider: newProvider } as IUserData);
    }
  };

  const updateUserData = (newData: Partial<IUserData>) => {
    if (userData) {
      const updatedData = { ...userData, ...newData };
      setUserData(updatedData);
    } else {
      setUserData(newData as IUserData);
    }
  };

  const addFavorite = (item: number) => {
    setFavorite((prevFavorites) => [...prevFavorites, item]);
  };

  const removeFavorite = (item: number) => {
    setFavorite((prevFavorites) => prevFavorites.filter((fav) => fav !== item));
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        favorite,
        setUserData,
        setFavorite,
        clearUserData,
        updateProvider,
        updateUserData,
        addFavorite,
        removeFavorite,
        clearFavorites,
      }}
    >
      {isInitialized ? children : null}
    </UserContext.Provider>
  );
};
