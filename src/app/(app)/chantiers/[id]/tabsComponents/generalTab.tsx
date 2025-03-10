"use client";
import BubbleText from "@components/bubbleText";
import ProgressBar from "@components/progressBar";
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
import MapComponent from "../../components/map";

interface Address {
  id: number;
  uuid: string;
  country: string;
  state: string;
  city: string;
  postcode: string;
  street: string;
  compl: string;
}

interface Project {
  addresses?: Address;
  description: string;
  organisation?: { name: string };
}

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
      if (!project.addresses) return;
      const addressQuery = `${project.addresses.street} ${project.addresses.compl} ${project.addresses.city} ${project.addresses.postcode} ${project.addresses.country}`;
      const encodedAddress = encodeURIComponent(addressQuery);
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}`;
      try {
        const response = await fetch(url, {
          headers: { "User-Agent": "VotreApp/1.0" }
        });
        const data = await response.json();
        if (data.length > 0) {
          setCoordinates({
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon)
          });
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des coordonnées :",
          error
        );
      }
    };
    fetchCoordinates();
  }, [project.addresses]);

  const googleMapsUrl = project.addresses
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${project.addresses.street} ${project.addresses.compl} ${project.addresses.city} ${project.addresses.postcode} ${project.addresses.country}`
      )}`
    : "#";

  return (
    <div className="flex flex-col gap-4">
      {/* Description & Statut */}
      <div className="flex flex-col sm:flex-row sm:justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-base font-semibold text-neutral-950">
            Description
          </p>
          <p className="text-sm text-neutral-500">{project.description}</p>
        </div>
        <div className="flex flex-col gap-2 self-start">
          <p className="text-base font-semibold text-neutral-950">Statut</p>
          <p className="text-xs sm:text-tag text-neutral-50 bg-accent-500 rounded-lg py-1 px-2 sm:px-3 w-fit">
            En cours
          </p>
        </div>
      </div>

      {/* Informations générales */}
      <h2 className="text-lg sm:text-h2Desktop font-bold text-neutral-900 mt-4">
        Informations générales
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-2">
        <div className="flex items-center space-x-3">
          <BubbleText
            icon={<HardHat className="text-brand-500" />}
            widthBubble="w-10 sm:w-12"
            heightBubble="h-10 sm:h-12"
            widthSubBubble="w-8 sm:w-10"
            heightSubBubble="h-8 sm:h-10"
          />
          <div>
            <p className="text-xs text-neutral-500">Chef de chantier</p>
            <p className="text-sm sm:font-bold text-neutral-950">Lorem Ipsum</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <BubbleText
            icon={<CalendarPlus className="text-brand-500" />}
            widthBubble="w-10 sm:w-12"
            heightBubble="h-10 sm:h-12"
            widthSubBubble="w-8 sm:w-10"
            heightSubBubble="h-8 sm:h-10"
          />
          <div>
            <p className="text-xs text-neutral-500">Date de début</p>
            <p className="text-sm sm:font-bold text-neutral-950">
              5 décembre 2024
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <BubbleText
            icon={<CalendarMinus className="text-brand-500" />}
            widthBubble="w-10 sm:w-12"
            heightBubble="h-10 sm:h-12"
            widthSubBubble="w-8 sm:w-10"
            heightSubBubble="h-8 sm:h-10"
          />
          <div>
            <p className="text-xs text-neutral-500">Date de fin</p>
            <p className="text-sm sm:font-bold text-neutral-950">
              20 février 2025
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <BubbleText
            icon={<MapPin className="text-brand-500" />}
            widthBubble="w-10 sm:w-12"
            heightBubble="h-10 sm:h-12"
            widthSubBubble="w-8 sm:w-10"
            heightSubBubble="h-8 sm:h-10"
          />
          <div>
            <p className="text-xs text-neutral-500">Localisation</p>
            <p className="text-sm sm:font-bold text-neutral-950">
              {project.addresses?.city}
            </p>
          </div>
        </div>
      </div>

      {/* Carte & Lien Maps */}
      <div className="mt-4 flex flex-col gap-2">
        <div className="flex flex-row gap-1 sm:justify-end items-center">
          <ExternalLink className="text-brand-500 w-4 h-4" />
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm sm:text-paragraphMedium text-brand-500">
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
          <p className="text-sm">Chargement de la carte...</p>
        )}
      </div>

      {/* Informations clients */}
      <h2 className="text-lg sm:text-h2Desktop font-bold text-neutral-900 mt-4">
        Informations clients
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
        <div className="flex items-center space-x-3">
          <BubbleText
            icon={<User className="text-accent-500" />}
            widthBubble="w-10 sm:w-12"
            heightBubble="h-10 sm:h-12"
            widthSubBubble="w-8 sm:w-10"
            heightSubBubble="h-8 sm:h-10"
            firstBackground="bg-accent-100"
            secondBackground="bg-accent-200"
          />
          <div>
            <p className="text-xs text-neutral-500">Nom & Prénom</p>
            <p className="text-sm sm:font-bold text-neutral-950">
              {project.organisation?.name}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <BubbleText
            icon={<Mail className="text-accent-500" />}
            widthBubble="w-10 sm:w-12"
            heightBubble="h-10 sm:h-12"
            widthSubBubble="w-8 sm:w-10"
            heightSubBubble="h-8 sm:h-10"
            firstBackground="bg-accent-100"
            secondBackground="bg-accent-200"
          />
          <div>
            <p className="text-xs text-neutral-500">Email</p>
            <p className="text-sm sm:font-bold text-neutral-950">
              contact@loremipsum.fr
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <BubbleText
            icon={<Phone className="text-accent-500" />}
            widthBubble="w-10 sm:w-12"
            heightBubble="h-10 sm:h-12"
            widthSubBubble="w-8 sm:w-10"
            heightSubBubble="h-8 sm:h-10"
            firstBackground="bg-accent-100"
            secondBackground="bg-accent-200"
          />
          <div>
            <p className="text-xs text-neutral-500">N° de téléphone</p>
            <p className="text-sm sm:font-bold text-neutral-950">
              +33 7 98 24 58 74
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralTab;
