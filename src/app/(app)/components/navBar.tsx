"use client";
import { ArrowLeftFromLine, House, Building, Users, Calendar, Newspaper, MessageCircle, Settings, LogOut, Rocket, LinkIcon } from "lucide-react";
import Link from "next/link";
import Aside from "@/components/aside";

export default function NavBar() {
	return (
		<Aside>
			<div className="flex flex-col gap-4">
				<span className="text-xs text-sidebar_title text-neutral-400 uppercase">Général</span>
				<nav className="flex-1 space-y-2">
					<Link href="/" className="flex flex-row gap-3 items-center text-button p-3 text-gray-900 hover:bg-neutral-100 rounded-lg">
						<House className=" text-black w-6 h-6" />
						Accueil
					</Link>
					<Link href="/chantiers" className="flex flex-row gap-3 items-center text-button p-3 text-gray-900 hover:bg-neutral-100 rounded-lg">
						<Building className=" text-black w-6 h-6" />
						Mes chantiers
					</Link>
					<Link href="/employee" className="flex flex-row gap-3 items-center text-button p-3 text-gray-900 hover:bg-neutral-100 rounded-lg">
						<LinkIcon className=" text-black w-6 h-6" />
						Mes employés
					</Link>
					<Link href="/clients" className="flex flex-row gap-3 items-center text-button p-3 text-gray-900 hover:bg-neutral-100 rounded-lg">
						<Users className=" text-black w-6 h-6" />
						Mes clients
					</Link>
					<Link href="/planning" className="flex flex-row gap-3 items-center text-button p-3 text-gray-900 hover:bg-neutral-100 rounded-lg">
						<Calendar className=" text-black w-6 h-6" />
						Planning
					</Link>
				</nav>
				<span className="text-xs text-sidebar_title text-neutral-400 uppercase">Personnel</span>
				<nav className="flex-1 space-y-2">
					<Link href="/settings" className="flex flex-row gap-3 items-center text-button p-3 text-gray-900 hover:bg-neutral-100 rounded-lg">
						<Settings className=" text-black w-6 h-6" />
						Paramètres
					</Link>
					<Link href="/logout" className="flex flex-row gap-3 items-center text-button p-3 text-gray-900 hover:bg-neutral-100 rounded-lg">
						<LogOut className=" text-black w-6 h-6" />
						Déconnexion
					</Link>
				</nav>
				<div className="flex flex-col p-4 border border-neutral-200 rounded-lg gap-4">
					<div className="flex flex-row justify-center gap-4">
						<Rocket className="text-accent-500 w-6 h-6" />
						<h3 className="text-neutral-950 text-paragraphBold">Passer à la version pro</h3>
					</div>
					<p className="text-neutral-500 text-tag pb-6">Lorem Ipsum Lorem Ipsum Lorem Ipsum</p>

					<button type="button" className="flex items-center justify-center text-neutral-50 w-full px-4 py-3 text-button rounded-lg bg-accent-500">
						Changer de version
					</button>
				</div>
			</div>
		</Aside>
	);
}
