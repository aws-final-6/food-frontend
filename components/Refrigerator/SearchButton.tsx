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

const SearchButton = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { refrig } = useRefrigeratorContext();
  const data = refrig?.refrigerators;

  const [selectedIngredients, setSelectedIngredients] = useState<Set<string>>(
    new Set()
  );

  function handleSelectionChange(selected: Set<string>) {
    setSelectedIngredients(selected);
  }

  async function searchMultipleRecipe() {
    const ingredientNames = Array.from(selectedIngredients);
    console.log("Selected ingredients:", ingredientNames);
    const res = await getMultiSearch(ingredientNames);
    console.log(res);
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
                    onClose();
                  }}
                >
                  검색
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
