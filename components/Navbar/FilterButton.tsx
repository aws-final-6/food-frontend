"use client";
import { Button } from "@nextui-org/button";
import React from "react";
import { AiFillFilter } from "react-icons/ai";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Tooltip } from "@nextui-org/tooltip";
import { FaRegQuestionCircle } from "react-icons/fa";

const ingredient = [
  {
    ingredient_id: 1,
    ingredient_name: "감자",
  },
  {
    ingredient_id: 2,
    ingredient_name: "계란",
  },
  {
    ingredient_id: 3,
    ingredient_name: "바나나",
  },
];
const FilterButton = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div>
      <Button isIconOnly onPress={onOpen}>
        <AiFillFilter />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                검색 필터
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-row gap-1 items-center justify-center">
                  <Autocomplete
                    defaultItems={ingredient}
                    label="재료 검색"
                    placeholder="재료를 검색해주세요"
                    className="max-w-xs"
                  >
                    {(ingredient) => (
                      <AutocompleteItem key={ingredient.ingredient_id}>
                        {ingredient.ingredient_name}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                  <Button variant="flat" color="warning" size="lg">
                    추가
                  </Button>
                </div>
                <div className="flex flex-row gap-1 items-center">
                  <p className="p-5 font-jua">먹기 싫어요 (최대 5개)</p>
                  <Button>저장</Button>
                  <Tooltip content="먹기 싫은 아이템은 저장해둘 수 있습니다.">
                    <Button isIconOnly variant="light">
                      <FaRegQuestionCircle />
                    </Button>
                  </Tooltip>
                </div>

                <div className="flex flex-row gap-1 items-center justify-center">
                  <Autocomplete
                    defaultItems={ingredient}
                    label="재료 검색"
                    placeholder="재료 이름을 입력해주세요"
                    className="max-w-xs"
                  >
                    {(ingredient) => (
                      <AutocompleteItem key={ingredient.ingredient_id}>
                        {ingredient.ingredient_name}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                  <Button variant="flat" color="warning" size="lg">
                    추가
                  </Button>
                </div>
                <p className="p-5 font-jua">여러개 검색 (최대 5개)</p>
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

export default FilterButton;
