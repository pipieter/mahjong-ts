import { Tile } from "./tile";

export interface ScoreConfig {
  riichi: boolean;
  tsumo: boolean;
  dealer: boolean;
  dora: Tile[];
  uradora: Tile[];
  akadora: number;
}

export class Scorer {}
