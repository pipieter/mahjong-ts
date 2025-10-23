import { Hand } from "./hand";
import { Tile } from "./tile";
import { DoubleRiichi } from "./yaku/doubleriichi";
import { Haitei } from "./yaku/haitei";
import { Honiisou } from "./yaku/honiisou";
import { Houtei } from "./yaku/houtei";
import { Riichi } from "./yaku/riichi";
import { Tanyao } from "./yaku/tanyao";
import { Tsumo } from "./yaku/tsumo";
import { RiichiCall, Yaku, YakuId } from "./yaku/yaku";

export interface Score {
  yakus: YakuId[];
  han: number;
}

export interface ScoreConfig {
  riichi: RiichiCall;
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
      riichi: config.riichi ?? RiichiCall.None,
      tsumo: config.tsumo ?? false,
      dealer: config.dealer ?? false,
      dora: config.dora ?? [],
      uradora: config.uradora ?? [],
      akadora: config.akadora ?? 0,
      wallCount: config.wallCount ?? 0,
    };

    this.yakus = [
      new Tanyao(),
      new Tsumo(),
      new Riichi(),
      new Haitei(),
      new Houtei(),
      new DoubleRiichi(),
      new Honiisou(),
    ];
  }

  public score(hand: Hand): Score {
    const score: Score = {
      yakus: [],
      han: 0,
    };

    for (const yaku of this.yakus) {
      const han = yaku.check(hand, this.config);
      if (han > 0) {
        score.yakus.push(yaku.id);
        score.han += han;
      }
    }

    return score;
  }
}
