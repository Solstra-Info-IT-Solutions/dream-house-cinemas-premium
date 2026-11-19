import { describe, expect, it } from "vitest";
import {
  calculateEquipmentEstimate,
  equipmentGroups,
  getAllEquipment,
  money,
} from "../../lib/equipment";

describe("equipment catalogue data", () => {
  it("contains the expected camera and lighting categories", () => {
    expect(equipmentGroups.map((group) => group.title)).toEqual(["Camera", "Lights"]);
    expect(equipmentGroups[0].items).toHaveLength(3);
    expect(equipmentGroups[1].items).toHaveLength(20);
    expect(getAllEquipment()).toHaveLength(23);
  });

  it("keeps the supplied item prices intact", () => {
    const prices = new Map(getAllEquipment().map((item) => [item.name, item.price]));
    expect(prices.get("S1H camera body")).toBe(2000);
    expect(prices.get("Sigma 24-70 lens")).toBe(800);
    expect(prices.get("Zhiyun Crane 3S gimbal")).toBe(1000);
    expect(prices.get("Aperture 1200")).toBe(1500);
    expect(prices.get("Track and trolley")).toBe(400);
  });
});

describe("calculateEquipmentEstimate", () => {
  it("totals selected items accurately", () => {
    expect(calculateEquipmentEstimate(["S1H camera body", "Baby 1000"])).toBe(2250);
  });

  it("does not double-count duplicate item names", () => {
    expect(calculateEquipmentEstimate(["S1H camera body", "S1H camera body"])).toBe(2000);
  });

  it("ignores unknown equipment names", () => {
    expect(calculateEquipmentEstimate(["not-in-catalogue"])).toBe(0);
  });

  it("returns zero for an empty selection", () => {
    expect(calculateEquipmentEstimate([])).toBe(0);
  });
});

describe("money formatting", () => {
  it("formats amounts using Indian digit grouping", () => {
    expect(money(1500)).toBe("₹1,500");
    expect(money(200000)).toBe("₹2,00,000");
  });
});
