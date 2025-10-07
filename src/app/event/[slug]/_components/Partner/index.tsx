import { useApi } from "@/hooks/useApi";
import { getPartner } from "@/services/partner";
import Image from "next/image";
import { useEffect, useState } from "react";
import Logo from "@/components/assets/logo/logo.png";
import Link from "next/link";

export default function Partner({ eventId }: { eventId: string }) {
  const [partners, setPartners] = useState<any>([]);
  const { data, loading, error, run } = useApi<{ data: any[] }>();

  useEffect(() => {
    (async () => {
      const res: any = await run(getPartner, eventId);
      setPartners(res.data);
    })();
  }, [run, eventId]);

  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Partners</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {partners.map((partner: any) => (
          <div
            key={partner._id}
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-100"
          >
            <Link href={partner?.companyUrl ||'/'} className="text-center">
              <Image
                src={partner.imageUrl || Logo}
                alt={partner.name}
                className="h-full w-full"
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
