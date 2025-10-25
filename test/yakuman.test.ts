import { describe, expect, test } from "@jest/globals";
import { mockConfig, verifyUnique } from "./mock";
import { Daisangen, Wind, Chiihou, Tenhou, Tiles, Ryuuiisou } from "../src";

describe("yakuman ryuuiisou", () => {
  test("all greens results in yakuman", () => {
    // prettier-ignore
    const hand = verifyUnique([Tiles.Sou2, Tiles.Sou2, Tiles.Sou2, Tiles.Sou3, Tiles.Sou3, Tiles.Sou3, Tiles.Sou6, Tiles.Sou6, Tiles.Sou6, Tiles.Hatsu, Tiles.Hatsu, Tiles.Hatsu, Tiles.Sou4, Tiles.Sou4]);

    const ryuuiisou = new Ryuuiisou();
    const config = mockConfig();

    expect(ryuuiisou.check(hand, config)).toEqual(13);
  });
});

describe("yakuman tenhou and chiihou", () => {
  test("turn one dealer tsumo is tenhou", () => {
    // prettier-ignore
    const hand = verifyUnique([Tiles.Man1, Tiles.Man2, Tiles.Man3, Tiles.Pin1, Tiles.Pin2, Tiles.Pin2, Tiles.Pin3, Tiles.Pin3, Tiles.Pin4, Tiles.Pin5, Tiles.Pin6, Tiles.Pin7, Tiles.Pin8, Tiles.Pin8]);

    const tenhou = new Tenhou();
    const config = mockConfig();
    config.tsumo = true;
    config.seat = Wind.Ton;
    config.turn = 1;

    expect(tenhou.check(hand, config)).toEqual(13);
  });

  test("turn one non-dealer tsumo is chiihou", () => {
    // prettier-ignore
    const hand = verifyUnique([Tiles.Man1, Tiles.Man2, Tiles.Man3, Tiles.Pin1, Tiles.Pin2, Tiles.Pin2, Tiles.Pin3, Tiles.Pin3, Tiles.Pin4, Tiles.Pin5, Tiles.Pin6, Tiles.Pin7, Tiles.Pin8, Tiles.Pin8]);

    const chiihou = new Chiihou();
    const config = mockConfig();
    config.tsumo = true;
    config.seat = Wind.Nan;
    config.turn = 1;

    expect(chiihou.check(hand, config)).toEqual(13);
  });

  test("chiihou and tenhou are incompatible", () => {
    // prettier-ignore
    const hand = verifyUnique([Tiles.Man1, Tiles.Man2, Tiles.Man3, Tiles.Pin1, Tiles.Pin2, Tiles.Pin2, Tiles.Pin3, Tiles.Pin3, Tiles.Pin4, Tiles.Pin5, Tiles.Pin6, Tiles.Pin7, Tiles.Pin8, Tiles.Pin8]);

    const tenhou = new Tenhou();
    const chiihou = new Chiihou();

    const config = mockConfig();
    config.tsumo = true;
    config.turn = 1;

    for (const wind of Object.values(Wind)) {
      config.seat = wind as Wind;

      expect(chiihou.check(hand, config)).not.toEqual(tenhou.check(hand, config));
    }
  });
});

describe("yakuman ryuuiisou", () => {
  test("three dragons results in yakuman", () => {
    // prettier-ignore
    const hand = verifyUnique([Tiles.Hatsu, Tiles.Hatsu, Tiles.Hatsu, Tiles.Haku, Tiles.Haku, Tiles.Haku, Tiles.Chun, Tiles.Chun, Tiles.Chun, Tiles.Pin2, Tiles.Pin2, Tiles.Pin2, Tiles.Sou4, Tiles.Sou4]);

    const daisangen = new Daisangen();
    const config = mockConfig();

    expect(daisangen.check(hand, config)).toEqual(13);
  });

  test("three dragons requires all three dragon pairs", () => {
    // prettier-ignore
    const hand = verifyUnique([Tiles.Hatsu, Tiles.Hatsu, Tiles.Hatsu, Tiles.Haku, Tiles.Haku, Tiles.Haku, Tiles.Chun, Tiles.Chun, Tiles.Pin2, Tiles.Pin2, Tiles.Pin2, Tiles.Sou4, Tiles.Sou4, Tiles.Sou4]);

    const daisangen = new Daisangen();
    const config = mockConfig();

    expect(daisangen.check(hand, config)).toEqual(0);
  });
});
