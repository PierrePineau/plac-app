import BubbleText from "@/app/components/bubbleText";
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
import React from "react";

interface YardProps {
  yard: Yard;
}

const GeneralTab: React.FC<YardProps> = ({ yard }) => {
  return (
    <div className="mt-6">
      <h2 className="font-satoshi text-paragraphBold text-neutral-950">
        Description
      </h2>
      <p className="font-satoshi text-paragraphMedium text-neutral-500 mt-2">
        {yard.description}
      </p>
      <h2 className="font-satoshi text-h2Desktop text-neutral-900 mt-6">
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
            <p className="text-sm font-satoshi text-neutral-500">
              Chef de chantier
            </p>
            <p className="font-satoshi text-paragraphBold text-neutral-950">
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
            <p className="text-sm font-satoshi text-neutral-500">
              Date de début
            </p>
            <p className="font-satoshi text-paragraphBold text-neutral-950">
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
            <p className="text-sm font-satoshi text-neutral-500">Date de fin</p>
            <p className="font-satoshi text-paragraphBold text-neutral-950">
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
            <p className="text-sm font-satoshi text-neutral-500">
              Localisation
            </p>
            <p className="font-satoshi text-paragraphBold text-neutral-950">
              {yard.address}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-2">
        <div className="flex flex-row gap-1 justify-end">
          <ExternalLink className="text-brand-500" />
          <a
            href="#"
            className="font-satoshi text-paragraphMedium text-brand-500">
            Ouvrir dans Maps
          </a>
        </div>
        <img
          src="/images/map-placeholder.jpg" // Remplace par une vraie carte
          alt="Map"
          className="w-full h-64 bg-gray-200 rounded-lg"
        />
      </div>
      <h2 className="font-satoshi text-h2Desktop text-neutral-900 mt-6">
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
          />
          <div>
            <p className="text-sm font-satoshi text-neutral-500">
              Nom & Prénom
            </p>
            <p className="font-satoshi text-paragraphBold text-neutral-950">
              Lorem Ipsum
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
          />
          <div>
            <p className="text-sm font-satoshi text-neutral-500">Email</p>
            <p className="font-satoshi text-paragraphBold text-neutral-950">
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
          />
          <div>
            <p className="text-sm font-satoshi text-neutral-500">
              N° de téléphone
            </p>
            <p className="font-satoshi text-paragraphBold text-neutral-950">
              +33 7 98 24 58 74
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralTab;
