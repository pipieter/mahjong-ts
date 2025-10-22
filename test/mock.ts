import { expect } from "@jest/globals";
import { Hand, Meld } from "../src/hand";
import { ScoreConfig } from "../src/score";
import { Tile } from "../src/tile";
import { RiichiCall } from "../src/yaku/yaku";

export function mockConfig(): ScoreConfig {
  return {
    riichi: RiichiCall.None,
    tsumo: false,
    dealer: false,
    dora: [],
    uradora: [],
    akadora: 0,
    wallCount: 10,
  };
}

export function verifyUnique(tiles: Tile[], melds: Meld[] = []): Hand {
  const hands = Hand.find(tiles, melds);
  expect(hands.length).toEqual(1);
  return hands[0];
}
