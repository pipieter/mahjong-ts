import { describe, expect, test } from "@jest/globals";
import { Tiles, Wind } from "../src/tile";
import { mockConfig, verifyUnique } from "./mock";
import { Scorer } from "../src/score";
import { RiichiCall, YakuId } from "../src/yaku/yaku";
import { Meld } from "../src";

describe("basic scoring", () => {
  test("score tanyao tsumo", () => {
    // prettier-ignore
    const tiles = [Tiles.Sou2, Tiles.Sou3, Tiles.Sou4, Tiles.Man4, Tiles.Man4, Tiles.Man4, Tiles.Pin5, Tiles.Pin6, Tiles.Pin7, Tiles.Pin8, Tiles.Pin8, Tiles.Pin8, Tiles.Sou7, Tiles.Sou7];
    const hand = verifyUnique(tiles);
    const config = mockConfig();
    config.tsumo = true;
    config.riichi = RiichiCall.None;

    const scorer = new Scorer();
    const score = scorer.score(hand, config);

    expect(score.han).toEqual(2);
    expect(score.yakus.includes(YakuId.Tanyao));
    expect(score.yakus.includes(YakuId.Tsumo));
    expect(!score.yakus.includes(YakuId.Riichi));
  });
});

describe("fu calculation", () => {
  // Some of these examples are taken from https://riichi.wiki/Fu
  test("unique hand 110 fu", () => {
    // prettier-ignore
    const tiles = [Tiles.Man4, Tiles.Man5, Tiles.Man6, Tiles.Ton, Tiles.Ton, Tiles.Ton, Tiles.Nan, Tiles.Nan];
    // prettier-ignore
    const melds = [new Meld([Tiles.Sou1, Tiles.Sou1, Tiles.Sou1, Tiles.Sou1], false), new Meld([Tiles.Chun, Tiles.Chun, Tiles.Chun, Tiles.Chun], false)];
    const hand = verifyUnique(tiles, melds);
    const config = mockConfig();
    config.tsumo = false;
    config.agari = Tiles.Ton;
    config.seat = Wind.Nan;
    config.round = Wind.Nan;

    const scorer = new Scorer();
    const score = scorer.score(hand, config);
    const fu = scorer.fu(hand, config);

    expect(score.han).toEqual(1);
    expect(fu).toEqual(110);
  });

  test("open pinfu is 30 fu", () => {
    // prettier-ignore
    const tiles = [Tiles.Man2, Tiles.Man3, Tiles.Man4, Tiles.Pin3, Tiles.Pin4, Tiles.Pin5, Tiles.Sou2, Tiles.Sou2];
    // prettier-ignore
    const melds = [new Meld([Tiles.Pin2, Tiles.Pin3, Tiles.Pin4], true), new Meld([Tiles.Sou6, Tiles.Sou5, Tiles.Sou7], true)];
    const hand = verifyUnique(tiles, melds);
    const config = mockConfig();
    config.tsumo = false;
    config.agari = Tiles.Pin3;

    const scorer = new Scorer();
    expect(scorer.fu(hand, config)).toEqual(30);
  });

  test("chiitoitsu is 25 fu", () => {
    // prettier-ignore
    const tiles = [Tiles.Man1, Tiles.Man1, Tiles.Sou2, Tiles.Sou2, Tiles.Sou6, Tiles.Sou6, Tiles.Pin3, Tiles.Pin3, Tiles.Pin5, Tiles.Pin5, Tiles.Nan, Tiles.Nan, Tiles.Chun, Tiles.Chun];
    const hand = verifyUnique(tiles);
    const config = mockConfig();

    const scorer = new Scorer();
    expect(scorer.fu(hand, config)).toEqual(25);
  });

  test("closed pinfu tsumo is 20 fu and closed pinfu ron is 30 fu", () => {
    // prettier-ignore
    const tiles = [Tiles.Man1, Tiles.Man2, Tiles.Man3, Tiles.Sou4, Tiles.Sou5, Tiles.Sou6, Tiles.Sou7, Tiles.Sou8, Tiles.Sou9, Tiles.Pin2, Tiles.Pin3, Tiles.Pin4, Tiles.Pin5, Tiles.Pin5];
    const hand = verifyUnique(tiles);
    const config = mockConfig();
    const scorer = new Scorer();

    const tsumos: [boolean, number][] = [
      [true, 20],
      [false, 30],
    ];

    for (const [tsumo, fu] of tsumos) {
      config.agari = Tiles.Sou4;
      config.tsumo = tsumo;
      expect(scorer.fu(hand, config)).toEqual(fu);
    }
  });
});
