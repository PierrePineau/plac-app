"use client";
import { useEffect } from "react";
import { useProjectStore } from "@/store/user/projectStore";
import { useClientStore } from "@/store/user/clientStore";
import { useAuthStore } from "@/store/useAuthStore";
import { ArrowUpRight, Blocks, CalendarClock, Users } from "lucide-react";
import Link from "next/link";
import CardStats from "./components/CardStats";
import { Alert } from "@heroui/alert";

export default function Home() {
  const {
    data: projectData,
    fetchData: fetchProjectData,
    error: projectError
  } = useProjectStore();
  const {
    data: clientData,
    fetchData: fetchClientData,
    error: clientError
  } = useClientStore();
  const { user } = useAuthStore();

  useEffect(() => {
    fetchProjectData("");
  }, []);

  useEffect(() => {
    fetchClientData("");
  }, []);

  const ongoingYards = projectData.filter(
    (project) => project.status?.code === "EN_COURS"
  );
  const futureYards = projectData.filter(
    (project) => project.status?.code === "A_FAIRE"
  );

  return (
    <>
      <div className="flex flex-col gap-4">
        <p className="text-2xl sm:text-h1Desktop text-neutral-950">
          Bonjour {user?.fullname},
        </p>
        <p className="text-base sm:text-paragraphMedium text-neutral-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          imperdiet congue lectus.
        </p>
      </div>
      {projectError && <Alert color="danger">{projectError}</Alert>}
      {clientError && <Alert color="danger">{clientError}</Alert>}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8">
        <CardStats
          icon={<Users />}
          title="Nombre de clients"
          value={clientData.length}
          link={
            <Link href="/clients" className="text-brand-500 inline-flex gap-2">
              <ArrowUpRight />
              Voir mes clients
            </Link>
          }
        />
        <CardStats
          icon={<Blocks />}
          title="Nombre de chantiers en cours"
          value={ongoingYards.length}
          link={
            <Link
              href="/chantiers"
              className="text-brand-500 inline-flex gap-2">
              <ArrowUpRight />
              Voir mes chantiers en cours
            </Link>
          }
        />
        <CardStats
          icon={<CalendarClock />}
          title="Nombre de chantiers à venir"
          value={futureYards.length}
          link={
            <Link
              href="/chantiers"
              className="text-brand-500 inline-flex gap-2">
              <ArrowUpRight />
              Voir mes chantiers à venir
            </Link>
          }
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xl sm:text-h2Desktop text-neutral-950">
          Mon équipe actuelle
        </p>
      </div>
    </>
  );
}
