"use client";
import CustomButton from "@/components/custombutton";
import { FileEdit, Home, Mail, Phone, Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BubbleText from "@/components/bubbleText";
import Tabs from "@/components/tabs";
import Popup from "@/components/popup";
import { useClientStore } from "@/store/user/clientStore";
import AssociatedYards from "./tabsComponents/associatedYardsTab";
import NotesTabComponentGrid from "./tabsComponents/notesTabComponents";
import Spinner from "@/components/spinner";
import Modify from "../components/modals/modify";

export default function ClientDetail() {
  const router = useRouter();
  const { id } = useParams();
  const [client, setClient] = useState<any>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupDeleteOpen, setIsPopupDeleteOpen] = useState(false);
  const { data, getOneById, fetchData } = useClientStore();

  const handleModifyClient = () => {
    setIsPopupOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setIsPopupDeleteOpen(false);
    document.body.style.overflow = "";
  };

  const handleDeleteClient = () => {
    setIsPopupDeleteOpen(true);
    document.body.style.overflow = "hidden";
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
      <div className="flex flex-col w-full">
        <div className="flex flex-col bg-white overflow-auto p-8 gap-8">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-1">
              <p className="text-neutral-400 text-paragraphMedium">
                Mes clients /
              </p>
              <p className="text-neutral-950 text-paragraphMedium">
                {client.firstname} {client.lastname}
              </p>
            </div>
            <div className="flex flex-row justify-between pt-8">
              <div className="flex flex-row gap-2 w-full items-center">
                <img
                  className="w-24 h-24 rounded-lg object-cover"
                  src={client.avatar || "/asset/img/yard.jpeg"}
                  alt={client.firstname}
                />
                <h1 className="text-h1Desktop text-neutral-900">
                  {client.firstname} {client.lastname}
                </h1>
              </div>
              <div className="flex flex-row gap-4 max-h-12 w-full">
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
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-paragraphBold text-neutral-950">À Propos</h1>
            <div className="flex flex-row gap-10">
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
                  <p className="text-sm text-neutral-500">Email</p>
                  <p className="text-paragraphBold text-neutral-950">
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
                  <p className="text-sm text-neutral-500">
                    Numéro de téléphone
                  </p>
                  <p className="text-paragraphBold text-neutral-950">
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
                  <p className="text-sm text-neutral-500">Addresse email</p>
                  <p className="text-paragraphBold text-neutral-950">
                    {client.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
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
            type="submit"
            className="bg-neutral-50 text-neutral-950 text-paragraphRegular px-4 py-2 rounded-md hover:bg-neutral-100">
            Annuler
          </button>
          <button
            type="submit"
            className="bg-negative-500 text-white text-paragraphRegular px-4 py-2 rounded-md hover:bg-negative-600">
            Supprimer
          </button>
        </div>
      </Popup>
    </>
  );
}
