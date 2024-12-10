import { Users } from "lucide-react";

type StatsProps = {
  title: string;
  value: number;
};

export default function Stats({ title, value }: StatsProps): JSX.Element {
  return (
    <div className="flex flex-col gap-6 border rounded-lg p-6">
      <div className="flex items-center justify-center rounded-full w-20 h-20 bg-brand-50">
        <div className="flex items-center justify-center rounded-full w-16 h-16 bg-brand-200">
          <Users className="text-neutral-950" />
        </div>
      </div>
      <div>
        <p className="text-paragraphMedium text-neutral-400 font-satoshi">
          {title}
        </p>
        <p className="text-neutral-950 font-bold font-satoshi text-stat">
          {value}
        </p>
      </div>
    </div>
  );
}
