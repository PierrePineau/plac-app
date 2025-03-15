"use client";
import React, { useState, useRef } from "react";
import Btn from "@/components/Btn";
import {
  Modal as HerouiModal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from "@heroui/react";
import { Plus } from "lucide-react";

interface ModalProps {
  basePath?: string;
  store?: any;
  children?: React.ReactNode;
  text?: string;
  icon?: React.ReactNode;
  title?: string;
  subtitle?: string;
  buttonValidationTitle?: string;
  onSubmit: (formData: FormData) => Promise<void>;
}

export default function Modal({
  children,
  text = "Ajouter",
  icon = <Plus />,
  title = "Ajouter",
  subtitle,
  buttonValidationTitle = "Ajouter",
  onSubmit
}: ModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const formRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e?: any) => {
    if (e && typeof e.preventDefault === "function") {
      e.preventDefault();
    }
    try {
      setIsSubmitting(true);
      if (formRef.current) {
        const formData = new FormData(formRef.current);
        await onSubmit(formData);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error creating:", error);
    }
  };

  return (
    <>
      <Btn onPress={onOpen}>
        {icon}
        {text}
      </Btn>
      <HerouiModal isOpen={isOpen} scrollBehavior={"inside"} onOpenChange={onOpenChange} radius="sm" size="xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 font-normal">
                {title}
              </ModalHeader>
              <ModalBody>
                {subtitle && <p className="text-neutral-400">{subtitle}</p>}
                <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                  {children}
                </form>
              </ModalBody>
              <ModalFooter>
                <Btn onPress={onClose} variant="light">
                  Annuler
                </Btn>
                <Btn onPress={() => handleSubmit()} isLoading={isSubmitting}>
                  {buttonValidationTitle}
                </Btn>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </HerouiModal>
    </>
  );
}
