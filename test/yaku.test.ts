import { expect, test } from "@jest/globals";
import { Tiles } from "../src/tile";
import { CompletedHand } from "../src/hand";
import { Tanyao } from "../src/yaku/tanyao";
import { YakuConfig } from "../src/yaku/yaku";

function defaultConfig(): YakuConfig {
  return {
    riichi: false,
    tsumo: false,
    wallCount: 0,
  };
}

test("yaku tanyao", () => {
  const tiles = [
    Tiles.Sou2,
    Tiles.Sou3,
    Tiles.Sou4,
    Tiles.Man4,
    Tiles.Man4,
    Tiles.Man4,
    Tiles.Pin5,
    Tiles.Pin6,
    Tiles.Pin7,
    Tiles.Pin8,
    Tiles.Pin8,
    Tiles.Pin8,
    Tiles.Sou7,
    Tiles.Sou7,
  ];

  const hands = CompletedHand.find(tiles, []);
  expect(hands.length).toEqual(1);

  const hand = hands[0];
  const tanyao = new Tanyao();
  const config = defaultConfig();

  expect(tanyao.check(hand, config)).toEqual(true);
});


test("yaku invalid tanyao", () => {
  const tiles = [
    Tiles.Sou2,
    Tiles.Sou3,
    Tiles.Sou4,
    Tiles.Man4,
    Tiles.Man4,
    Tiles.Man4,
    Tiles.Pin5,
    Tiles.Pin6,
    Tiles.Pin7,
    Tiles.Pin8,
    Tiles.Pin8,
    Tiles.Pin8,
    Tiles.Sou9,
    Tiles.Sou9,
  ];

  const hands = CompletedHand.find(tiles, []);
  expect(hands.length).toEqual(1);

  const hand = hands[0];
  const tanyao = new Tanyao();
  const config = defaultConfig();

  expect(tanyao.check(hand, config)).toEqual(false);
});
