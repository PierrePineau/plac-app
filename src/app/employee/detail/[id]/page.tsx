"use client";

import NavBar from "@/app/components/navBar";
import "../../../globals.css";
import Header from "@/app/components/header";
import CustomButton from "@/app/components/custombutton";
import { FileEdit, Home, Mail, Phone, Trash, Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useEmployeStore } from "@/store/employeeStore";
import BubbleText from "@/app/components/bubbleText";
import Tabs from "@/app/components/tabs";
import EndOfSheetsTabComponentGrid from "../tabsComponents/endOfdaySheetsTab";

export default function EmployeeDetail() {
  const router = useRouter();
  const { id } = useParams();
  const getEmployeeById = useEmployeStore(
    (state: any) => state.getEmployeeById
  );
  const fetchEmployes = useEmployeStore((state: any) => state.fetchEmployes);
  const [employee, setEmployee] = useState<Employe | null>(null);

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
      content: <EndOfSheetsTabComponentGrid endOfSheets={employee.endOfSheets} />
    },
    {
      label: "Pointages",
      content: <></>
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
              <div className="flex flex-row gap-2 w-full justify-start items-center">
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
                  onClick={() => router.push(`/employees/edit/${employee.id}`)}
                  hover={"bg-red-600"}
                />
                <CustomButton
                  text="Modifier les informations"
                  icon={<FileEdit />}
                  color="bg-brand-950"
                  textColor="text-white"
                  onClick={() => router.push(`/employees/edit/${employee.id}`)}
                  hover={"bg-brand-1000"}
                />
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
    </div>
  );
}
