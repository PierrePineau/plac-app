import Header from "../components/header";
import NavBar from "../components/navBar";
import Stats from "./components/stats";

export default function Home() {
  return (
    <div className="flex flex-row bg-white h-full">
      <div className="bg-white hidden md:block border-r border-neutral-200">
        <NavBar />
      </div>

      <div className="flex flex-col flex-1">
        <div className="top-0 bg-white z-10 border-b border-neutral-200">
          <Header />
        </div>
        <div className="flex flex-col bg-white overflow-auto p-8 gap-8">
          <div className="flex flex-col">
            <p className="text-h1Desktop text-neutral-950 font-satoshi">
              Bonjour
            </p>
            <p className="text-paragraphMedium font-satoshi text-neutral-400">
              Lorem ipsum
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <Stats title="Total d'utilisateur" value={1910} />
            <Stats title="Total d'utilisateur" value={1910} />
            <Stats title="Total d'utilisateur" value={1910} />
          </div>
        </div>
      </div>
    </div>
  );
}
