import { MoreVertical } from "lucide-react";
import Link from "next/link";

interface YardProps {
  yards: Yard[];
}

export default function Yard({ yards }: YardProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-3 gap-8">
        {yards?.length ? (
          yards.map((yard) => (
            <Link key={yard.id} href={`/yards/details/${yard.id}`}>
              <div key={yard.id} className="flex flex-col gap-6 rounded-lg">
                <div className="w-full h-56 rounded-lg overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src="/asset/img/yard.jpeg"
                    alt="Logo Plac"
                  />
                </div>
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col">
                    <p className="text-h3Desktop text-neutral-950 font-satoshi">
                      {yard.name}
                    </p>
                    <p className="text-tag font-satoshi text-neutral-400">
                      {yard.description}
                    </p>
                  </div>
                  <MoreVertical className="text-neutral-950" />
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No yards available</p>
        )}
      </div>
    </div>
  );
}
