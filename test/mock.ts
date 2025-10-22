import { ScoreConfig } from "../src/score";

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
