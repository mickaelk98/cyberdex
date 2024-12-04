import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-[#020B1A] text-white w-full h-[150px]">
      <Image src="/cyberdex.png" alt="Logo" width={150} height={150} />{" "}
    </header>
  );
}
