"use client";

import Header from "@/components/HeaderPage";
import { FileEdit, Home, Mail, Phone, Trash, Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Tabs from "@/components/Tabs";
// import EndOfSheetsTabComponentGrid from "../components/endOfdaySheetsTab";
// import PointagesTabComponentGrid from "../components/pointage";
import Popup from "@/components/Popup";
// import CreateOrModifyEmployee from "../components/CreateOrModifyEmployee";
import Spinner from "@/components/Spinner";
import { useUserStore } from "@/store/user/userStore";
import { useLoaderContext } from "@/core/context/LoaderContext";
import HeaderPage from "@/components/HeaderPage";

export default function EmployeeDetail() {
	const router = useRouter();
	const { id } = useParams();
	const [employee, setEmployee] = useState<User | null>(null);
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [isPopupDeleteOpen, setIsPopupDeleteOpen] = useState(false);
	const { getOneById } = useUserStore();
	const { setIsLoading } = useLoaderContext();

	// const handleModifyEmployee = () => {
	// 	setIsPopupOpen(true);
	// 	document.body.style.overflow = "hidden";
	// };

	// const handleClosePopup = () => {
	// 	setIsPopupOpen(false);
	// 	setIsPopupDeleteOpen(false);
	// 	document.body.style.overflow = "";
	// };

	// const handleDeleteEmployee = () => {
	// 	setIsPopupDeleteOpen(true);
	// 	document.body.style.overflow = "hidden";
	// };
	useEffect(() => {
		setIsLoading(true);
		if (id) {
			const employe = getOneById(id as string);
			if (employe) {
				setEmployee(employe);
			}
			// else {
			//   fetchEmployes().then(() => {
			//     const fetchedEmploye = getEmployeeById(Number(id));
			//     setEmployee(fetchedEmploye || null);
			//   });
			// }
		}
		setIsLoading(false);
	}, [id, getOneById]);

	if (!employee) {
		return <Spinner message="Chargement des détails de l'employé..." />;
	}

	// const tabs = [
	// 	{
	// 		label: "Fiches de fin de journée",
	// 		content: <EndOfSheetsTabComponentGrid endOfSheets={employee.endOfSheets} />,
	// 	},
	// 	{
	// 		label: "Pointages",
	// 		content: <PointagesTabComponentGrid pointages={employee.pointage} />,
	// 	},
	// ];

	return (
		<>
            <HeaderPage title={employee ? employee.firstname : ''} showBreadcrumb={true}>
				{/* // Les actions disponibles */}
			</HeaderPage>
		</>
	);

	// return (
	// 	<div className="flex flex-row bg-white h-full">
	// 		<div className="sticky bg-white hidden md:block border-r border-neutral-200">
	// 			<NavBar />
	// 		</div>

	// 		<div className="flex flex-col w-full">
	// 			<div className="top-0 bg-white z-10 border-b border-neutral-200">
	// 				<Header />
	// 			</div>
	// 			<div className="flex flex-col bg-white overflow-auto p-8 gap-8">
	// 				<div className="flex flex-col gap-2">
	// 					<div className="flex flex-row gap-1">
	// 						<p className="text-neutral-400   text-paragraphMedium">Mes employés /</p>
	// 						<p className="text-neutral-950 text-paragraphMedium  ">
	// 							{employee.firstname} {employee.lastname}
	// 						</p>
	// 					</div>
	// 					<div className="flex flex-row justify-between pt-8">
	// 						<div className="flex flex-row gap-2 w-full items-center">
	// 							<img className="w-24 h-24 rounded-lg object-cover" src={"/asset/img/yard.jpeg"} alt={employee.firstname} />

	// 							<h1 className="  text-h1Desktop text-neutral-900">
	// 								{employee.firstname} {employee.lastname}
	// 							</h1>
	// 						</div>
	// 						<div className="flex flex-row gap-4 max-h-12 w-full">
	// 							<CustomButton text="Supprimer" icon={<Trash2 />} color="bg-red-500" textColor="text-white" onClick={handleDeleteEmployee} hover={"bg-red-600"} />
	// 							<div className="flex w-full">
	// 								<CustomButton text="Modifier les informations" icon={<FileEdit />} color="bg-brand-950" textColor="text-white" onClick={handleModifyEmployee} hover={"bg-brand-1000"} />
	// 							</div>
	// 						</div>
	// 					</div>
	// 				</div>
	// 				<div className="flex flex-col gap-4">
	// 					<h1 className="text-paragraphBold   text-neutral-950">À Propos</h1>
	// 					<div className="flex flex-row gap-10">
	// 						<div className="flex items-center space-x-3">
	// 							<BubbleText icon={<Mail className="text-brand-500" />} widthBubble="w-12" heightBubble="h-12" widthSubBubble="w-10" heightSubBubble="h-10" />
	// 							<div>
	// 								<p className="text-sm   text-neutral-500">Email</p>
	// 								<p className="  text-paragraphBold text-neutral-950">{employee.email}</p>
	// 							</div>
	// 						</div>
	// 						<div className="flex items-center space-x-3">
	// 							<BubbleText icon={<Phone className="text-brand-500" />} widthBubble="w-12" heightBubble="h-12" widthSubBubble="w-10" heightSubBubble="h-10" />
	// 							<div>
	// 								<p className="text-sm   text-neutral-500">Numéro de téléphone</p>
	// 								<p className="  text-paragraphBold text-neutral-950">{employee.telephone}</p>
	// 							</div>
	// 						</div>
	// 						<div className="flex items-center space-x-3">
	// 							<BubbleText icon={<Home className="text-brand-500" />} widthBubble="w-12" heightBubble="h-12" widthSubBubble="w-10" heightSubBubble="h-10" />
	// 							<div>
	// 								<p className="text-sm   text-neutral-500">Adresse</p>
	// 								<p className="  text-paragraphBold text-neutral-950">{employee.firstname}</p>
	// 							</div>
	// 						</div>
	// 					</div>
	// 				</div>
	// 				<Tabs tabs={tabs} />
	// 			</div>
	// 		</div>
	// 		<Popup isOpen={isPopupOpen} onClose={handleClosePopup} title="Modifier les informations">
	// 			<CreateOrModifyEmployee onSubmit={() => {}} submitLabel={"Enregistrer les modifications"} defaultValues={employee} />
	// 		</Popup>
	// 		<Popup isOpen={isPopupDeleteOpen} onClose={handleClosePopup} title="Supprimer cet employé" desc="Cette action est irréversible">
	// 			<div className="flex flex-row gap-2 items-end justify-end">
	// 				<button type="submit" className="bg-neutral-50 text-neutral-950   text-paragraphRegular px-4 py-2 rounded-md hover:bg-neutral-100">
	// 					Annuler
	// 				</button>
	// 				<button type="submit" className="bg-negative-500 text-white   text-paragraphRegular px-4 py-2 rounded-md hover:bg-negative-600">
	// 					Supprimer
	// 				</button>
	// 			</div>
	// 		</Popup>
	// 	</div>
	// );
}
