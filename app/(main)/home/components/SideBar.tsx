import { useState } from "react";
import Me from "./Me";
import SideButtons from "./SideButtons";
import { ChevronLeft, Menu } from "lucide-react";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {!isOpen && (
        <button
          className="sm:hidden mt-12 fixed p-4 border-0 flex justify-start transition-all duration-700"
          onClick={() => setIsOpen(true)}
        >
          <Menu />
        </button>
      )}

      <div
        className={`flex flex-col p-12 items-center sm:flex ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex justify-end w-full">
          <button
            className="sm:hidden mt-4 p-2"
            onClick={() => setIsOpen(false)}
          >
            <ChevronLeft />
          </button>
        </div>
        <Me />
        <SideButtons />
      </div>
    </div>
  );
}
