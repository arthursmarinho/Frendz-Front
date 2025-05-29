import GoogleLogin from "@/app/(auth)/signin/components/GoogleLogin";

export const SignInContent = () => {
  return (
    <div className="flex bg-blue-300 flex-col h-screen justify-center items-center">
      <div className="gap-4 bg-white p-24 rounded-2xl flex justify-center items-center flex-col ">
        <h1 className="text-4xl font-bold">Entre na Frendz!</h1>
        <h1 className="text-gray">Faça login utilizando sua conta Google</h1>
        <GoogleLogin />
      </div>
    </div>
  );
};
