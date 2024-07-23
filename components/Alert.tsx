"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

interface IMessage {
  message: any;
  title: string;
  routeButton?: string;
  routeHref?: string;
}

const AlertModal = ({
  message,
  title,
  routeButton,
  routeHref,
  onClose,
}: IMessage & { onClose: () => void }) => {
  const { isOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  return (
    <>
      <Modal isOpen={true} onOpenChange={onOpenChange} hideCloseButton>
        <ModalContent>
          {(onCloseModal) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>
                <p>{message}</p>
              </ModalBody>
              <ModalFooter>
                {routeButton && routeHref ? (
                  <Button
                    color="danger"
                    variant="light"
                    onPress={() => router.push(routeHref)}
                  >
                    {routeButton}
                  </Button>
                ) : (
                  <></>
                )}

                <Button color="primary" onPress={onClose}>
                  확인
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export const useAlert = () => {
  const [alertState, setAlertState] = useState<{
    title: string;
    message: string;
    routeButton?: string;
    routeHref?: string;
  } | null>(null);

  const showAlert = (
    title: string,
    message: string,
    routeButton?: string,
    routeHref?: string
  ) => {
    setAlertState({ title, message, routeButton, routeHref });
  };

  const hideAlert = () => {
    setAlertState(null);
  };

  const AlertComponent = () => {
    if (!alertState) return null;

    return (
      <AlertModal
        title={alertState.title}
        message={alertState.message}
        routeButton={alertState.routeButton}
        routeHref={alertState.routeHref}
        onClose={hideAlert}
      />
    );
  };

  return { showAlert, AlertComponent };
};
