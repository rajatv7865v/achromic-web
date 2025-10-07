import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/assets/logo/logo.png";

export default function SpeakerCard({ speaker }: { speaker: any }) {
  return (
    <div className="flex items-center bg-white py-6 px-3 text-gray-800 p-2 gap-3 rounded-xl hover:text-white hover:bg-[#be3437]">
      <section className="h-20 w-20 rounded-full border-[1px] flex items-center justify-center p-2 ">
        <Image
          src={ Logo}
          alt={speaker.name}
          width={100}
          height={70}
        />
      </section>
      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-[19px]">{speaker.name}</h3>
          <h4>{speaker?.designation}</h4>
          <h4>{speaker?.organization}</h4>
        </div>
        <h4 className="font-normal">{speaker.country}</h4>
      </section>
    </div>
  );
}
