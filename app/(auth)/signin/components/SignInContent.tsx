import GoogleLogin from "@/app/(auth)/signin/components/GoogleLogin";

export const SignInContent = () => {
  return (
    <div className="flex bg-white flex-col h-screen">
      <div className="flex p-22 justify-start mt-18 md:mt-34 lg:mt-34">
        <h1 className="font-bold text-4xl">Frendz</h1>
      </div>
      <div className="px-22">
        <h1 className="text-6xl font-semibold tracking-normal">
          Olá, <br />
          Bem-Vindo
        </h1>
        <p className="text-gray-400">Bem-Vindo a sua nova Rede Social</p>
      </div>
      <div className="mt-12 px-22">
        <GoogleLogin />
      </div>
    </div>
  );
};
