"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import { AiFillFilter } from "react-icons/ai";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Tooltip } from "@nextui-org/tooltip";
import { FaRegQuestionCircle } from "react-icons/fa";
import { Input } from "@nextui-org/input";
import { Chip } from "@nextui-org/chip";
import { useRouter } from "next/navigation";

const FilterButton: React.FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [foodName, setFoodName] = useState<string>("");
  const [ingredientToAdd, setIngredientToAdd] = useState<string>("");
  const [dislikedIngredients, setDislikedIngredients] = useState<string[]>([]);
  const router = useRouter();

  const addIngredient = (): void => {
    if (ingredientToAdd && dislikedIngredients.length < 5) {
      setDislikedIngredients([...dislikedIngredients, ingredientToAdd]);
      setIngredientToAdd("");
    }
  };

  const removeIngredient = (index: number): void => {
    setDislikedIngredients(dislikedIngredients.filter((_, i) => i !== index));
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.append("foodName", foodName);
    dislikedIngredients.forEach((ingredient, index) => {
      params.append(`dislikedIngredient${index + 1}`, ingredient);
    });
    router.push(`/search/filtered?${params.toString()}`);
  };

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
                  <Input
                    placeholder="음식 이름"
                    label="음식"
                    value={foodName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFoodName(e.target.value)
                    }
                  />
                </div>
                <div className="flex flex-row gap-1 items-center">
                  <p className="p-5 font-jua">빼고 싶어요 (최대 5개)</p>
                  <Tooltip content="먹기 싫은 아이템은 저장해둘 수 있습니다.">
                    <Button isIconOnly variant="light">
                      <FaRegQuestionCircle />
                    </Button>
                  </Tooltip>
                </div>

                <div className="flex flex-row gap-1 items-center justify-center">
                  <Input
                    label="필터링 할 음식"
                    placeholder="음식 재료 검색"
                    value={ingredientToAdd}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setIngredientToAdd(e.target.value)
                    }
                  />
                  <Button
                    variant="flat"
                    color="warning"
                    size="lg"
                    onPress={addIngredient}
                    isDisabled={dislikedIngredients.length >= 5}
                  >
                    추가
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {dislikedIngredients.map((ingredient, index) => (
                    <Chip
                      key={index}
                      onClose={() => removeIngredient(index)}
                      variant="flat"
                    >
                      {ingredient}
                    </Chip>
                  ))}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  닫기
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    handleSearch();
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

export default FilterButton;
