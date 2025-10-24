import { describe, expect, test } from "@jest/globals";
import { Tile, Tiles } from "../src/tile";
import { Hand, Meld } from "../src/hand";
import { Tanyao } from "../src/yaku/tanyao";
import { Tsumo } from "../src/yaku/tsumo";
import { Riichi } from "../src/yaku/riichi";
import { Haitei } from "../src/yaku/haitei";
import { Houtei } from "../src/yaku/houtei";
import { mockConfig, verifyUnique } from "./mock";
import { RiichiCall, Wind, Yaku } from "../src/yaku/yaku";
import { Honiisou } from "../src/yaku/honiisou";
import { DoubleRiichi } from "../src/yaku/doubleriichi";
import { Ippatsu } from "../src/yaku/ippatsu";
import { Ryanpeikou } from "../src/yaku/ryanpeikou";
import { Chiitoitsu } from "../src/yaku/chiitoitsu";
import { Iipeikou } from "../src/yaku/iipeikou";
import { Ittsuu } from "../src/yaku/ittsuu";
import { Chankan } from "../src/yaku/chankan";
import { Rinshan } from "../src/yaku/rinshan";
import {
  ChunYakuhai,
  EastRound,
  EastSeat,
  HakuYakuhai,
  HatsuYakuhai,
  NorthRound,
  NorthSeat,
  SouthRound,
  SouthSeat,
  WestRound,
  WestSeat,
} from "../src/yaku/yakuhai";

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

describe("yaku ryanpeikou", () => {
  test("two sets of identical sequences results in ryanpeikou", () => {
    const chii1 = new Meld([Tiles.Sou1, Tiles.Sou2, Tiles.Sou3], false);
    const chii2 = new Meld([Tiles.Man3, Tiles.Man4, Tiles.Man5], false);
    const pair = new Meld([Tiles.Nan, Tiles.Nan], false);
    const hand = new Hand([chii1, chii1, chii2, chii2, pair]);

    const ryanpeikou = new Ryanpeikou();
    const config = mockConfig();

    expect(ryanpeikou.check(hand, config)).toEqual(3);
  });

  test("ryanpeikou must be closed", () => {
    const chii1 = new Meld([Tiles.Sou1, Tiles.Sou2, Tiles.Sou3], false);
    const chii2 = new Meld([Tiles.Man3, Tiles.Man4, Tiles.Man5], false);
    const chii3 = new Meld([Tiles.Man3, Tiles.Man4, Tiles.Man5], true);
    const pair = new Meld([Tiles.Nan, Tiles.Nan], false);
    const hand = new Hand([chii1, chii1, chii2, chii3, pair]);

    const ryanpeikou = new Ryanpeikou();
    const config = mockConfig();

    expect(ryanpeikou.check(hand, config)).toEqual(0);
  });
});

describe("yaku iipeikou", () => {
  test("one set of identical sequences results in iipeikou", () => {
    // prettier-ignore
    const hand = verifyUnique([Tiles.Sou1, Tiles.Sou2, Tiles.Sou3, Tiles.Sou1, Tiles.Sou2, Tiles.Sou3, Tiles.Man5, Tiles.Man5, Tiles.Man5, Tiles.Nan, Tiles.Nan, Tiles.Nan, Tiles.Pei, Tiles.Pei]);
    const iipeikou = new Iipeikou();
    const config = mockConfig();

    expect(iipeikou.check(hand, config)).toEqual(1);
  });

  test("iipeikou must be closed", () => {
    // prettier-ignore
    const hand = verifyUnique([Tiles.Sou1, Tiles.Sou2, Tiles.Sou3, Tiles.Man5, Tiles.Man5, Tiles.Man5, Tiles.Nan, Tiles.Nan, Tiles.Nan, Tiles.Pei, Tiles.Pei], [new Meld([Tiles.Sou1, Tiles.Sou2, Tiles.Sou3], true)]);
    const iipeikou = new Iipeikou();
    const config = mockConfig();

    expect(iipeikou.check(hand, config)).toEqual(0);
  });

  test("iipeikou and ryanpeikou are incompatible", () => {
    const chii1 = new Meld([Tiles.Sou1, Tiles.Sou2, Tiles.Sou3], false);
    const chii2 = new Meld([Tiles.Man4, Tiles.Man5, Tiles.Man6], false);
    const pair = new Meld([Tiles.Nan, Tiles.Nan], false);
    const hand = new Hand([chii1, chii1, chii2, chii2, pair]);

    const ryanpeikou = new Ryanpeikou();
    const iipeikou = new Iipeikou();
    const config = mockConfig();

    expect(ryanpeikou.check(hand, config)).toEqual(3);
    expect(iipeikou.check(hand, config)).toEqual(0);
  });
});

