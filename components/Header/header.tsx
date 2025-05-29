import Link from "next/link";

export default function Header() {
  return (
    <div className="h-16 shadow-black flex items-center p-12">
      <Link href="/home">
        <h1 className="font-bold text-2xl">Frendz</h1>
      </Link>
    </div>
  );
}
