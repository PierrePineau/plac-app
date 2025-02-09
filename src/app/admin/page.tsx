"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import CustomButton from "../components/custombutton";
import { useOrganisationStore } from "@/store/organisationStore";
import { useEmployeStore } from "@/store/employeeStore";

const Login = () => {
  const router = useRouter();
  const { organisations, fetchOrganisations } = useOrganisationStore();
  const { employes, fetchEmployesByOrganisation } = useEmployeStore();
  const [selectedOrganisation, setSelectedOrganisation] = useState(0);

  useEffect(() => {
    fetchOrganisations();
  }, [fetchOrganisations]);

  useEffect(() => {
    if (selectedOrganisation) {
      fetchEmployesByOrganisation(selectedOrganisation);
    }
  }, [selectedOrganisation, fetchEmployesByOrganisation]);

  return (
    <div className="flex h-full w-full">
      <div className="flex flex-row w-full">
        <div className="bg-brand-950 flex flex-col w-1/2">
          <div className="flex flex-col px-20 py-10 justify-start items-start gap-20">
            <img
              className="w-auto h-8"
              src="/asset/img/whiteLogo.svg"
              alt="Logo Plac"
            />
            <div className="flex flex-col gap-4">
              <h1 className="text-neutral-50 font-satoshi text-5xl">
                Gérer vos chantiers plus facilement
              </h1>
              <p className="text-brand-850 font-satoshi text-paragraphMedium">
                Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                Lorem ipsum Lorem ipsum Lorem ipsum
              </p>
            </div>
          </div>
          <img
            className="flex w-full pl-20"
            src="/asset/img/landingPage.png"
            alt="Logo Plac"
          />
        </div>
        <div className="bg-white w-1/2 px-20 py-10 gap-8 flex flex-col justify-center">
          <div className="flex flex-col flex-1 justify-center gap-8">
            <div>
              <label
                htmlFor="organisation"
                className="font-satoshi text-paragraphMedium text-neutral-950">
                Organisation
              </label>
              <div className="flex items-center h-11 p-3 border border-neutral-200 rounded w-full bg-white font-satoshi text-paragraphMedium text-neutral-950">
                <select
                  id="organisation"
                  name="organisation"
                  className="w-full bg-transparent outline-none appearance-none"
                  required
                  value={selectedOrganisation}
                  onChange={(e) =>
                    setSelectedOrganisation(Number(e.target.value))
                  }>
                  <option value="">Sélectionner une organisation</option>
                  {organisations.map((organisation) => (
                    <option key={organisation.id} value={organisation.id}>
                      {organisation.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="employes"
                className="font-satoshi text-paragraphMedium text-neutral-950">
                Employés
              </label>
              <div className="flex items-center h-11 p-3 border border-neutral-200 rounded w-full bg-white font-satoshi text-paragraphMedium text-neutral-950">
                <select
                  id="employes"
                  name="employes"
                  className="w-full bg-transparent outline-none appearance-none"
                  required>
                  <option value="">Sélectionner un employé</option>
                  {employes.map((employe: Employe) => (
                    <option key={employe.id} value={employe.id}>
                      {employe.username}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-row gap-4 justify-center">
              <CustomButton
                text={"Revenir à la page de connexion"}
                color={"bg-neutral-50"}
                textColor={"text-neutral-950"}
                hover={"bg-neutral-100"}
                border="border border-neutral-200"
                onClick={() => {
                  router.push("/login");
                }}
              />
              <CustomButton
                text={"Se connecter"}
                color={"bg-brand-950"}
                textColor={"text-neutral-50"}
                hover={"bg-brand-1000"}
                onClick={() => {
                  router.push("/home");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
