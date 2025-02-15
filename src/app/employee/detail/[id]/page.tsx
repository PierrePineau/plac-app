"use client";

import NavBar from "@/app/components/navBar";
import "../../../globals.css";
import Header from "@/app/components/header";
import CustomButton from "@/app/components/custombutton";
import { FileEdit, Home, Mail, Phone, Trash, Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useEmployeStore } from "@/store/user/employeeStore";
import BubbleText from "@/app/components/bubbleText";
import Tabs from "@/app/components/tabs";
import EndOfSheetsTabComponentGrid from "../tabsComponents/endOfdaySheetsTab";
import PointagesTabComponentGrid from "../tabsComponents/pointage";
import Popup from "@/app/components/popup";
import CreateOrModifyEmployee from "../../components/createOrModifyEmployee";

export default function EmployeeDetail() {
  const router = useRouter();
  const { id } = useParams();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupDeleteOpen, setIsPopupDeleteOpen] = useState(false);
  const getEmployeeById = useEmployeStore(
    (state: any) => state.getEmployeeById
  );
  const fetchEmployes = useEmployeStore((state: any) => state.fetchEmployes);
  const [employee, setEmployee] = useState<Employe | null>(null);

  const handleModifyEmployee = () => {
    setIsPopupOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setIsPopupDeleteOpen(false);
    document.body.style.overflow = "";
  };

  const handleDeleteEmployee = () => {
    setIsPopupDeleteOpen(true);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    if (id) {
      const employe = getEmployeeById(Number(id));
      if (employe) {
        setEmployee(employe);
      } else {
        fetchEmployes().then(() => {
          const fetchedEmploye = getEmployeeById(Number(id));
          setEmployee(fetchedEmploye || null);
        });
      }
    }
  }, [id, getEmployeeById, fetchEmployes]);

  if (!employee) {
    return <div>Chargement des détails de l'employé...</div>;
  }

  const tabs = [
    {
      label: "Fiches de fin de journée",
      content: (
        <EndOfSheetsTabComponentGrid endOfSheets={employee.endOfSheets} />
      )
    },
    {
      label: "Pointages",
      content: <PointagesTabComponentGrid pointages={employee.pointage} />
    }
  ];

  return (
    <div className="flex flex-row bg-white h-full">
      <div className="sticky bg-white hidden md:block border-r border-neutral-200">
        <NavBar />
      </div>

      <div className="flex flex-col w-full">
        <div className="top-0 bg-white z-10 border-b border-neutral-200">
          <Header />
        </div>
        <div className="flex flex-col bg-white overflow-auto p-8 gap-8">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-1">
              <p className="text-neutral-400 font-satoshi text-paragraphMedium">
                Mes employés /
              </p>
              <p className="text-neutral-950 text-paragraphMedium font-satoshi">
                {employee.firstname} {employee.lastname}
              </p>
            </div>
            <div className="flex flex-row justify-between pt-8">
              <div className="flex flex-row gap-2 w-full items-center">
                <img
                  className="w-24 h-24 rounded-lg object-cover"
                  src={employee.avatar || "/asset/img/yard.jpeg"}
                  alt={employee.firstname}
                />

                <h1 className="font-satoshi text-h1Desktop text-neutral-900">
                  {employee.firstname} {employee.lastname}
                </h1>
              </div>
              <div className="flex flex-row gap-4 max-h-12 w-full">
                <CustomButton
                  text="Supprimer"
                  icon={<Trash2 />}
                  color="bg-red-500"
                  textColor="text-white"
                  onClick={handleDeleteEmployee}
                  hover={"bg-red-600"}
                />
                <div className="flex w-full">
                  <CustomButton
                    text="Modifier les informations"
                    icon={<FileEdit />}
                    color="bg-brand-950"
                    textColor="text-white"
                    onClick={handleModifyEmployee}
                    hover={"bg-brand-1000"}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-paragraphBold font-satoshi text-neutral-950">
              À Propos
            </h1>
            <div className="flex flex-row gap-10">
              <div className="flex items-center space-x-3">
                <BubbleText
                  icon={<Mail className="text-brand-500" />}
                  widthBubble="w-12"
                  heightBubble="h-12"
                  widthSubBubble="w-10"
                  heightSubBubble="h-10"
                />
                <div>
                  <p className="text-sm font-satoshi text-neutral-500">Email</p>
                  <p className="font-satoshi text-paragraphBold text-neutral-950">
                    {employee.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <BubbleText
                  icon={<Phone className="text-brand-500" />}
                  widthBubble="w-12"
                  heightBubble="h-12"
                  widthSubBubble="w-10"
                  heightSubBubble="h-10"
                />
                <div>
                  <p className="text-sm font-satoshi text-neutral-500">
                    Numéro de téléphone
                  </p>
                  <p className="font-satoshi text-paragraphBold text-neutral-950">
                    {employee.telephone}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <BubbleText
                  icon={<Home className="text-brand-500" />}
                  widthBubble="w-12"
                  heightBubble="h-12"
                  widthSubBubble="w-10"
                  heightSubBubble="h-10"
                />
                <div>
                  <p className="text-sm font-satoshi text-neutral-500">
                    Adresse
                  </p>
                  <p className="font-satoshi text-paragraphBold text-neutral-950">
                    {employee.firstname}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Tabs tabs={tabs} />
        </div>
      </div>
      <Popup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        title="Modifier les informations">
        <CreateOrModifyEmployee
          onSubmit={() => {}}
          submitLabel={"Enregistrer les modifications"}
          defaultValues={employee}
        />
      </Popup>
      <Popup
        isOpen={isPopupDeleteOpen}
        onClose={handleClosePopup}
        title="Supprimer cet employé"
        desc="Cette action est irréversible">
        <div className="flex flex-row gap-2 items-end justify-end">
          <button
            type="submit"
            className="bg-neutral-50 text-neutral-950 font-satoshi text-paragraphRegular px-4 py-2 rounded-md hover:bg-neutral-100">
            Annuler
          </button>
          <button
            type="submit"
            className="bg-negative-500 text-white font-satoshi text-paragraphRegular px-4 py-2 rounded-md hover:bg-negative-600">
            Supprimer
          </button>
        </div>
      </Popup>
    </div>
  );
}