describe("yaku chiitoitsu", () => {
  test("seven unique pairs results in yaku", () => {
    const pair1 = [Tiles.Sou1, Tiles.Sou1];
    const pair2 = [Tiles.Sou2, Tiles.Sou2];
    const pair3 = [Tiles.Man4, Tiles.Man4];
    const pair4 = [Tiles.Pin6, Tiles.Pin6];
    const pair5 = [Tiles.Nan, Tiles.Nan];
    const pair6 = [Tiles.Ton, Tiles.Ton];
    const pair7 = [Tiles.Pei, Tiles.Pei];
    const hand = verifyUnique([...pair1, ...pair2, ...pair3, ...pair4, ...pair5, ...pair6, ...pair7]);

    const chiitoitsu = new Chiitoitsu();
    const config = mockConfig();

    expect(chiitoitsu.check(hand, config)).toEqual(2);
  });

  test("seven non-unique pairs does not result in yaku", () => {
    const pair1 = [Tiles.Sou1, Tiles.Sou1];
    const pair2 = [Tiles.Sou2, Tiles.Sou2];
    const pair3 = [Tiles.Man4, Tiles.Man4];
    const pair4 = [Tiles.Pin6, Tiles.Pin6];
    const pair5 = [Tiles.Nan, Tiles.Nan];
    const pair6 = [Tiles.Ton, Tiles.Ton];
    const hand = verifyUnique([...pair1, ...pair2, ...pair3, ...pair4, ...pair5, ...pair6, ...pair6]);

    const chiitoitsu = new Chiitoitsu();
    const config = mockConfig();

    expect(chiitoitsu.check(hand, config)).toEqual(0);
  });

  test("chiitoitsu should be closed", () => {
    // This situation should not be possible, as a pair cannot be open in any way. Still, the rules indicate that
    // chiitoitsu must be a closed hand.
    const pair1 = new Meld([Tiles.Sou1, Tiles.Sou1], true);
    const pair2 = new Meld([Tiles.Sou2, Tiles.Sou2], false);
    const pair3 = new Meld([Tiles.Man4, Tiles.Man4], false);
    const pair4 = new Meld([Tiles.Pin6, Tiles.Pin6], false);
    const pair5 = new Meld([Tiles.Nan, Tiles.Nan], false);
    const pair6 = new Meld([Tiles.Ton, Tiles.Ton], false);
    const pair7 = new Meld([Tiles.Pei, Tiles.Pei], false);
    const hand = new Hand([pair1, pair2, pair3, pair4, pair5, pair6, pair7]);

    const chiitoitsu = new Chiitoitsu();
    const config = mockConfig();

    expect(chiitoitsu.check(hand, config)).toEqual(0);
  });

  test("chiitoitsu must have seven pairs, fewer", () => {
    const pair1 = [Tiles.Sou1, Tiles.Sou1];
    const pair2 = [Tiles.Sou2, Tiles.Sou2];
    const pair3 = [Tiles.Man4, Tiles.Man4];
    const pair4 = [Tiles.Pin6, Tiles.Pin6];
    const pair5 = [Tiles.Nan, Tiles.Nan];
    const pair6 = [Tiles.Ton, Tiles.Ton];
    const hand = verifyUnique([...pair1, ...pair2, ...pair3, ...pair4, ...pair5, ...pair6]);

    const chiitoitsu = new Chiitoitsu();
    const config = mockConfig();

    expect(chiitoitsu.check(hand, config)).toEqual(0);
  });

  test("chiitoitsu must have seven pairs, more", () => {
    const pair1 = [Tiles.Sou1, Tiles.Sou1];
    const pair2 = [Tiles.Sou2, Tiles.Sou2];
    const pair3 = [Tiles.Man4, Tiles.Man4];
    const pair4 = [Tiles.Pin6, Tiles.Pin6];
    const pair5 = [Tiles.Nan, Tiles.Nan];
    const pair6 = [Tiles.Ton, Tiles.Ton];
    const pair7 = [Tiles.Pin1, Tiles.Pin1];
    const pair8 = [Tiles.Pin2, Tiles.Pin2];
    const hand = verifyUnique([...pair1, ...pair2, ...pair3, ...pair4, ...pair5, ...pair6, ...pair7, ...pair8]);

    const chiitoitsu = new Chiitoitsu();
    const config = mockConfig();

    expect(chiitoitsu.check(hand, config)).toEqual(0);
  });
});

