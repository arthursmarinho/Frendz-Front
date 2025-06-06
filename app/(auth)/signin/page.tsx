import { SignInContent } from "./components/SignInContent";
import HeroContent from "./components/HeroContent";

const SignInPage = async () => {
  return (
    <div className="grid grid-cols-2">
      <HeroContent />
      <SignInContent />
    </div>
  );
};

export default SignInPage;
