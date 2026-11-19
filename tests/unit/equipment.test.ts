import { describe, expect, it } from "vitest";
import { calculateEquipmentEstimate, equipmentGroups, isKnownEquipmentItem, money } from "../../lib/equipment";

describe("equipment inventory", () => {
  it("contains the two expected equipment categories", () => {
    expect(equipmentGroups.map((group) => group.title)).toEqual(["Camera", "Lights"]);
  });

  it("has unique names and positive integer rates", () => {
    const items = equipmentGroups.flatMap((group) => group.items);
    const names = items.map((item) => item.name);
    expect(new Set(names).size).toBe(names.length);
    for (const item of items) {
      expect(Number.isInteger(item.price)).toBe(true);
      expect(item.price).toBeGreaterThan(0);
    }
  });

  it("retains the client-provided camera and lighting rates", () => {
    expect(equipmentGroups[0].items).toEqual([
      { name: "S1H camera body", price: 2000 },
      { name: "Sigma 24-70 lens", price: 800 },
      { name: "Zhiyun Crane 3S gimbal", price: 1000 },
    ]);
    expect(equipmentGroups[1].items).toHaveLength(20);
  });
});

describe("rental estimate helpers", () => {
  it("calculates totals for selected equipment", () => {
    expect(calculateEquipmentEstimate(["S1H camera body", "Sigma 24-70 lens"])).toBe(2800);
  });

  it("does not double-count duplicate selections", () => {
    expect(calculateEquipmentEstimate(["S1H camera body", "S1H camera body"])).toBe(2000);
  });

  it("ignores unknown or tampered query-string item names", () => {
    expect(isKnownEquipmentItem("S1H camera body")).toBe(true);
    expect(isKnownEquipmentItem("Made up camera")).toBe(false);
    expect(calculateEquipmentEstimate(["Made up camera", "S1H camera body"])).toBe(2000);
  });

  it("formats Indian rupee amounts consistently", () => {
    expect(money(2800)).toBe("₹2,800");
  });
});
