import { describe, expect, test } from "@jest/globals";
import { mockConfig, verifyUnique } from "./mock";
import { Tiles } from "../src/tile";
import { Ryuuiisou } from "../src/yaku/ryuuiisou";

describe("yakuman ryuuiisou", () => {
  test("all greens results in yakuman", () => {
    // prettier-ignore
    const hand = verifyUnique([Tiles.Sou2, Tiles.Sou2, Tiles.Sou2, Tiles.Sou3, Tiles.Sou3, Tiles.Sou3, Tiles.Sou6, Tiles.Sou6, Tiles.Sou6, Tiles.Hatsu, Tiles.Hatsu, Tiles.Hatsu, Tiles.Sou4, Tiles.Sou4]);

    const ryuuiisou = new Ryuuiisou();
    const config = mockConfig();

    expect(ryuuiisou.check(hand, config)).toEqual(13);
  });
});
