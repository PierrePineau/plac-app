"use client";

import NavBar from "@/app/components/navBar";
import "../../../globals.css";
import Header from "@/app/components/header";
import CustomButton from "@/app/components/custombutton";
import { FileEdit } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useEmployeStore } from "@/store/employeeStore";

export default function EmployeeDetail() {
  const router = useRouter();
  const { id } = useParams();
  const getEmployeById = useEmployeStore((state: any) => state.getEmployeById);
  const fetchEmployes = useEmployeStore((state: any) => state.fetchEmployes);
  const [employee, setEmployee] = useState<Employe | null>(null);

  useEffect(() => {
    if (id) {
      const employe = getEmployeById(Number(id));
      if (employe) {
        setEmployee(employe);
      } else {
        fetchEmployes().then(() => {
          const fetchedEmploye = getEmployeById(Number(id));
          setEmployee(fetchedEmploye || null);
        });
      }
    }
  }, [id, getEmployeById, fetchEmployes]);

  if (!employee) {
    return <div>Chargement des détails de l'employé...</div>;
  }

  return (
    <div className="flex flex-row bg-white h-full">
      <div className="sticky bg-white hidden md:block border-r border-neutral-200">
        <NavBar />
      </div>

      <div className="flex flex-col w-full">
        <div className="top-0 bg-white z-10 border-b border-neutral-200">
          <Header />
        </div>
        <img
          className="w-full max-h-72 object-cover"
          src={employee.avatar || "/asset/img/default-avatar.jpeg"}
          alt={employee.firstName}
        />
        <div className="flex flex-col bg-white overflow-auto p-8 gap-8">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-1">
              <p className="text-neutral-400 font-satoshi text-paragraphMedium">
                Mes employés /
              </p>
              <p className="text-neutral-950 text-paragraphMedium font-satoshi">
                {employee.firstName} {employee.lastName}
              </p>
            </div>
            <div className="flex flex-row justify-between">
              <h1 className="font-satoshi text-h1Desktop text-neutral-900">
                {employee.firstName} {employee.lastName}
              </h1>
              <CustomButton
                text="Modifier les informations"
                icon={<FileEdit />}
                color="bg-brand-950"
                textColor="text-white"
                onClick={() => router.push(`/employees/edit/${employee.id}`)}
                hover={""}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-neutral-700 text-paragraphMedium">
              Email : {employee.email}
            </p>
            <p className="text-neutral-700 text-paragraphMedium">
              Téléphone : {employee.phone}
            </p>
            <p className="text-neutral-700 text-paragraphMedium">
              Adresse : {employee.address}
            </p>
            <p className="text-neutral-700 text-paragraphMedium">
              Rôle : {employee.role}
            </p>
            <p className="text-neutral-700 text-paragraphMedium">
              Statut : {employee.enable}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
