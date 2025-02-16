import React, { useState, useRef } from 'react';
import Btn from "@/components/btn";
import Field from "@/components/field";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/react";
import { Plus } from "lucide-react";
import { useLoaderContext } from '@/core/context/LoaderContext';

export default function New() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [form, setForm] = useState({ name: '' });
	const formRef = useRef(null);

	const {setIsLoading} = useLoaderContext();

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		if (formRef.current) {
			// formRef.current.reportValidity();
			const formData = new FormData(formRef.current);
		}
		try {
			setIsLoading(true);
			console.log('Form submitted:', form);
			// const response = await fetch('/api/organizations', {
			// 	method: 'POST',
			// 	headers: { 'Content-Type': 'application/json' },
			// 	body: JSON.stringify(form),
			// });
			// if (response.ok) {
			// 	console.log('Organization created successfully');
			// 	onOpenChange(); // Close the modal on success
			// } else {
			// 	console.error('Failed to create organization');
			// }
			setTimeout(() => {
				setIsLoading(false);
				onOpenChange();
			}, 5000);
		} catch (error) {
			console.error('Error creating user:', error);
		}
	};

	const onSubmit = () => {
		handleSubmit(new Event('submit'));
	};

	return (
		<>
			<Btn onPress={onOpen}>
				<Plus />
				Ajouter
			</Btn>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange} radius="sm">
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1 font-normal">Ajouter un utilisateur</ModalHeader>
							<ModalBody>
								<form ref={formRef} onSubmit={handleSubmit}>
									<Field
										name="name"
										label="Nom"
										value={form.name}
									/>
								</form>
							</ModalBody>
							<ModalFooter>
								<Btn onPress={onClose} variant="light">
									Annuler
								</Btn>
								<Btn onPress={onSubmit}>
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
