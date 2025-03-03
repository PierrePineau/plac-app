import CustomButton from "@/components/custombutton";

interface StepPhoneNumberProps {
  data: string;
  onNext: () => void;
  onReturnToLogin: () => void;
  updateData: (value: string) => void;
}

const RegisterStepOne = ({
  onNext,
  onReturnToLogin,
  updateData,
  data
}: StepPhoneNumberProps) => {
  return (
    <>
      <div className="sm:hidden p-4">
        <div className="flex flex-col gap-4">
          <h1 className="text-neutral-950 text-3xl">Inscription</h1>
          <p className="text-neutral-400 text-base">
            Vous n'avez pas besoin de renseigner votre carte bancaire.
          </p>
        </div>
        <form
          className="flex flex-col gap-4 mt-4"
          onSubmit={(e) => {
            e.preventDefault();
            onNext();
          }}>
          <div className="flex flex-col">
            <label htmlFor="phone" className="text-base text-neutral-950">
              Numéro de téléphone *
            </label>
            <input
              type="text"
              id="phone"
              value={data}
              onChange={(e) => updateData(e.target.value)}
              placeholder="Ex: 06 78 09 56 43"
              className="border rounded px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-brand-950 text-white px-4 py-2 rounded hover:bg-brand-1000">
            Poursuivre mon inscription
          </button>
        </form>
        <div className="flex flex-col items-center mt-6">
          <div className="flex flex-row gap-2 items-center">
            <p className="text-neutral-400 text-base">Déjà un compte ?</p>
            <CustomButton
              text="Se connecter"
              color="bg-white"
              textColor="text-brand-500"
              padding=""
              hover="hover:text-brand-600"
              onClick={onReturnToLogin}
            />
          </div>
          <div className="flex items-center justify-center my-4 w-full">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-2 text-gray-500 text-sm">OU</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <div className="w-full">
            <CustomButton
              text="Se connecter avec Google"
              color="bg-white"
              textColor="text-neutral-950"
              border="border border-neutral-400"
              icon={
                <img
                  src="/asset/img/googleLogo.svg"
                  alt="Google Calendar"
                  width="25"
                  height="25"
                />
              }
              hover="hover:border-none hover:bg-neutral-100"
              onClick={() => {}}
            />
          </div>
        </div>
      </div>

      <div className="hidden sm:block">
        <div className="items-start gap-8 flex flex-col">
          <div className="flex flex-col gap-4">
            <h1 className="text-neutral-950 text-4xl">Inscription</h1>
            <p className="text-neutral-400 text-paragraphMedium">
              Vous n'avez pas besoin de renseignez votre carte bancaire.
            </p>
          </div>
          <form
            className="flex flex-col gap-8 w-full"
            onSubmit={(e) => {
              e.preventDefault();
              onNext();
            }}>
            <div>
              <label
                htmlFor="name"
                className="text-paragraphMedium text-neutral-950">
                Numéro de téléphone *
              </label>
              <input
                type="text"
                id="phone"
                value={data}
                onChange={(e) => updateData(e.target.value)}
                className="border rounded w-full px-4 py-2 text-paragraphMedium text-neutral-950"
                placeholder="Ex: 06 78 09 56 43"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-brand-950 text-white px-4 py-2 rounded-md hover:bg-brand-1000">
              Poursuivre mon inscription
            </button>
          </form>
          <div className="flex flex-row gap-2 justify-center pt-8 ">
            <p className="text-neutral-400 text-paragraphMedium">
              Déjà un compte ?
            </p>
            <CustomButton
              text="Se connecter"
              color="bg-white"
              textColor="text-brand-500"
              padding=""
              hover="hover:text-brand-600"
              onClick={onReturnToLogin}
            />
          </div>
          {/* <div className="flex items-center justify-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500">OU</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <div className="w-full flex justify-center">
            <CustomButton
              text="Se connecter avec Google"
              color="bg-white"
              textColor="text-neutral-950"
              border="border border-neutral-400"
              icon={
                <img
                  src="/asset/img/googleLogo.svg"
                  alt="Google Calendar"
                  width="25"
                  height="25"
                />
              }
              hover="hover:border-none hover:bg-neutral-100"
              onClick={() => {}}
            />
          </div> */}
        </div>
      </div>
    </>
  );
};

export default RegisterStepOne;
