"use client";

import React, {
  createContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from "react";

interface IUserData {
  id: string;
  email: string;
  nickname: string;
  provider: string;
  refreshToken: string;
  accessToken: string;
  favorite: number[];
}

interface IUserContext {
  userData: IUserData[];
  setUserData: (data: IUserData[]) => void;
  clearUserData: () => void;
  isUserDataEmpty: () => boolean;
  updateProvider: (newProvider: string) => void;
  updateUserData: (newData: Partial<IUserData>) => void;
  addFavorite: (item: number) => void;
  removeFavorite: (item: number) => void;
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<IUserContext>({
  userData: [],
  setUserData: () => [],
  isUserDataEmpty: () => true,
  clearUserData: () => [],
  updateProvider: () => [],
  updateUserData: () => [],
  addFavorite: () => [],
  removeFavorite: () => [],
});

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<IUserData[]>(() => {
    if (typeof window !== "undefined") {
      const localData = localStorage.getItem("userData");
      return localData ? JSON.parse(localData) : [];
    }
    return [];
  });
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("userData", JSON.stringify(userData));
      setIsInitialized(true);
    }
  }, [userData]);

  const isUserDataEmpty = useCallback(() => userData.length === 0, [userData]);

  const clearUserData = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("userData");
      setUserData([]);
    }
  };

  const updateProvider = (newProvider: string) => {
    if (userData.length > 0) {
      const updatedData = [...userData];
      updatedData[0].provider = newProvider;
      setUserData(updatedData);
    } else {
      setUserData([{ provider: newProvider } as IUserData]);
    }
  };

  const updateUserData = (newData: Partial<IUserData>) => {
    if (userData.length > 0) {
      const updatedData = { ...userData[0], ...newData };
      setUserData([updatedData]);
    } else {
      setUserData([{ ...newData } as IUserData]);
    }
  };

  const addFavorite = (item: number) => {
    if (userData.length > 0) {
      const updatedData = [...userData];
      if (!Array.isArray(updatedData[0].favorite)) {
        updatedData[0].favorite = [];
      }
      updatedData[0].favorite.push(item);
      setUserData(updatedData);
    }
  };

  const removeFavorite = (item: number) => {
    if (userData.length > 0) {
      const updatedData = [...userData];
      updatedData[0].favorite = updatedData[0].favorite.filter(
        (fav) => fav !== item
      );
      setUserData(updatedData);
    }
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        isUserDataEmpty,
        clearUserData,
        updateProvider,
        updateUserData,
        removeFavorite,
        addFavorite,
      }}
    >
      {isInitialized ? children : null}
    </UserContext.Provider>
  );
};
