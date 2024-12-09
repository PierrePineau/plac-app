import Header from "../components/header";
import NavBar from "../components/navBar";

export default function Home() {
  return (
    <div className="flex flex-row h-screen">
      {/* Sidebar fixe */}
      <div className="bg-white shadow-md hidden md:block">
        <NavBar />
      </div>

      {/* Contenu principal */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="sticky top-0 bg-white shadow-md z-10">
          <Header />
        </div>

        {/* Contenu */}
        <div className="flex-1 p-4 bg-gray-100 overflow-auto">
          {/* Votre contenu ici */}
        </div>
      </div>
    </div>
  );
}
