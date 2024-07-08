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

const BookmarkButton = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        onPress={onOpen}
        size="lg"
        variant="flat"
        color="warning"
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
                <MyPageBookmark />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default BookmarkButton;