describe("yaku ittsuu", () => {
  test("one-suit straight results in yaku", () => {
    // prettier-ignore
    const hand = verifyUnique([Tiles.Sou1, Tiles.Sou2, Tiles.Sou3, Tiles.Sou4, Tiles.Sou5, Tiles.Sou6, Tiles.Sou7, Tiles.Sou8, Tiles.Sou9, Tiles.Chun, Tiles.Chun, Tiles.Chun, Tiles.Nan, Tiles.Nan]);

    const ittsuu = new Ittsuu();
    const config = mockConfig();

    expect(ittsuu.check(hand, config)).toEqual(2);
  });

  test("open scores one less han", () => {
    // prettier-ignore
    const hand = verifyUnique([Tiles.Sou4, Tiles.Sou5, Tiles.Sou6, Tiles.Sou7, Tiles.Sou8, Tiles.Sou9, Tiles.Chun, Tiles.Chun, Tiles.Chun, Tiles.Nan, Tiles.Nan], [new Meld([Tiles.Sou1, Tiles.Sou2, Tiles.Sou3], true)]);

    const ittsuu = new Ittsuu();
    const config = mockConfig();

    expect(ittsuu.check(hand, config)).toEqual(1);
  });

  test("hand must have 123, 456, and 789 formations, not just tiles", () => {
    // The hand below contains a 123 chii, 567 chii, 789 chii, and a 44 pair. This should not qualify as an ittsuu.
    // prettier-ignore
    const hand = verifyUnique([Tiles.Sou1, Tiles.Sou2, Tiles.Sou3, Tiles.Sou5, Tiles.Sou6, Tiles.Sou7, Tiles.Sou7, Tiles.Sou8, Tiles.Sou9, Tiles.Chun, Tiles.Chun, Tiles.Chun, Tiles.Sou4, Tiles.Sou4]);

    const ittsuu = new Ittsuu();
    const config = mockConfig();

    expect(ittsuu.check(hand, config)).toEqual(0);
  });
});

describe("yaku chankan", () => {
  test("chankan results in yaku", () => {
    // prettier-ignore
    const hand = verifyUnique([Tiles.Sou1, Tiles.Sou2, Tiles.Sou3, Tiles.Sou4, Tiles.Sou5, Tiles.Sou6, Tiles.Sou7, Tiles.Sou8, Tiles.Sou9, Tiles.Chun, Tiles.Chun, Tiles.Chun, Tiles.Nan, Tiles.Nan]);

    const chankan = new Chankan();
    const config = mockConfig();
    config.chankan = true;

    expect(chankan.check(hand, config)).toEqual(1);
  });

  test("non-chankan does not result in yaku", () => {
    // prettier-ignore
    const hand = verifyUnique([Tiles.Sou1, Tiles.Sou2, Tiles.Sou3, Tiles.Sou4, Tiles.Sou5, Tiles.Sou6, Tiles.Sou7, Tiles.Sou8, Tiles.Sou9, Tiles.Chun, Tiles.Chun, Tiles.Chun, Tiles.Nan, Tiles.Nan]);

    const chankan = new Chankan();
    const config = mockConfig();
    config.chankan = false;

    expect(chankan.check(hand, config)).toEqual(0);
  });
});

describe("yaku rinshan kaihou", () => {
  test("rinshan results in yaku", () => {
    // prettier-ignore
    const hand = verifyUnique([Tiles.Sou1, Tiles.Sou2, Tiles.Sou3, Tiles.Sou4, Tiles.Sou5, Tiles.Sou6, Tiles.Sou7, Tiles.Sou8, Tiles.Sou9, Tiles.Chun, Tiles.Chun, Tiles.Chun, Tiles.Nan, Tiles.Nan]);

    const rinshan = new Rinshan();
    const config = mockConfig();
    config.rinshan = true;

    expect(rinshan.check(hand, config)).toEqual(1);
  });

  test("non-rinshan does not result in yaku", () => {
    // prettier-ignore
    const hand = verifyUnique([Tiles.Sou1, Tiles.Sou2, Tiles.Sou3, Tiles.Sou4, Tiles.Sou5, Tiles.Sou6, Tiles.Sou7, Tiles.Sou8, Tiles.Sou9, Tiles.Chun, Tiles.Chun, Tiles.Chun, Tiles.Nan, Tiles.Nan]);

    const rinshan = new Rinshan();
    const config = mockConfig();
    config.rinshan = false;

    expect(rinshan.check(hand, config)).toEqual(0);
  });
});

