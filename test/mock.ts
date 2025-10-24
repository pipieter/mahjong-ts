import { expect } from "@jest/globals";
import { Hand, Meld } from "../src/hand";
import { Tile } from "../src/tile";
import { RiichiCall, Wind, YakuConfig } from "../src/yaku/yaku";

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
    seat: Wind.East,
    round: Wind.East,
    turn: 10,
  };
}

export function verifyUnique(tiles: Tile[], melds: Meld[] = []): Hand {
  const hands = Hand.find(tiles, melds);
  expect(hands.length).toEqual(1);
  return hands[0];
}
