"use client";
import React, { useState, useRef } from 'react';
import Btn from "@/components/btn";
import Field from "@/components/field";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

interface ModalNewProps {
	basePath?: string;
	store: any;
	children?: React.ReactNode;
	text?: string;
	icon?: React.ReactNode;
	title?: string;
}


export default function ModalNew({
	basePath = '/projects',
	store = null,
	children,
	text = 'Ajouter',
	icon = <Plus />,
	title = 'Ajouter',
  }: ModalNewProps) {
	const router = useRouter();
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const formRef = useRef(null);

	const { create } = store;

	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		
		try {
			if (formRef.current) {
				// formRef.current.reportValidity();
				const formData = new FormData(formRef.current);
				setIsSubmitting(true);
				console.log('Form submitted:', formData);

				const data = await create(formData);

				if (!data) {
					setIsSubmitting(false);
					return;
				}
				router.push(basePath + '/' + data.id);
				setIsSubmitting(false);
			}
		} catch (error) {
			console.error('Error creating:', error);
		}
	};

	const onSubmit = () => {
		handleSubmit(new Event('submit'));
	};

	return (
		<>
			<Btn onPress={onOpen}>
				{icon}
				{text}
			</Btn>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange} radius="sm">
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
								<Btn onPress={onSubmit} isLoading={isSubmitting}>
									Ajouter
								</Btn>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
