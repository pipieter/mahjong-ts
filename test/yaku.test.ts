import { describe, expect, test } from "@jest/globals";
import { Tiles } from "../src/tile";
import { Meld } from "../src/hand";
import { Tanyao } from "../src/yaku/tanyao";
import { Tsumo } from "../src/yaku/tsumo";
import { Riichi } from "../src/yaku/riichi";
import { Haitei } from "../src/yaku/haitei";
import { Houtei } from "../src/yaku/houtei";
import { mockConfig, verifyUnique } from "./mock";
import { RiichiCall } from "../src/yaku/yaku";
import { Honiisou } from "../src/yaku/honiisou";
import { DoubleRiichi } from "../src/yaku/doubleriichi";
import { Ippatsu } from "../src/yaku/ippatsu";

describe("yaku tanyao", () => {
  test("non-terminals and non-honors result in tanyao", () => {
    // prettier-ignore
    const tiles = [Tiles.Sou2, Tiles.Sou3, Tiles.Sou4, Tiles.Man4, Tiles.Man4, Tiles.Man4, Tiles.Pin5, Tiles.Pin6, Tiles.Pin7, Tiles.Pin8, Tiles.Pin8, Tiles.Pin8, Tiles.Sou7, Tiles.Sou7];

    const hand = verifyUnique(tiles);
    const tanyao = new Tanyao();
    const config = mockConfig();

    expect(tanyao.check(hand, config)).toEqual(1);
  });

  test("terminals result in invalid tanyao", () => {
    // prettier-ignore
    const tiles = [Tiles.Sou2, Tiles.Sou3, Tiles.Sou4, Tiles.Man4, Tiles.Man4, Tiles.Man4, Tiles.Pin5, Tiles.Pin6, Tiles.Pin7, Tiles.Pin8, Tiles.Pin8, Tiles.Pin8, Tiles.Sou9, Tiles.Sou9];

    const hand = verifyUnique(tiles);
    const tanyao = new Tanyao();
    const config = mockConfig();

    expect(tanyao.check(hand, config)).toEqual(0);
  });

  test("honors result in invalid tanyao", () => {
    // prettier-ignore
    const tiles = [Tiles.Sou2, Tiles.Sou3, Tiles.Sou4, Tiles.Man4, Tiles.Man4, Tiles.Man4, Tiles.Pin5, Tiles.Pin6, Tiles.Pin7, Tiles.Pin8, Tiles.Pin8, Tiles.Pin8, Tiles.Nan, Tiles.Nan];

    const hand = verifyUnique(tiles);
    const tanyao = new Tanyao();
    const config = mockConfig();

    expect(tanyao.check(hand, config)).toEqual(0);
  });
});

describe("yaku riichi", () => {
  test("riichi results in yaku", () => {
    // prettier-ignore
    const tiles = [Tiles.Sou2, Tiles.Sou3, Tiles.Sou4, Tiles.Man4, Tiles.Man4, Tiles.Man4, Tiles.Pin5, Tiles.Pin6, Tiles.Pin7, Tiles.Pin8, Tiles.Pin8, Tiles.Pin8, Tiles.Sou7, Tiles.Sou7];

    const hand = verifyUnique(tiles);
    const riichi = new Riichi();
    const config = mockConfig();
    config.riichi = RiichiCall.Riichi;

    expect(riichi.check(hand, config)).toEqual(1);
  });

  test("non-riichi does not result in yaku", () => {
    // prettier-ignore
    const tiles = [Tiles.Sou2, Tiles.Sou3, Tiles.Sou4, Tiles.Man4, Tiles.Man4, Tiles.Man4, Tiles.Pin5, Tiles.Pin6, Tiles.Pin7, Tiles.Pin8, Tiles.Pin8, Tiles.Pin8, Tiles.Sou7, Tiles.Sou7];

    const hand = verifyUnique(tiles);
    const riichi = new Riichi();
    const config = mockConfig();
    config.riichi = RiichiCall.None;

    expect(riichi.check(hand, config)).toEqual(0);
  });
});

