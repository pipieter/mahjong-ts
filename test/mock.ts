import { expect } from "@jest/globals";
import { Hand, Meld } from "../src/hand";
import { ScoreConfig } from "../src/score";
import { Tile } from "../src/tile";

export function mockConfig(): ScoreConfig {
  return {
    riichi: false,
    tsumo: false,
    dealer: false,
    dora: [],
    uradora: [],
    akadora: 0,
    wallCount: 0,
  };
}

export function verifyUnique(tiles: Tile[], melds: Meld[] = []): Hand {
  const hands = Hand.find(tiles, melds);
  expect(hands.length).toEqual(1);
  return hands[0];
}
