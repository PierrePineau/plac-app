"use client";
import HeaderPage from "@components/HeaderPage";
import { useLoaderContext } from "@/core/context/LoaderContext";
import { get } from "@/core/services/api.helper";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
	const { id } = useParams();
	const [organisation, setOrganisation] = useState<Organisation | null>(null);

	const { setIsLoading } = useLoaderContext();
	// const
	useEffect(() => {
		setIsLoading(true);
		if (id) {
			get(`/admin/organisations/${id}`).then((org: any) => {
				setOrganisation(org);
				setIsLoading(false);
			});
		}
	}, [id]);

	return (
		<>
            <HeaderPage title={organisation ? organisation.name : ''} showBreadcrumb={true}>
				{/* // Les actions disponibles */}
			</HeaderPage>
		</>
	);
}
