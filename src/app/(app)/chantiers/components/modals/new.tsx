"use client";
import React, { useState, useRef } from 'react';
import Field from "@/components/field";
import ModalNew from '@/components/modal';
import { useProjectStore } from '@/store/user/projectStore';

export default function New() {
	return (
		<ModalNew 
			title="Nouveau chantier"
			text='Ajouter un chantier'
			basePath='/chantiers'
			store={useProjectStore()}
		>
			<Field label="Nom" name="name" required />
		</ModalNew>
	);
}
