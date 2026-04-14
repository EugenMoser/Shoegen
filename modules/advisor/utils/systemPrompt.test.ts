import { buildSystemPrompt } from './systemPrompt';

describe("buildSystemPrompt", () => {
  it("returns a non-empty string", () => {
    const prompt = buildSystemPrompt();
    expect(typeof prompt).toBe("string");
    expect(prompt.length).toBeGreaterThan(0);
  });

  it("contains all valid categories", () => {
    const prompt = buildSystemPrompt();
    expect(prompt).toContain("SNEAKER");
    expect(prompt).toContain("HIKING");
    expect(prompt).toContain("BOOT");
  });

  it("contains all valid terrains", () => {
    const prompt = buildSystemPrompt();
    expect(prompt).toContain("TRAIL");
    expect(prompt).toContain("MOUNTAIN");
    expect(prompt).toContain("CITY");
  });

  it("contains all valid seasons", () => {
    const prompt = buildSystemPrompt();
    expect(prompt).toContain("WINTER");
    expect(prompt).toContain("SUMMER");
    expect(prompt).toContain("ALL_SEASON");
  });

  it("contains the instruction to call filterShoes", () => {
    const prompt = buildSystemPrompt();
    expect(prompt).toContain("filterShoes");
  });
});
