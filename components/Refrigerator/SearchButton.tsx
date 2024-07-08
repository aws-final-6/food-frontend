import React from "react";
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

const data = [
  {
    refrig: {
      refrigerator_id: 1,
      refrigerator_name: "냉장고",
      refrigerator_type: 1,
    },
    ingredients: [
      {
        refrigerator_id: 1,
        refrigerator_ing_name: "감자",
        enter_date: "2024-07-10",
        expired_date: "2024-06-20",
        refrigerator_ing_id: 1,
        color: "norang",
      },
      {
        refrigerator_id: 1,
        refrigerator_ing_name: "당근",
        enter_date: "2024-07-10",
        expired_date: "2024-06-20",
        refrigerator_ing_id: 2,
        color: "norang",
      },
    ],
  },
  {
    refrig: {
      refrigerator_id: 2,
      refrigerator_name: "냉동고",
      refrigerator_type: 2,
    },
    ingredients: [
      {
        refrigerator_id: 2,
        refrigerator_ing_name: "요구르트",
        enter_date: "2024-07-10",
        expired_date: "2024-06-20",
        refrigerator_ing_id: 3,
        color: "norang",
      },
    ],
  },
];

const SearchButton = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
                  {data.map((col) => (
                    <AccordionItem
                      key={col.refrig.refrigerator_id}
                      aria-label={col.refrig.refrigerator_name}
                      title={col.refrig.refrigerator_name}
                    >
                      <Table selectionMode="multiple" color="warning">
                        <TableHeader>
                          <TableColumn>NAME</TableColumn>
                          <TableColumn>EXPIRED DATE</TableColumn>
                        </TableHeader>
                        <TableBody>
                          {col.ingredients.map((ing) => (
                            <TableRow key={ing.refrigerator_ing_id}>
                              <TableCell>{ing.refrigerator_ing_name}</TableCell>
                              <TableCell>{ing.expired_date}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </AccordionItem>
                  ))}
                </Accordion>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  닫기
                </Button>
                <Button color="primary" onPress={onClose}>
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
