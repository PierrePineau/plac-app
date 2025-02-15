"use client";
import BubbleText from "@/components/bubbleText";
import ProgressBar from "@/components/progressBar";
import {
  CalendarMinus,
  CalendarPlus,
  ExternalLink,
  HardHat,
  Mail,
  MapPin,
  Phone,
  User
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import MyMap from "../../components/map";
import MapComponent from "../../components/map";

interface ProjectProps {
  project: Project;
}

const GeneralTab: React.FC<ProjectProps> = ({ project }) => {
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (!project.localisation) return;

      const address = encodeURIComponent(project.localisation);
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${address}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.length > 0) {
          setCoordinates({
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon)
          });
        } else {
          console.error("Adresse introuvable");
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des coordonnées :",
          error
        );
      }
    };

    fetchCoordinates();
  }, [project.localisation]);

  return (
    <div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col items-start gap-2">
          <p className="  text-paragraphBold text-neutral-950">
            Description
          </p>
          <p className="  text-paragraphMedium text-neutral-500 max-w-[75%]">
            {project.description}
          </p>
        </div>
        <div className="flex flex-col items-start gap-2">
          <p className="  text-paragraphBold text-neutral-950">
            Statut
          </p>
          <p
            className={`  text-tag text-neutral-50 rounded-lg py-1 px-3 ${
              "En cours" === "En cours" ? "bg-accent-500" : "bg-green-500"
            }`}>
            En cours
          </p>
        </div>
      </div>

      <h2 className="  text-h2Desktop text-neutral-900 mt-6">
        Informations générales
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="flex items-center space-x-3">
          <BubbleText
            icon={<HardHat className="text-brand-500" />}
            widthBubble="w-12"
            heightBubble="h-12"
            widthSubBubble="w-10"
            heightSubBubble="h-10"
          />
          <div>
            <p className="text-sm   text-neutral-500">
              Chef de chantier
            </p>
            <p className="  text-paragraphBold text-neutral-950">
              Lorem Ipsum
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <BubbleText
            icon={<CalendarPlus className="text-brand-500" />}
            widthBubble="w-12"
            heightBubble="h-12"
            widthSubBubble="w-10"
            heightSubBubble="h-10"
          />
          <div>
            <p className="text-sm   text-neutral-500">
              Date de début
            </p>
            <p className="  text-paragraphBold text-neutral-950">
              5 décembre 2024
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <BubbleText
            icon={<CalendarMinus className="text-brand-500" />}
            widthBubble="w-12"
            heightBubble="h-12"
            widthSubBubble="w-10"
            heightSubBubble="h-10"
          />
          <div>
            <p className="text-sm   text-neutral-500">Date de fin</p>
            <p className="  text-paragraphBold text-neutral-950">
              20 février 2025
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <BubbleText
            icon={<MapPin className="text-brand-500" />}
            widthBubble="w-12"
            heightBubble="h-12"
            widthSubBubble="w-10"
            heightSubBubble="h-10"
          />
          <div>
            <p className="text-sm   text-neutral-500">
              Localisation
            </p>
            <p className="  text-paragraphBold text-neutral-950">
              {project.localisation}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-2">
        <div className="flex flex-row gap-1 justify-end">
          <ExternalLink className="text-brand-500" />
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              project.localisation
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="  text-paragraphMedium text-brand-500">
            Ouvrir dans Maps
          </a>
        </div>
        {coordinates ? (
          <MapComponent
            key={`${coordinates.lat}-${coordinates.lng}`}
            latitude={coordinates.lat}
            longitude={coordinates.lng}
          />
        ) : (
          <p>Chargement de la carte...</p>
        )}
      </div>
      <h2 className="  text-h2Desktop text-neutral-900 mt-6">
        Informations clients
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="flex items-center space-x-3">
          <BubbleText
            icon={<User className="text-accent-500" />}
            widthBubble="w-12"
            heightBubble="h-12"
            widthSubBubble="w-10"
            heightSubBubble="h-10"
            firstBackground="bg-accent-100"
            secondBackground="bg-accent-200"
          />
          <div>
            <p className="text-sm   text-neutral-500">
              Nom & Prénom
            </p>
            <p className="  text-paragraphBold text-neutral-950">
              {project.organisaton.name}
            </p>
          </div>
        </div>

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
            <p className="text-sm   text-neutral-500">Email</p>
            <p className="  text-paragraphBold text-neutral-950">
              contact@loremipsum.fr
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
            <p className="text-sm   text-neutral-500">
              N° de téléphone
            </p>
            <p className="  text-paragraphBold text-neutral-950">
              +33 7 98 24 58 74
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralTab;
