"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import { FaSearch } from "react-icons/fa";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import {
  Table,
  TableHeader,
  TableBody,
  TableCell,
  TableColumn,
  TableRow,
} from "@nextui-org/table";
import { useRefrigeratorContext } from "@/app/myrefrigerator/provider";
import { getMultiSearch } from "./action";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import RecipeButton from "../Recommend/RecipeButton";
import Image from "next/image";
import FoodCard from "../Recommend/FoodCard";
interface IRecipe {
  recipe_id: number;
  recipe_title: string;
  recipe_thumbnail: string;
  cate_no: number;
  situ_no: number;
}
const SearchButton = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { refrig } = useRefrigeratorContext();
  const data = refrig?.refrigerators;

  const [selectedIngredients, setSelectedIngredients] = useState<Set<string>>(
    new Set()
  );
  const [searchResults, setSearchResults] = useState<IRecipe[]>([]);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);

  function handleSelectionChange(selected: Set<string>) {
    setSelectedIngredients(selected);
  }

  async function searchMultipleRecipe() {
    const ingredientNames = Array.from(selectedIngredients);

    const res = await getMultiSearch(ingredientNames);
    if (res.message && res.message == "일치하는 재료가 없습니다.")
      setSearchResults([]);
    else setSearchResults(res.search_list);
    setIsResultModalOpen(true);
  }
  return (
    <div>
      <Button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition ease-in-out duration-300"
        onPress={onOpen}
      >
        <FaSearch /> 검색
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                재료 검색
              </ModalHeader>
              <ModalBody>
                <Accordion selectionMode="multiple">
                  {data && data.length > 0 ? (
                    data.map((col) => (
                      <AccordionItem
                        key={col.refrig.refrigerator_id}
                        aria-label={`Refrigerator ${col.refrig.refrigerator_name}`}
                        title={
                          <div>
                            {col.refrig.refrigerator_name}{" "}
                            {col.ingredients.length}
                          </div>
                        }
                      >
                        <Table
                          aria-label={`Ingredients in ${col.refrig.refrigerator_name}`}
                          selectionMode="multiple"
                          color="warning"
                          selectedKeys={selectedIngredients}
                          onSelectionChange={(keys) =>
                            handleSelectionChange(keys as Set<string>)
                          }
                        >
                          <TableHeader>
                            <TableColumn>NAME</TableColumn>
                            <TableColumn>EXPIRED DATE</TableColumn>
                          </TableHeader>
                          <TableBody>
                            {col.ingredients.map((ing) => (
                              <TableRow key={ing.refrigerator_ing_name}>
                                <TableCell>
                                  {ing.refrigerator_ing_name}
                                </TableCell>
                                <TableCell>{ing.expired_date}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </AccordionItem>
                    ))
                  ) : (
                    <div>No data available</div>
                  )}
                </Accordion>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  닫기
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    searchMultipleRecipe();
                  }}
                >
                  검색
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isResultModalOpen}
        onOpenChange={(open) => setIsResultModalOpen(open)}
        size="3xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 font-jua text-3xl my-5">
                검색 결과
              </ModalHeader>
              <ModalBody>
                {searchResults && searchResults.length === 0 ? (
                  <div className="text-center py-10 text-xl font-jua">
                    텅 비었네요
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                    {searchResults.map((food, i) => (
                      <FoodCard cName="refrigSearch" index={i} food={food} />
                      // <Card key={i} className="py-4" isPressable>
                      //   <CardHeader className="pb-0 pt-2 px-4 flex-col">
                      //     <h4 className="font-bold text-large">
                      //       {food.recipe_title}
                      //     </h4>
                      //   </CardHeader>
                      //   <CardBody className="overflow-visible py-2 flex items-center">
                      //     <Image
                      //       alt={food.recipe_title}
                      //       className="object-cover rounded-xl"
                      //       src={food.recipe_thumbnail}
                      //       width={200}
                      //       height={200}
                      //     />
                      //   </CardBody>
                      //   <RecipeButton recipe_no={food.recipe_id} />
                      // </Card>
                    ))}
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  닫기
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SearchButton;
