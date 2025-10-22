import { describe, expect, test } from "@jest/globals";
import { Tile, Tiles } from "../src/tile";
import { CompletedHand, Meld } from "../src/hand";
import { Tanyao } from "../src/yaku/tanyao";
import { Tsumo } from "../src/yaku/tsumo";
import { Riichi } from "../src/yaku/riichi";
import { YakuConfig } from "../src/yaku/yaku";

function verifyUnique(tiles: Tile[], melds: Meld[] = []): CompletedHand {
  const hands = CompletedHand.find(tiles, melds);
  expect(hands.length).toEqual(1);
  return hands[0];
}

function defaultConfig(): YakuConfig {
  return {
    riichi: false,
    tsumo: false,
    wallCount: 0,
  };
}

describe("yaku tanyao", () => {
  test("non-terminals and non-honors result in tanyao", () => {
    // prettier-ignore
    const tiles = [Tiles.Sou2, Tiles.Sou3, Tiles.Sou4, Tiles.Man4, Tiles.Man4, Tiles.Man4, Tiles.Pin5, Tiles.Pin6, Tiles.Pin7, Tiles.Pin8, Tiles.Pin8, Tiles.Pin8, Tiles.Sou7, Tiles.Sou7];

    const hand = verifyUnique(tiles);
    const tanyao = new Tanyao();
    const config = defaultConfig();

    expect(tanyao.check(hand, config)).toEqual(true);
  });

  test("terminals result in invalid tanyao", () => {
    // prettier-ignore
    const tiles = [Tiles.Sou2, Tiles.Sou3, Tiles.Sou4, Tiles.Man4, Tiles.Man4, Tiles.Man4, Tiles.Pin5, Tiles.Pin6, Tiles.Pin7, Tiles.Pin8, Tiles.Pin8, Tiles.Pin8, Tiles.Sou9, Tiles.Sou9];

    const hand = verifyUnique(tiles);
    const tanyao = new Tanyao();
    const config = defaultConfig();

    expect(tanyao.check(hand, config)).toEqual(false);
  });

  test("honors result in invalid tanyao", () => {
    // prettier-ignore
    const tiles = [Tiles.Sou2, Tiles.Sou3, Tiles.Sou4, Tiles.Man4, Tiles.Man4, Tiles.Man4, Tiles.Pin5, Tiles.Pin6, Tiles.Pin7, Tiles.Pin8, Tiles.Pin8, Tiles.Pin8, Tiles.Nan, Tiles.Nan];

    const hand = verifyUnique(tiles);
    const tanyao = new Tanyao();
    const config = defaultConfig();

    expect(tanyao.check(hand, config)).toEqual(false);
  });
});

describe("yaku riichi", () => {
  test("riichi results in yaku", () => {
    // prettier-ignore
    const tiles = [Tiles.Sou2, Tiles.Sou3, Tiles.Sou4, Tiles.Man4, Tiles.Man4, Tiles.Man4, Tiles.Pin5, Tiles.Pin6, Tiles.Pin7, Tiles.Pin8, Tiles.Pin8, Tiles.Pin8, Tiles.Sou7, Tiles.Sou7];

    const hand = verifyUnique(tiles);
    const riichi = new Riichi();
    const config = defaultConfig();
    config.riichi = true;

    expect(riichi.check(hand, config)).toEqual(true);
  });

  test("non-riichi does not result in yaku", () => {
    // prettier-ignore
    const tiles = [Tiles.Sou2, Tiles.Sou3, Tiles.Sou4, Tiles.Man4, Tiles.Man4, Tiles.Man4, Tiles.Pin5, Tiles.Pin6, Tiles.Pin7, Tiles.Pin8, Tiles.Pin8, Tiles.Pin8, Tiles.Sou7, Tiles.Sou7];

    const hand = verifyUnique(tiles);
    const riichi = new Riichi();
    const config = defaultConfig();
    config.riichi = false;

    expect(riichi.check(hand, config)).toEqual(false);
  });
});

describe("yaku tsumo", () => {
  test("closed tsumo results yaku", () => {
    // prettier-ignore
    const tiles = [Tiles.Sou2, Tiles.Sou3, Tiles.Sou4, Tiles.Man4, Tiles.Man4, Tiles.Man4, Tiles.Pin5, Tiles.Pin6, Tiles.Pin7, Tiles.Pin8, Tiles.Pin8, Tiles.Pin8, Tiles.Sou7, Tiles.Sou7];

    const hand = verifyUnique(tiles);
    const tsumo = new Tsumo();
    const config = defaultConfig();
    config.tsumo = true;

    expect(hand.isClosed()).toEqual(true);
    expect(tsumo.check(hand, config)).toEqual(true);
  });

  test("ron does not result in yaku", () => {
    // prettier-ignore
    const tiles = [Tiles.Sou2, Tiles.Sou3, Tiles.Sou4, Tiles.Man4, Tiles.Man4, Tiles.Man4, Tiles.Pin5, Tiles.Pin6, Tiles.Pin7, Tiles.Pin8, Tiles.Pin8, Tiles.Pin8, Tiles.Sou7, Tiles.Sou7];

    const hand = verifyUnique(tiles);
    const tsumo = new Tsumo();
    const config = defaultConfig();
    config.tsumo = false;

    expect(tsumo.check(hand, config)).toEqual(false);
  });

  test("open tsumo does not result in yaku", () => {
    // prettier-ignore
    const tiles = [Tiles.Man4, Tiles.Man4, Tiles.Man4, Tiles.Pin5, Tiles.Pin6, Tiles.Pin7, Tiles.Pin8, Tiles.Pin8, Tiles.Pin8, Tiles.Sou7, Tiles.Sou7];
    const meld = new Meld([Tiles.Sou2, Tiles.Sou3, Tiles.Sou4], true); // open chii call

    const hand = verifyUnique(tiles, [meld]);
    const tsumo = new Tsumo();
    const config = defaultConfig();
    config.tsumo = true;

    expect(hand.isOpen()).toEqual(true);
    expect(tsumo.check(hand, config)).toEqual(false);
  });
});
