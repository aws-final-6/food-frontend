"use client";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import React, { useState } from "react";
import MyPageBookmark from "../Bookmark/MyPageBookmark";
import { FaRegStar } from "react-icons/fa";

interface ILog {
  callPosition: string;
}

const BookmarkButton = ({ callPosition }: ILog) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        onPress={onOpen}
        size="lg"
        className="bg-sub"
        startContent={<FaRegStar />}
      >
        즐겨찾기
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="transparent"
        shouldBlockScroll={false}
        className="py-10"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 font-jua">
                즐겨찾기
              </ModalHeader>
              <ModalBody>
                <MyPageBookmark callPosition={callPosition} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default BookmarkButton;
