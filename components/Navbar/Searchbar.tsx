"use client";
import { Input } from "@nextui-org/input";
import React, { useState } from "react";
import { Listbox, ListboxItem, ListboxSection } from "@nextui-org/listbox";
import { Switch } from "@nextui-org/switch";
import { BiSolidFoodMenu } from "react-icons/bi";
import { FaShoppingBag } from "react-icons/fa";
import { SearchIngredientAPI, SearchRecipeAPI } from "./action";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import FilterButton from "./FilterButton";

interface SearchResult {
  recipe_id: number;
  recipe_title: string;
  recipe_thumbnail: string;
}

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searchType, setSearchType] = useState(false);
  const router = useRouter();

  async function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    setSearchTerm(value);
    let searchResult;
    if (value.length > 1) {
      if (searchType) searchResult = await SearchRecipeAPI(value);
      if (searchType === false) searchResult = await SearchIngredientAPI(value);
      if (searchResult && searchResult.length >= 5)
        setResults(searchResult.slice(0, 5));
      else setResults(searchResult);
    } else {
      setResults([]);
    }
  }

  async function handleSwitch() {
    setSearchType(!searchType);
    let searchResult;
    if (searchTerm.length > 1) {
      if (searchType === false)
        searchResult = await SearchRecipeAPI(searchTerm);
      if (searchType) searchResult = await SearchIngredientAPI(searchTerm);
      if (searchResult && searchResult.length >= 5)
        setResults(searchResult.slice(0, 5));
      else setResults(searchResult);
    } else {
      setResults([]);
    }
  }
  return (
    <div className="flex flex-row gap-1">
      <Switch
        isSelected={searchType}
        onChange={handleSwitch}
        size="lg"
        color="warning"
        startContent={<BiSolidFoodMenu />}
        endContent={<FaShoppingBag />}
        classNames={{
          wrapper: "bg-main",
        }}
      />

      <Input
        aria-label="Search"
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm",
        }}
        labelPlacement="outside"
        placeholder={searchType ? "레시피 검색하기.." : "재료 검색하기.."}
        type="search"
        onChange={handleSearch}
        value={searchTerm}
      />
      <Button
        onClick={() => {
          searchType
            ? router.push(`/search/recipe/${searchTerm}`)
            : router.push(`/search/ingredient/${searchTerm}`);
          setSearchTerm("");
          setResults([]);
        }}
      >
        검색
      </Button>
      <FilterButton />

      {results && results.length > 0 && (
        <div className="absolute z-10 w-[300px] bg-white shadow-lg mt-10 ml-12 rounded-lg border-2 border-subdark">
          <Listbox
            classNames={{
              base: "max-w-xs",
              list: "max-h-[300px] overflow-scroll",
            }}
          >
            <ListboxSection
              title={searchType ? "레시피 이름" : "재료"}
              classNames={{ heading: "text-lg" }}
              showDivider
            >
              {results.map((result) => (
                <ListboxItem
                  key={result.recipe_id}
                  className="p-4 border-b last:border-b-0"
                  onClick={() => {
                    router.push(`/recipe/${result.recipe_id}`);
                    setResults([]);
                  }}
                >
                  <div className="font-bold text-wrap">
                    {result.recipe_title || ""}
                  </div>
                </ListboxItem>
              ))}
            </ListboxSection>
          </Listbox>
        </div>
      )}
    </div>
  );
};

export default Searchbar;
