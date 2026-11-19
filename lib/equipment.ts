export type EquipmentItem = Readonly<{ name: string; price: number }>;
export type EquipmentGroup = Readonly<{ title: string; items: readonly EquipmentItem[] }>;

export const equipmentGroups: readonly EquipmentGroup[] = [
  {
    title: "Camera",
    items: [
      { name: "S1H camera body", price: 2000 },
      { name: "Sigma 24-70 lens", price: 800 },
      { name: "Zhiyun Crane 3S gimbal", price: 1000 },
    ],
  },
  {
    title: "Lights",
    items: [
      { name: "Nanlight 500", price: 600 },
      { name: "300", price: 400 },
      { name: "Other LED light", price: 400 },
      { name: "RGB tube (one tube)", price: 500 },
      { name: "Aperture 1200", price: 1500 },
      { name: "Baby 1000", price: 250 },
      { name: "Baby 800", price: 250 },
      { name: "Baby 350", price: 200 },
      { name: "Baby 150", price: 150 },
      { name: "One KV", price: 150 },
      { name: "Two KV", price: 200 },
      { name: "Cool light", price: 300 },
      { name: "C stand", price: 150 },
      { name: "Jumbo stand", price: 250 },
      { name: "All frames", price: 500 },
      { name: "White clothes", price: 100 },
      { name: "Black clothes", price: 100 },
      { name: "Skimmer 12×12", price: 200 },
      { name: "Generator", price: 800 },
      { name: "Track and trolley", price: 400 },
    ],
  },
] as const;

const equipmentByName = new Map(
  equipmentGroups.flatMap((group) => group.items.map((item) => [item.name, item] as const)),
);

export function isKnownEquipmentItem(name: string): boolean {
  return equipmentByName.has(name);
}

export function calculateEquipmentEstimate(selectedNames: readonly string[]): number {
  const uniqueNames = new Set(selectedNames);
  return [...uniqueNames].reduce((total, name) => total + (equipmentByName.get(name)?.price ?? 0), 0);
}

export function money(amount: number): string {
  return "₹" + amount.toLocaleString("en-IN");
}
