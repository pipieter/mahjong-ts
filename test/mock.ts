import { expect } from "@jest/globals";
import { Hand, Meld } from "../src/hand";
import { Tile, Tiles, Wind } from "../src/tile";
import { RiichiCall, YakuConfig } from "../src/yaku/yaku";

export function mockConfig(): YakuConfig {
  return {
    riichi: RiichiCall.None,
    tsumo: false,
    ippatsu: false,
    wallCount: 10,
    dealer: false,
    dora: [],
    uradora: [],
    akadora: 0,
    seat: Wind.Ton,
    round: Wind.Ton,
    turn: 10,
    chankan: false,
    rinshan: false,
    agari: Tiles.Sou1 // Should be irrelevant, except for the pinfu tests
  };
}

export function verifyUnique(tiles: Tile[], melds: Meld[] = []): Hand {
  const hands = Hand.find(tiles, melds);
  expect(hands.length).toEqual(1);
  return hands[0];
}
