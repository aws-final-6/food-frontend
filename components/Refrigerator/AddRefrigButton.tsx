import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import React, { FormEvent, useContext, useState } from "react";
import { refrigType } from "../refigType";
import { Select, SelectItem } from "@nextui-org/select";
import { UserContext } from "@/providers/userProvider";
import { addRefrigerator } from "./action";
import { useRefrigeratorContext } from "@/app/myrefrigerator/provider";

const AddRefrigButton = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { setRefrig } = useRefrigeratorContext();
  const [rName, setRName] = useState("");
  const [rType, setRType] = useState("냉장");

  const { userData } = useContext(UserContext);

  async function addRefrig(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);
    formdata.append("refrig_type", rType);
    formdata.append("refrig_name", rName);
    if (userData) formdata.append("user_id", userData.id);
    const res = await addRefrigerator(formdata);
    setRefrig(res);
  }

  return (
    <div>
      <Button
        className="bg-sub text-gray-700 font-bold py-2 px-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:ring-opacity-75 transition ease-in-out duration-300"
        onPress={onOpen}
      >
        + 냉장고 추가
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                냉장고 칸 추가
              </ModalHeader>
              <form onSubmit={addRefrig}>
                <ModalBody>
                  <Input
                    type="text"
                    name="refrig_name"
                    label="냉장고 칸 이름"
                    isRequired
                    value={rName}
                    onChange={(e) => {
                      setRName(e.target.value);
                    }}
                  />
                  <Select
                    items={refrigType}
                    value={rType}
                    onChange={(e) => {
                      setRType(e.target.value);
                    }}
                    label="냉장고 종류 선택"
                    name="refrig_type"
                    className="max-w-xs"
                    isRequired
                  >
                    {(refrig) => (
                      <SelectItem key={refrig.key}>{refrig.label}</SelectItem>
                    )}
                  </Select>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    닫기
                  </Button>
                  <Button color="primary" onPress={onClose} type="submit">
                    저장
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddRefrigButton;
