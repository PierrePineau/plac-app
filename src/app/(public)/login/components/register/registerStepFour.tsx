import CustomButton from "@/components/custombutton";

interface StepFourProps {
  onPrevious: () => void;
  data: { password: string; confirmPassword: string };
  updateData: (key: string, value: string) => void;
}

const RegisterStepFour = ({ onPrevious, data, updateData }: StepFourProps) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="text-neutral-950 font-satoshi text-4xl">Inscription</h1>
      <label htmlFor="password" className="text-neutral-950">
        Créez un mot de passe :
      </label>
      <input
        type="password"
        id="password"
        className="border rounded w-full px-4 py-2 font-satoshi text-paragraphMedium text-neutral-950"
        placeholder="********"
        value={data.password}
        onChange={(e) => updateData("password", e.target.value)}
      />
      <label htmlFor="confirmPassword" className="text-neutral-950">
        Confirmez le mot de passe :
      </label>
      <input
        type="password"
        id="confirmPassword"
        className="border rounded w-full px-4 py-2 font-satoshi text-paragraphMedium text-neutral-950"
        placeholder="********"
        value={data.confirmPassword}
        onChange={(e) => updateData("confirmPassword", e.target.value)}
      />
      <div className="w-full flex flex-row gap-4">
        <CustomButton
          text="Étape précédente"
          color="bg-white w-full"
          textColor="text-neutral-950"
          hover="hover:border-none hover:bg-neutral-100"
          border="border border-neutral-400"
          onClick={onPrevious}
        />
        <CustomButton
          text="Terminer"
          color="bg-brand-950 w-full"
          textColor="text-white"
          hover="hover:bg-brand-1000"
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default RegisterStepFour;
