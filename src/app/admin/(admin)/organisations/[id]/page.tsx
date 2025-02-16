"use client";
import HeaderPage from "@/components/headerpage";
import { useParams, useRouter } from "next/navigation";

export default function Page() {
  const { id } = useParams();
  // const 
  // useEffect(() => {
  //   if (id) {
  //     const client = getClientById(Number(id));
  //     if (client) {
  //       setClient(client);
  //     } else {
  //       fetchClients().then(() => {
  //         const fetchedClient = getClientById(Number(id));
  //         setClient(fetchedClient || null);
  //       });
  //     }
  //   }
  // }, [id, getClientById, fetchClients]);

  // if (!client) {
  //   return <div>Chargement des détails du client...</div>;
  // }

  // const tabs = [
  //   {
  //     label: "Chantiers associées",
  //     content: <AssociatedYards yards={client.yards} />
  //   },
  //   {
  //     label: "Notes",
  //     content: <NotesTabComponentGrid notes={client.notes} />
  //   }
  // ];

  return (
    <>
      <HeaderPage title="Lorem ipsum" showBreadcrumb={true}>
        {/* // Les actions disponibles */}
      </HeaderPage>
    </>
  );
}
