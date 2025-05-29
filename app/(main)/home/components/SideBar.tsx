import Me from "./Me";
import SideButtons from "./SideButtons";

export default function SideBar() {
  return (
    <div className="flex flex-col p-12 items-center">
      <Me />
      <SideButtons />
    </div>
  );
}