describe("yaku tsumo", () => {
  test("closed tsumo results yaku", () => {
    // prettier-ignore
    const tiles = [Tiles.Sou2, Tiles.Sou3, Tiles.Sou4, Tiles.Man4, Tiles.Man4, Tiles.Man4, Tiles.Pin5, Tiles.Pin6, Tiles.Pin7, Tiles.Pin8, Tiles.Pin8, Tiles.Pin8, Tiles.Sou7, Tiles.Sou7];

    const hand = verifyUnique(tiles);
    const tsumo = new Tsumo();
    const config = mockConfig();
    config.tsumo = true;

    expect(tsumo.check(hand, config)).toEqual(1);
  });

  test("ron does not result in yaku", () => {
    // prettier-ignore
    const tiles = [Tiles.Sou2, Tiles.Sou3, Tiles.Sou4, Tiles.Man4, Tiles.Man4, Tiles.Man4, Tiles.Pin5, Tiles.Pin6, Tiles.Pin7, Tiles.Pin8, Tiles.Pin8, Tiles.Pin8, Tiles.Sou7, Tiles.Sou7];

    const hand = verifyUnique(tiles);
    const tsumo = new Tsumo();
    const config = mockConfig();
    config.tsumo = false;

    expect(tsumo.check(hand, config)).toEqual(0);
  });

  test("open tsumo does not result in yaku", () => {
    // prettier-ignore
    const tiles = [Tiles.Man4, Tiles.Man4, Tiles.Man4, Tiles.Pin5, Tiles.Pin6, Tiles.Pin7, Tiles.Pin8, Tiles.Pin8, Tiles.Pin8, Tiles.Sou7, Tiles.Sou7];
    const meld = new Meld([Tiles.Sou2, Tiles.Sou3, Tiles.Sou4], true); // open chii call

    const hand = verifyUnique(tiles, [meld]);
    const tsumo = new Tsumo();
    const config = mockConfig();
    config.tsumo = true;

    expect(tsumo.check(hand, config)).toEqual(0);
  });
});

describe("yaku ippatsu", () => {
  test("riichi ippatsu results yaku", () => {
    // prettier-ignore
    const tiles = [Tiles.Sou2, Tiles.Sou3, Tiles.Sou4, Tiles.Man4, Tiles.Man4, Tiles.Man4, Tiles.Pin5, Tiles.Pin6, Tiles.Pin7, Tiles.Pin8, Tiles.Pin8, Tiles.Pin8, Tiles.Sou7, Tiles.Sou7];

    const hand = verifyUnique(tiles);
    const ippatsu = new Ippatsu();
    const config = mockConfig();
    config.riichi = RiichiCall.Riichi;
    config.ippatsu = true;

    expect(ippatsu.check(hand, config)).toEqual(1);
  });

  test("non-riichi ippatsu does not result in yaku", () => {
    // This state should not occur, because ippatsu should only be set to true after a riichi call.

    // prettier-ignore
    const tiles = [Tiles.Sou2, Tiles.Sou3, Tiles.Sou4, Tiles.Man4, Tiles.Man4, Tiles.Man4, Tiles.Pin5, Tiles.Pin6, Tiles.Pin7, Tiles.Pin8, Tiles.Pin8, Tiles.Pin8, Tiles.Sou7, Tiles.Sou7];

    const hand = verifyUnique(tiles);
    const ippatsu = new Ippatsu();
    const config = mockConfig();
    config.riichi = RiichiCall.None;
    config.ippatsu = true;

    expect(ippatsu.check(hand, config)).toEqual(0);
  });

  test("riichi non-ippatsu does not result in yaku", () => {
    // prettier-ignore
    const tiles = [Tiles.Sou2, Tiles.Sou3, Tiles.Sou4, Tiles.Man4, Tiles.Man4, Tiles.Man4, Tiles.Pin5, Tiles.Pin6, Tiles.Pin7, Tiles.Pin8, Tiles.Pin8, Tiles.Pin8, Tiles.Sou7, Tiles.Sou7];

    const hand = verifyUnique(tiles);
    const ippatsu = new Ippatsu();
    const config = mockConfig();
    config.riichi = RiichiCall.Riichi;
    config.ippatsu = false;

    expect(ippatsu.check(hand, config)).toEqual(0);
  });
});

