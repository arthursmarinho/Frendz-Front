import Link from "next/link";

export default function Header() {
  return (
    <div className="h-16 fixed bg-white w-full shadow-black flex items-center px-4 sm:px-8 md:px-12">
      <Link href="/home">
        <h1 className="font-bold text-2xl">Frendz</h1>
      </Link>
    </div>
  );
}
