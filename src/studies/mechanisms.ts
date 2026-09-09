export const PARTS = ["LOOK", "ASK", "TEST", "SAY"];
export const PART_DETAILS = ["Notice the material.", "Name the uncertainty.", "Inspect the support.", "State what follows."];
export const BYTE_FIELDS = [
  { name: "Magic", bytes: 4, meaning: "Identifies this illustrative format." },
  { name: "Version", bytes: 4, meaning: "Names the format revision." },
  { name: "Length", bytes: 8, meaning: "Stores the declared payload length." },
  { name: "Payload", bytes: 16, meaning: "Holds the example's content." },
];
export const fieldOffset = (index: number) => BYTE_FIELDS.slice(0, index).reduce((sum, field) => sum + field.bytes, 0);
export const activeUnits = (scenario: number) => Array.from({ length: 6 }, (_, i) => (i * 5 + scenario * 7) % 36);
export const arrangement = (index: number, progress: number) => ({
  left: 47 + index * 2 + (10 + index * 80 / 3 - 47 - index * 2) * progress,
  top: 55 - index * 3 + (45 - 55 + index * 3) * progress,
});
export const cappedGrade = (caps: number[]) => Math.max(0, ...caps);
export const channelCount = (payload: number) => Math.floor(12 / payload);
