"use client";
import React, { useState, useRef } from 'react';
import Field from "@/components/field";
import Modal from '@/components/modal';
import { useOrganisationStore } from '@/store/admin/organisationStore';
import { useRouter } from 'next/navigation';

export default function New() {
	const router = useRouter();

	const basePath = '/admin/organisations';

	const { create } = useOrganisationStore();

	const onSubmit = async (formData: FormData) => {
		const data = await create(formData as Partial<Organisation>);
		if (!data) {
			return;
		}
		router.push(basePath + '/' + data.id);
	}

	return (
		<Modal 
			title="Nouvelle organisation"
			text='Ajouter'
			onSubmit={onSubmit}
		>
			<Field label="Nom" name="name" required />
		</Modal>
	);
}
