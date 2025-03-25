"use client";
import { Home, Mail, Phone, Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BubbleText from "@/components/BubbleText";
import Tabs from "@/components/Tabs";
import { useClientStore } from "@/store/user/clientStore";
import Spinner from "@/components/Spinner";
import HeaderPage from "@components/HeaderPage";
import Edit from "../components/modals/Edit";
import Delete from "../components/modals/Delete";
import Notes from "./tabsComponents/Notes";
import AssociatedChantiers from "./tabsComponents/AssociatedChantiers";

export default function ClientDetail() {
  const { id } = useParams();
  const [client, setClient] = useState<any>(null);
  const { data, getOneById, fetchData } = useClientStore();

  useEffect(() => {
    if (id) {
      const clientFromStore = getOneById(id as string);
      if (clientFromStore) {
        setClient(clientFromStore);
      } else {
        fetchData({}).then(() => {
          const fetchedClient = getOneById(id as string);
          setClient(fetchedClient || null);
        });
      }
    }
  }, [id, getOneById, fetchData]);

  if (!client) {
    return <Spinner message="Chargement du client..." />;
  }

  const tabs = [
    {
      label: "Chantiers associées",
      content: <AssociatedChantiers client={client} />
    },
    {
      label: "Notes",
      content: <Notes client={client} />
    }
  ];

  return (
    <>
      {/* <div className="bg-white w-full p-4 sm:p-8">
        <div className="mb-4">
          <p className="text-sm text-neutral-400">
            Mes clients /{" "}
            <span className="text-neutral-950">
              {client.firstname} {client.lastname}
            </span>
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
            <img
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover"
              src={client.avatar || "/asset/img/yard.jpeg"}
              alt={client.firstname}
            />
            <h1 className="text-xl sm:text-h1Desktop font-bold text-neutral-900">
              {client.firstname} {client.lastname}
            </h1>
          </div>
          <div className="flex flex-row gap-4">
            <CustomButton
              text="Supprimer"
              icon={<Trash2 />}
              color="bg-red-500"
              textColor="text-white"
              onClick={handleDeleteClient}
              hover="bg-red-600"
            />
            <Modify id={id as string} />
          </div>
        </div>
      </div> */}
      <HeaderPage
          showBreadcrumb={true}
          title={client.name}
        >
        <Delete client={client} />
        <Edit client={client} />
      </HeaderPage>
      {/* À Propos */}
      <div className="mb-4">
        <h2 className="text-base sm:text-paragraphBold text-neutral-950 mb-4">
          À Propos
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          <div className="flex items-center space-x-3">
            <BubbleText
              icon={<Mail className="text-accent-500" />}
              widthBubble="w-12"
              heightBubble="h-12"
              widthSubBubble="w-10"
              heightSubBubble="h-10"
              firstBackground="bg-accent-100"
              secondBackground="bg-accent-200"
            />
            <div>
              <p className="text-xs sm:text-sm text-neutral-500">Email</p>
              <p className="text-sm sm:text-paragraphBold text-neutral-950">
                {client.email}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <BubbleText
              icon={<Phone className="text-accent-500" />}
              widthBubble="w-12"
              heightBubble="h-12"
              widthSubBubble="w-10"
              heightSubBubble="h-10"
              firstBackground="bg-accent-100"
              secondBackground="bg-accent-200"
            />
            <div>
              <p className="text-xs sm:text-sm text-neutral-500">Téléphone</p>
              <p className="text-sm sm:text-paragraphBold text-neutral-950">
                {client.phone}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <BubbleText
              icon={<Home className="text-accent-500" />}
              widthBubble="w-12"
              heightBubble="h-12"
              widthSubBubble="w-10"
              heightSubBubble="h-10"
              firstBackground="bg-accent-100"
              secondBackground="bg-accent-200"
            />
            <div>
              <p className="text-xs sm:text-sm text-neutral-500">Adresse</p>
              <p className="text-sm sm:text-paragraphBold text-neutral-950">
                {client.address}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Tabs tabs={tabs} />
    </>
  );
}
