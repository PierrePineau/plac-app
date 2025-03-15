"use client";
import BubbleText from "@components/bubbleText";
import MapComponent from "@components/MapComponent";
import ProgressBar from "@components/ProgressBar";
import { Progress } from "@heroui/react";
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
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface ProjectProps {
  project: Project;
}

const GeneralTab: React.FC<ProjectProps> = ({ project }) => {
  return (
    <div className="flex flex-col gap-4">
      {/* Description & Statut */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-8">
        <div className="flex flex-col gap-2 lg:col-span-3">
          <h3 className="font-medium text-neutral-950 text-lg">
            Description
          </h3>
          <p className="text-sm text-neutral-500 min-h-12">{project.description}</p>
        </div>
        <div className="flex flex-col gap-2 self-start">
          <p className="text-base font-semibold text-neutral-950">Statut</p>
          {project.status ? (
            <p className="text-xs sm:text-tag text-neutral-50 bg-accent-500 rounded-md py-1 px-2 sm:px-3 w-fit">
              {project.status.name}
            </p>
          ) : (
            <></>
          )}
        </div>
        <div className="flex flex-col gap-2 lg:col-span-2">
          <h3 className="font-medium text-neutral-950 text-lg">
            Progression du chantier
          </h3>
          <div className="flex gap-2 items-center">
            <Progress size="md" value={90} maxValue={100} classNames={{
              indicator: "bg-brand-800",
            }} />
            <span className="">90%</span>
          </div>
        </div>
      </div>

      {/* Informations générales */}
      <h2 className="text-lg sm:text-xl font-medium">
          Informations générales
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2 md:gap-8">
          {
            [
               {
                  key: "1",
                  icon: <HardHat className="text-brand-500" />,
                  title: "Chef de chantier",
                  content: "Lorem Ipsum"
                },
                {
                  key: "2",
                  icon: <CalendarPlus className="text-brand-500" />,
                  title: "Date de début",
                  content: "5 décembre 2024"
                },
                {
                  key: "2",
                  icon: <CalendarMinus className="text-brand-500" />,
                  title: "Date de fin",
                  content: "20 février 2025"
                },
                {
                  key: "4",
                  icon: <MapPin className="text-brand-500" />,
                  title: "Localisation",
                  content: project.addresses? project.addresses[0].city : "Ajouter une adresse pour afficher la localisation",
                  className: "md:col-span-2"
               }
            ].map((item) => (
              <div key={item.key} className={`flex items-center space-x-3 ${item.className ?? ''}`}>
                <BubbleText
                  icon={item.icon}
                  widthBubble="w-10 sm:w-12"
                  heightBubble="h-10 sm:h-12"
                  widthSubBubble="w-8 sm:w-10"
                  heightSubBubble="h-8 sm:h-10"
                />
                <div>
                  <p className="text-xs text-neutral-400">{item.title}</p>
                  <p className="text-sm font-medium text-neutral-950">{item.content}</p>
                </div>
              </div>
            ))
          }
      </div>
      {/* Carte & Lien Maps */}
      { 
      // On affiche uniquement si l'adresse est renseignée + la première adresse
        project.addresses && project.addresses.length > 0 ? (
          <MapComponent
            address={project.addresses[0]}
          />
        ) : (
          <MapComponent
            address={null}
          />
        )
      }
      {/* Informations clients */}
      <h2 className="text-lg sm:text-h2Desktop font-bold text-neutral-900 mt-4">
        Informations clients
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
        {
          project.clients?.length === 0 && (
            <div className="col-span-3">
              <p className="text-sm text-neutral-500">Aucun client associé à ce chantier</p>
            </div>
          )
        }
        {
          project.clients?.map((client: Client, index) => (
            [
              {
                key: "1" + index,
                icon: <User className="text-accent-500" />,
                title: "Nom & Prénom",
                content: client.firstname + " " + client.lastname
              },
              {
                key: "2" + index,
                icon: <Mail className="text-accent-500" />,
                title: "Email",
                content: client.email
              },
              {
                key: "3" + index,
                icon: <Phone className="text-accent-500" />,
                title: "N° de téléphone",
                content: client.phone
              }
                ].map((item) => (
                  <div key={item.key} className="flex items-center space-x-3">
                    <BubbleText
                      icon={item.icon}
                      widthBubble="w-10 sm:w-12"
                      heightBubble="h-10 sm:h-12"
                      widthSubBubble="w-8 sm:w-10"
                      heightSubBubble="h-8 sm:h-10"
                      firstBackground="bg-accent-100"
                      secondBackground="bg-accent-200"
                    />
                    <div>
                      <p className="text-xs text-neutral-500">{item.title}</p>
                      <p className="text-sm sm:font-bold text-neutral-950">{item.content}</p>
                    </div>
                  </div>
                ))
          ))
        }
      </div>
    </div>
  );
};

export default GeneralTab;
