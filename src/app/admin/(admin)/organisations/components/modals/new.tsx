"use client";
import React, { useState, useRef } from 'react';
import Field from "@/components/field";
import ModalNew from '@/components/modalNew';
import { useOrganisationStore } from '@/store/admin/organisationStore';

export default function New() {
	return (
		<ModalNew 
			title="Nouvelle organisation"
			text='Ajouter'
			basePath='/admin/organisations'
			store={useOrganisationStore()}
		>
			<Field label="Nom" name="name" required />
		</ModalNew>
	);
}