describe("yaku yakuhai", () => {
  test("seat winds result in yaku", () => {
    // prettier-ignore
    const tiles = [Tiles.Sou1, Tiles.Sou2, Tiles.Sou3, Tiles.Man4, Tiles.Man5, Tiles.Man6, Tiles.Pin7, Tiles.Pin8, Tiles.Pin9, Tiles.Pin2, Tiles.Pin2];

    const winds: [Yaku, Tile, Wind][] = [
      [new EastSeat(), Tiles.Ton, Wind.Ton],
      [new SouthSeat(), Tiles.Nan, Wind.Nan],
      [new WestSeat(), Tiles.Shaa, Wind.Shaa],
      [new NorthSeat(), Tiles.Pei, Wind.Pei],
    ];
    const yakus = winds.map((wind) => wind[0]);

    const config = mockConfig();
    for (const [yaku, tile, wind] of winds) {
      const meld = new Meld([tile, tile, tile], true);
      const hand = verifyUnique(tiles, [meld]);
      config.seat = wind;

      expect(yaku.check(hand, config)).toEqual(1);

      // Make sure the other winds aren't valid
      for (const windYaku of yakus) {
        if (windYaku.id === yaku.id) continue;

        expect(windYaku.check(hand, config)).toEqual(0);
      }
    }
  });

  test("rounds winds result in yaku", () => {
    // prettier-ignore
    const tiles = [Tiles.Sou1, Tiles.Sou2, Tiles.Sou3, Tiles.Man4, Tiles.Man5, Tiles.Man6, Tiles.Pin7, Tiles.Pin8, Tiles.Pin9, Tiles.Pin2, Tiles.Pin2];

    const winds: [Yaku, Tile, Wind][] = [
      [new EastRound(), Tiles.Ton, Wind.Ton],
      [new SouthRound(), Tiles.Nan, Wind.Nan],
      [new WestRound(), Tiles.Shaa, Wind.Shaa],
      [new NorthRound(), Tiles.Pei, Wind.Pei],
    ];
    const yakus = winds.map((wind) => wind[0]);

    const config = mockConfig();
    for (const [yaku, tile, wind] of winds) {
      const meld = new Meld([tile, tile, tile], true);
      const hand = verifyUnique(tiles, [meld]);
      config.round = wind;

      expect(yaku.check(hand, config)).toEqual(1);

      // Make sure the other winds aren't valid
      for (const windYaku of yakus) {
        if (windYaku.id === yaku.id) continue;

        expect(windYaku.check(hand, config)).toEqual(0);
      }
    }
  });

  test("dragon yakuhai result in yaku", () => {
    // prettier-ignore
    const tiles = [Tiles.Sou1, Tiles.Sou2, Tiles.Sou3, Tiles.Man4, Tiles.Man5, Tiles.Man6, Tiles.Pin7, Tiles.Pin8, Tiles.Pin9, Tiles.Pin2, Tiles.Pin2];

    const dragons: [Yaku, Tile][] = [
      [new HakuYakuhai(), Tiles.Haku],
      [new HatsuYakuhai(), Tiles.Hatsu],
      [new ChunYakuhai(), Tiles.Chun],
    ];
    const yakus = dragons.map((wind) => wind[0]);

    const config = mockConfig();
    for (const [yaku, tile] of dragons) {
      const meld = new Meld([tile, tile, tile], true);
      const hand = verifyUnique(tiles, [meld]);

      expect(yaku.check(hand, config)).toEqual(1);

      // Make sure the other dragons aren't valid
      for (const dragonYaku of yakus) {
        if (dragonYaku.id === yaku.id) continue;

        expect(dragonYaku.check(hand, config)).toEqual(0);
      }
    }
  });
});
