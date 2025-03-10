"use client";
import CustomButton from "@components/custombutton";
import { Home, Mail, Phone, Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BubbleText from "@components/bubbleText";
import Tabs from "@components/tabs";
import Popup from "@components/popup";
import { useClientStore } from "@/store/user/clientStore";
import AssociatedYards from "./tabsComponents/associatedYardsTab";
import NotesTabComponentGrid from "./tabsComponents/notesTabComponents";
import Spinner from "@components/spinner";
import Modify from "../components/modals/modify";

export default function ClientDetail() {
  const router = useRouter();
  const { id } = useParams();
  const [client, setClient] = useState<any>(null);
  const [isPopupDeleteOpen, setIsPopupDeleteOpen] = useState(false);
  const { data, getOneById, fetchData } = useClientStore();

  const handleDeleteClient = () => {
    setIsPopupDeleteOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleClosePopup = () => {
    setIsPopupDeleteOpen(false);
    document.body.style.overflow = "";
  };

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
    return <Spinner message="Chargement des détails du client..." />;
  }

  const tabs = [
    {
      label: "Chantiers associées",
      content: <AssociatedYards yards={client.yards} />
    },
    {
      label: "Notes",
      content: <NotesTabComponentGrid notes={client.notes} />
    }
  ];

  return (
    <>
      <div className="bg-white w-full p-4 sm:p-8">
        {/* Breadcrumb */}
        <div className="mb-4">
          <p className="text-sm text-neutral-400">
            Mes clients /{" "}
            <span className="text-neutral-950">
              {client.firstname} {client.lastname}
            </span>
          </p>
        </div>
        {/* Header */}
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
        {/* À Propos */}
        <div className="mt-6">
          <h2 className="text-base sm:text-paragraphBold text-neutral-950 mb-4">
            À Propos
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
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
        {/* Tabs */}
        <div className="mt-6">
          <Tabs tabs={tabs} />
        </div>
      </div>

      <Popup
        isOpen={isPopupDeleteOpen}
        onClose={handleClosePopup}
        title="Supprimer ce client"
        desc="Cette action est irréversible">
        <div className="flex flex-row gap-2 items-end justify-end">
          <button
            type="button"
            className="bg-neutral-50 text-neutral-950 text-sm px-4 py-2 rounded-md hover:bg-neutral-100">
            Annuler
          </button>
          <button
            type="button"
            className="bg-negative-500 text-white text-sm px-4 py-2 rounded-md hover:bg-negative-600">
            Supprimer
          </button>
        </div>
      </Popup>
    </>
  );
}
