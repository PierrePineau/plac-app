"use client";
import HeaderPage from "@/components/headerpage";
import { useLoaderContext } from "@/core/context/LoaderContext";
import { useApiService } from "@/core/services/api.service";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
	const { id } = useParams();
	const [organisation, setOrganisation] = useState<Organisation | null>(null);
	const { fetch } = useApiService();

	const { setIsLoading } = useLoaderContext();
	// const
	useEffect(() => {
		setIsLoading(true);
		if (id) {
			fetch(`/admin/organisations/${id}`).then((org) => {
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
