"use client";
import React, { useState, useRef } from 'react';
import Btn from "@/components/btn";
import { Modal as HerouiModal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/react";
import { Plus } from "lucide-react";

interface ModalProps {
	basePath?: string;
	store: any;
	children?: React.ReactNode;
	text?: string;
	icon?: React.ReactNode;
	title?: string;
	onSubmit: (e: any) => Promise<ArrayBuffer | null>;
}


export default function Modal({
	children,
	text = 'Ajouter',
	icon = <Plus />,
	title = 'Ajouter',
	onSubmit,
  }: ModalProps) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const formRef = useRef(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		
		try {
			setIsSubmitting(true);
			if (formRef.current) {
				// formRef.current.reportValidity();
				const formData = new FormData(formRef.current);
				onSubmit(formData);
				setIsSubmitting(false);
			}
		} catch (error) {
			console.error('Error creating:', error);
		}
	};

	return (
		<>
			<Btn onPress={onOpen}>
				{icon}
				{text}
			</Btn>
			<HerouiModal isOpen={isOpen} onOpenChange={onOpenChange} radius="sm">
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1 font-normal">{title}</ModalHeader>
							<ModalBody>
								<form ref={formRef} onSubmit={handleSubmit}>
									{children}
								</form>
							</ModalBody>
							<ModalFooter>
								<Btn onPress={onClose} variant="light">
									Annuler
								</Btn>
								<Btn onPress={handleSubmit} isLoading={isSubmitting}>
									Ajouter
								</Btn>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</HerouiModal>
		</>
	);
}
