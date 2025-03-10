"use client";
import {
  House,
  Building,
  File,
  User,
  Users,
  Calendar,
  Settings,
  LogOut,
  Rocket,
  LinkIcon,
  MessageCircle
} from "lucide-react";
import Link from "next/link";
import Aside from "@components/aside";
import Btn from "@components/btn";

interface NavBarProps {
  isNavOpen: boolean;
  onCloseNav: () => void;
}

const items = [
	{
		key: "home",
		icon: House,
		label: "Accueil",
		href: "/"
	},
	{
		key: "chantiers",
		icon: Building,
		label: "Chantiers",
		href: "/chantiers"
	},
	{
		key: "tasks",
		icon: File,
		label: "Tâches",
		href: "/taches"
	},
	{
		key: "planning",
		icon: Calendar,
		label: "Planning",
		href: "/planning"
	},
	{
		key: "members",
		icon: LinkIcon,
		label: "Employés",
		href: "/membres"
	},
	{
		key: "clients",
		icon: Users,
		label: "Clients",
		href: "/clients"
	},
];

const items2 = [
	{
		key: "messages",
		icon: MessageCircle,
		label: "Messages",
		href: "/messages"
	},
	{
		key: "settings",
		icon: Settings,
		label: "Paramètres",
		href: "/settings"
	},
	{
		key: "logout",
		icon: LogOut,
		label: "Déconnexion",
		href: "/logout"
	}
];

export default function NavBar({ isNavOpen, onCloseNav }: NavBarProps) {
  return (
    <Aside
		isOpen={isNavOpen}
		onOpenChange={onCloseNav}
	>
		<div className="flex flex-col gap-4 h-full">
			<span className="text-xs text-sidebar_title text-neutral-400 uppercase">Général</span>
			<nav className="flex-1 space-y-2">
				{
					items.map((item) => (
						<Link key={item.key} href={item.href} className="flex flex-row gap-3 items-center text-button p-3 text-gray-900 hover:bg-neutral-100 rounded-lg">
							<item.icon className=" text-black w-6 h-6" />
							{item.label}
						</Link>
					))
				}
			</nav>
			<span className="text-xs text-sidebar_title text-neutral-400 uppercase">Personnel</span>
			<nav className="flex-1 space-y-2">
				{
					items2.map((item) => (
						<Link key={item.key} href={item.href} className="flex flex-row gap-3 items-center text-button p-3 text-gray-900 hover:bg-neutral-100 rounded-lg">
							<item.icon className=" text-black w-6 h-6" />
							{item.label}
						</Link>
					))
				}
			</nav>
			<div className="flex flex-col p-4 border border-neutral-200 rounded-lg gap-4 mt-auto">
				<div className="flex flex-row justify-start gap-4">
					<Rocket className="text-accent-500" size={24} />
					<h3 className="text-neutral-950 font-medium">Passer à la version Pro</h3>
				</div>
				<p className="text-neutral-500 text-tag pb-6">Vous utilisez actuellement la version démo. Obtenez la version Por pour plus de fonctionnalités !</p>
				<Btn
					variant="secondary"
					className="w-full"
					>
					Changer de version
				</Btn>
			</div>
		</div>
	</Aside>
  );
}
