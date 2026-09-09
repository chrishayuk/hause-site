/** Original concept imagery, never evidence of a physical exhibition or adoption. */
export const EXHIBITION_STUDIES = {
  concealment: {
    title: "The container can conceal the difference.",
    material: "WHY / THE FLATTENING",
    src: "/media/exhibition/concealment.png",
    alt: "AI-generated exhibition study: identical frosted-glass screens obscure four different sculptural objects in a dark gallery.",
    reading: "The objects are different. The surface through which you meet them is the same. Now try the interface equivalent below.",
  },
  collection: {
    title: "A collection. Not a kit of parts.",
    material: "FORMS / THE CURATOR’S TABLE",
    src: "/media/exhibition/collection.png",
    alt: "AI-generated exhibition study: paper studies, brass instruments, glass lenses and silk maquettes share an illuminated curatorial workbench.",
    reading: "Some things ask to be read. Others need your hand. Others need time. These imagined objects introduce three ways of meeting an idea—not physical versions of the components.",
  },
  attention: {
    title: "Give one idea the whole room.",
    material: "01 / COPPER · ATTENTION",
    src: "/media/exhibition/attention.png",
    alt: "AI-generated exhibition study: a folded copper sheet stands alone on a limestone platform in a vast dark gallery.",
    reading: "The object is small in the frame. The attention it receives is not. Space is already doing some of the explaining.",
  },
  structure: {
    title: "Let the structure catch the light.",
    material: "02 / GLASS · STRUCTURE",
    src: "/media/exhibition/structure.png",
    alt: "AI-generated exhibition study: staggered amber and smoke-glass fins cast long, overlapping shadows across a sunlit stone floor.",
    reading: "An opaque object asks you to accept its surface. Separate the layers and you can begin to inspect how it is made.",
  },
  passage: {
    title: "The approach is part of the story.",
    material: "03 / SILK · PASSAGE",
    src: "/media/exhibition/passage.png",
    alt: "AI-generated exhibition study: towering translucent silk panels form a dark passage towards a distant copper-lit opening.",
    reading: "Not everything arrives at once. A glimpse, an interval, another glimpse. The sequence changes what the ending means.",
  },
} as const;
export type ExhibitionStudy = keyof typeof EXHIBITION_STUDIES;
