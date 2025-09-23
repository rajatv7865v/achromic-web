import SpeakerCard from "@/components/card/speaker";
import Image from "next/image";

export default function Speakers() {
  return (
    <main className='grid grid-cols-3 gap-10 m-10 '>
      <SpeakerCard />
      <SpeakerCard />
      <SpeakerCard />
      <SpeakerCard />
      <SpeakerCard />
      <SpeakerCard />
    </main>
  );
}
