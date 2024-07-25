"use client";
import { Input } from "@nextui-org/input";
import React, { useEffect, useState } from "react";
import { Listbox, ListboxItem, ListboxSection } from "@nextui-org/listbox";
import { Switch } from "@nextui-org/switch";
import { BiSolidFoodMenu } from "react-icons/bi";
import { FaShoppingBag } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { SearchIngredientAPI, SearchRecipeAPI } from "./action";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import FilterButton from "./FilterButton";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import useDebounce from "@/utils/UseDebounce";

interface SearchResult {
  recipe_id: number;
  recipe_title: string;
  recipe_thumbnail: string;
}

const SearchMobile = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searchType, setSearchType] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  async function handleSearch(value: string) {
    let searchResult;
    if (value.length > 1) {
      if (searchType) searchResult = await SearchRecipeAPI(value, "navbar");
      if (!searchType)
        searchResult = await SearchIngredientAPI(value, "navbar");
      if (searchResult && searchResult.length >= 5)
        setResults(searchResult.slice(0, 5));
      else setResults(searchResult);
    } else {
      setResults([]);
    }
  }

  useEffect(() => {
    handleSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, searchType]);

  return (
    <div>
      <Button
        onClick={onOpen}
        startContent={<FiSearch size={24} />}
        variant="flat"
        className="bg-sub"
      ></Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        className="py-10 z-999"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-row gap-2 font-jua justify-center">
                <FilterButton />
                <Switch
                  isSelected={searchType}
                  onChange={() => {
                    setSearchType(!searchType);
                    setSearchTerm("");
                  }}
                  size="lg"
                  color="warning"
                  startContent={<BiSolidFoodMenu />}
                  endContent={<FaShoppingBag />}
                  classNames={{
                    wrapper: "bg-main",
                  }}
                />
                {searchType ? <p>레시피 검색</p> : <p>재료로 검색</p>}
              </ModalHeader>
              <ModalBody className="flex flex-col gap-3">
                <Autocomplete
                  label={searchType ? "레시피 이름" : "재료"}
                  inputValue={searchTerm}
                  allowsCustomValue
                  onInputChange={(value) => setSearchTerm(value)}
                  variant="underlined"
                >
                  {results &&
                    results.map((result, index) => (
                      <AutocompleteItem
                        key={`res_${result.recipe_id}_${index}`}
                        value={result.recipe_id}
                      >
                        {result.recipe_title || ""}
                      </AutocompleteItem>
                    ))}
                </Autocomplete>
                <Button
                  className="bg-sub font-jua mt-2"
                  onClick={() => {
                    searchType
                      ? router.push(`/search/recipe/${searchTerm}`)
                      : router.push(`/search/ingredient/${searchTerm}`);
                    setSearchTerm("");
                    setResults([]);
                  }}
                  disabled={searchTerm.length <= 1}
                >
                  검색
                </Button>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SearchMobile;