describe("yaku haitei", () => {
  test("zero tiles remaining and tsumo results in haitei", () => {
    // prettier-ignore
    const tiles = [Tiles.Sou2, Tiles.Sou3, Tiles.Sou4, Tiles.Man4, Tiles.Man4, Tiles.Man4, Tiles.Pin5, Tiles.Pin6, Tiles.Pin7, Tiles.Pin8, Tiles.Pin8, Tiles.Pin8, Tiles.Sou7, Tiles.Sou7];

    const hand = verifyUnique(tiles);
    const haitei = new Haitei();
    const config = mockConfig();
    config.tsumo = true;
    config.wallCount = 0;

    expect(haitei.check(hand, config)).toEqual(1);
  });

  test("non-zero tiles remaining and tsumo does not result in haitei", () => {
    // prettier-ignore
    const tiles = [Tiles.Sou2, Tiles.Sou3, Tiles.Sou4, Tiles.Man4, Tiles.Man4, Tiles.Man4, Tiles.Pin5, Tiles.Pin6, Tiles.Pin7, Tiles.Pin8, Tiles.Pin8, Tiles.Pin8, Tiles.Sou7, Tiles.Sou7];

    const hand = verifyUnique(tiles);
    const haitei = new Haitei();
    const config = mockConfig();
    config.tsumo = true;
    config.wallCount = 20;

    expect(haitei.check(hand, config)).toEqual(0);
  });

  test("zero tiles remaining and ron does not result in haitei", () => {
    // prettier-ignore
    const tiles = [Tiles.Sou2, Tiles.Sou3, Tiles.Sou4, Tiles.Man4, Tiles.Man4, Tiles.Man4, Tiles.Pin5, Tiles.Pin6, Tiles.Pin7, Tiles.Pin8, Tiles.Pin8, Tiles.Pin8, Tiles.Sou7, Tiles.Sou7];

    const hand = verifyUnique(tiles);
    const haitei = new Haitei();
    const config = mockConfig();
    config.tsumo = false;
    config.wallCount = 20;

    expect(haitei.check(hand, config)).toEqual(0);
  });
});

describe("yaku houtei", () => {
  test("zero tiles remaining and ron results in houtei", () => {
    // prettier-ignore
    const tiles = [Tiles.Sou2, Tiles.Sou3, Tiles.Sou4, Tiles.Man4, Tiles.Man4, Tiles.Man4, Tiles.Pin5, Tiles.Pin6, Tiles.Pin7, Tiles.Pin8, Tiles.Pin8, Tiles.Pin8, Tiles.Sou7, Tiles.Sou7];

    const hand = verifyUnique(tiles);
    const houtei = new Houtei();
    const config = mockConfig();
    config.tsumo = false;
    config.wallCount = 0;

    expect(houtei.check(hand, config)).toEqual(1);
  });

  test("non-zero tiles remaining and ron does not result in houtei", () => {
    // prettier-ignore
    const tiles = [Tiles.Sou2, Tiles.Sou3, Tiles.Sou4, Tiles.Man4, Tiles.Man4, Tiles.Man4, Tiles.Pin5, Tiles.Pin6, Tiles.Pin7, Tiles.Pin8, Tiles.Pin8, Tiles.Pin8, Tiles.Sou7, Tiles.Sou7];

    const hand = verifyUnique(tiles);
    const houtei = new Houtei();
    const config = mockConfig();
    config.tsumo = false;
    config.wallCount = 20;

    expect(houtei.check(hand, config)).toEqual(0);
  });

  test("zero tiles remaining and tsumo does not result in houtei", () => {
    // prettier-ignore
    const tiles = [Tiles.Sou2, Tiles.Sou3, Tiles.Sou4, Tiles.Man4, Tiles.Man4, Tiles.Man4, Tiles.Pin5, Tiles.Pin6, Tiles.Pin7, Tiles.Pin8, Tiles.Pin8, Tiles.Pin8, Tiles.Sou7, Tiles.Sou7];

    const hand = verifyUnique(tiles);
    const houtei = new Houtei();
    const config = mockConfig();
    config.tsumo = true;
    config.wallCount = 20;

    expect(houtei.check(hand, config)).toEqual(0);
  });
});

