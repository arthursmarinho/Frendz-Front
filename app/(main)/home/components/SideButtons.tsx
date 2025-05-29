"use client";

import { Button } from "@/components/ui/button";
import Config from "./Config";
import Link from "next/link";
export default function SideButtons() {
  return (
    <div className="flex flex-col gap-4 mt-12">
      <Button variant="ghost">Feed</Button>
      <Button variant="ghost">Mensagens</Button>
      <Link href="perfil">
        <Button variant="ghost">Meu Perfil</Button>
      </Link>
      <Config />
    </div>
  );
}
