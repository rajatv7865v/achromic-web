import SpeakerCard from "@/components/card/speaker";
import { useApi } from "@/hooks/useApi";
import { getSpeaker } from "@/services/speaker";
import { useEffect, useState } from "react";



export default function Speaker({eventId}:{eventId:string}) {
  const [speakers, setSpeakers] = useState<any>([]);
  const { data, loading, error, run } = useApi<{ data: any[] }>();

  useEffect(() => {
    (async () => {
      const res: any = await run(getSpeaker, eventId);
      setSpeakers(res.data);
    })();
  }, [run,eventId]);

  return (
    <div>
    
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Speakers</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {speakers?.map((speaker: any) => (
          <SpeakerCard speaker={speaker}/>
        ))}
      </div>
    </div>
  );
}