describe("yaku double riichi", () => {
  // Other riichi tests are performed in the "yaku riichi" suite

  test("double riichi results in yaku", () => {
    // prettier-ignore
    const tiles = [Tiles.Sou2, Tiles.Sou3, Tiles.Sou4, Tiles.Man4, Tiles.Man4, Tiles.Man4, Tiles.Pin5, Tiles.Pin6, Tiles.Pin7, Tiles.Pin8, Tiles.Pin8, Tiles.Pin8, Tiles.Sou7, Tiles.Sou7];

    const hand = verifyUnique(tiles);
    const riichi = new DoubleRiichi();
    const config = mockConfig();
    config.riichi = RiichiCall.Double;

    expect(riichi.check(hand, config)).toEqual(2);
  });
});

describe("yaku honiisou", () => {
  test("open honiisou and closed honiisou give different han", () => {
    // prettier-ignore
    const open   = verifyUnique([Tiles.Sou1, Tiles.Sou2, Tiles.Sou3, Tiles.Sou5, Tiles.Sou5, Tiles.Sou5, Tiles.Haku, Tiles.Haku, Tiles.Haku, Tiles.Nan, Tiles.Nan], [new Meld([Tiles.Sou9, Tiles.Sou9, Tiles.Sou9], true)]);
    // prettier-ignore
    const closed = verifyUnique([Tiles.Sou1, Tiles.Sou2, Tiles.Sou3, Tiles.Sou5, Tiles.Sou5, Tiles.Sou5, Tiles.Haku, Tiles.Haku, Tiles.Haku, Tiles.Nan, Tiles.Nan, Tiles.Sou9, Tiles.Sou9, Tiles.Sou9]);

    const honiisou = new Honiisou();
    const config = mockConfig();

    expect(honiisou.check(open, config)).toEqual(2);
    expect(honiisou.check(closed, config)).toEqual(3);
  });

  test("honiisou requires exactly two suits", () => {
    // prettier-ignore
    const hand = verifyUnique([Tiles.Sou1, Tiles.Sou1, Tiles.Sou1, Tiles.Pei, Tiles.Pei, Tiles.Pei, Tiles.Haku, Tiles.Haku, Tiles.Haku, Tiles.Nan, Tiles.Nan, Tiles.Nan, Tiles.Chun, Tiles.Chun]);

    const honiisou = new Honiisou();
    const config = mockConfig();

    expect(honiisou.check(hand, config)).toEqual(3);
  });

  test("honiisou requires more than one suit", () => {
    // prettier-ignore
    const hand = verifyUnique([Tiles.Nan, Tiles.Nan, Tiles.Nan, Tiles.Pei, Tiles.Pei, Tiles.Pei, Tiles.Haku, Tiles.Haku, Tiles.Haku, Tiles.Nan, Tiles.Nan, Tiles.Nan, Tiles.Chun, Tiles.Chun]);

    const honiisou = new Honiisou();
    const config = mockConfig();

    expect(honiisou.check(hand, config)).toEqual(0);
  });

  test("honiisou requires less than three suits", () => {
    // prettier-ignore
    const hand = verifyUnique([Tiles.Sou1, Tiles.Sou1, Tiles.Sou1, Tiles.Man3, Tiles.Man3, Tiles.Man3, Tiles.Haku, Tiles.Haku, Tiles.Haku, Tiles.Nan, Tiles.Nan, Tiles.Nan, Tiles.Chun, Tiles.Chun]);

    const honiisou = new Honiisou();
    const config = mockConfig();

    expect(honiisou.check(hand, config)).toEqual(0);
  });

  test("honiisou requires at least one honor tile", () => {
    // prettier-ignore
    const hand = verifyUnique([Tiles.Sou1, Tiles.Sou1, Tiles.Sou1, Tiles.Sou2, Tiles.Sou2, Tiles.Sou2, Tiles.Sou8, Tiles.Sou8, Tiles.Sou8, Tiles.Man2, Tiles.Man2, Tiles.Man2, Tiles.Man5, Tiles.Man5]);

    const honiisou = new Honiisou();
    const config = mockConfig();

    expect(honiisou.check(hand, config)).toEqual(0);
  });
});
