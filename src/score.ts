import { Hand } from "./hand";
import { Tile } from "./tile";
import { Haitei } from "./yaku/haitei";
import { Riichi } from "./yaku/riichi";
import { Tanyao } from "./yaku/tanyao";
import { Tsumo } from "./yaku/tsumo";
import { Yaku, YakuId } from "./yaku/yaku";

export interface Score {
  yakus: YakuId[];
  han: number;
}

export interface ScoreConfig {
  riichi: boolean;
  tsumo: boolean;
  dealer: boolean;
  dora: Tile[];
  uradora: Tile[];
  akadora: number;
  wallCount: number;
}

export class Scorer {
  public readonly config: ScoreConfig;
  public readonly yakus: Yaku[];

  constructor(config: Partial<ScoreConfig>) {
    this.config = {
      riichi: config.riichi ?? false,
      tsumo: config.tsumo ?? false,
      dealer: config.dealer ?? false,
      dora: config.dora ?? [],
      uradora: config.uradora ?? [],
      akadora: config.akadora ?? 0,
      wallCount: config.wallCount ?? 0,
    };

    this.yakus = [new Tanyao(), new Tsumo(), new Riichi(), new Haitei()];
  }

  public score(hand: Hand): Score {
    const score: Score = {
      yakus: [],
      han: 0,
    };

    for (const yaku of this.yakus) {
      if (yaku.check(hand, this.config)) {
        score.yakus.push(yaku.id);
        score.han += yaku.han;
      }
    }

    return score;
  }
}
