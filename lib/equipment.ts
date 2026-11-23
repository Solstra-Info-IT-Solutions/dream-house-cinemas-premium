export type EquipmentItem = { name: string; price: number };

export const equipmentGroups: { title: string; items: EquipmentItem[] }[] = [
 { title: "Camera", items: [
  {name:"S1H camera body",price:2000},
  {name:"Sigma 24-70 lens",price:800},
  {name:"Zhiyun Crane 3S gimbal",price:1000},
 ]},
 { title: "Lights", items: [
  {name:"Nanlight 500",price:600},{name:"300",price:400},{name:"Other LED light",price:400},
  {name:"RGB tube (one tube)",price:500},{name:"Aperture 1200",price:1500},{name:"Baby 1000",price:250},
  {name:"Baby 800",price:250},{name:"Baby 350",price:200},{name:"Baby 150",price:150},
  {name:"One KV",price:150},{name:"Two KV",price:200},{name:"Cool light",price:300},
  {name:"C stand",price:150},{name:"Jumbo stand",price:250},{name:"All frames",price:500},
  {name:"White clothes",price:100},{name:"Black clothes",price:100},{name:"Skimmer 12×12",price:200},
  {name:"Generator",price:800},{name:"Track and trolley",price:400}
 ]}
];
export const money = (amount:number) => "₹"+amount.toLocaleString("en-IN");

export const getAllEquipment = (): EquipmentItem[] =>
  equipmentGroups.flatMap((group) => group.items);

export const calculateEquipmentEstimate = (selectedNames: readonly string[]): number => {
  const selected = new Set(selectedNames);
  return getAllEquipment()
    .filter((item) => selected.has(item.name))
    .reduce((total, item) => total + item.price, 0);
};
