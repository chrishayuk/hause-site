import Image from "next/image";
import { VisualPlate } from "@/vendor/hause/components/exhibition/VisualPlate";
import { EXHIBITION_STUDIES, type ExhibitionStudy } from "@/data/exhibition";

export function ExhibitionPlate({ study, paired = false }: { study: ExhibitionStudy; paired?: boolean }) {
  const plate = EXHIBITION_STUDIES[study];
  return <div className="exhibition-plate-source" data-visual-study={study}><VisualPlate className="exhibition-plate"
    media={<Image src={plate.src} alt={plate.alt} width={1536} height={1024} sizes={paired ? "(max-width: 760px) 100vw, 50vw" : "100vw"} />}
    label={plate.material} title={plate.title} reading={plate.reading}
    credit="HAUSE VISUAL STUDY · AI-GENERATED, NOT A REAL INSTALLATION" /></div>;
}
