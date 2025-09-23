import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/assets/logo/logo.png";

export default function SpeakerCard() {
  return (
    <div className='flex items-center bg-white py-6 px-3 text-gray-800 p-2 gap-3 rounded-xl hpver:bg-[#be3437]'>
      <section className='h-20 w-20 rounded-full border-[1px] flex items-center justify-center p-2 '>
        <Image src={Logo} alt='speaker' width={100} height={70} />
      </section>
      <section className='flex flex-col gap-4'>
        <div className="flex flex-col gap-1">
          <h3 className='font-semibold text-[19px]'>Hamedy Ahrary</h3>
          <h4>Chief Sales Officers</h4>
        </div>
        <h4 className='font-normal'>SEFF securing Energy for Europe</h4>
      </section>
    </div>
  );
}
