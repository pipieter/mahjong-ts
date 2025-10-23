import { Hand } from "./hand";
import { Chiitoitsu } from "./yaku/chiitoitsu";
import { DoubleRiichi } from "./yaku/doubleriichi";
import { Haitei } from "./yaku/haitei";
import { Honiisou } from "./yaku/honiisou";
import { Houtei } from "./yaku/houtei";
import { Iipeikou } from "./yaku/iipeikou";
import { Ippatsu } from "./yaku/ippatsu";
import { Riichi } from "./yaku/riichi";
import { Ryanpeikou } from "./yaku/ryanpeikou";
import { Tanyao } from "./yaku/tanyao";
import { Tsumo } from "./yaku/tsumo";
import { Yaku, YakuConfig, YakuId } from "./yaku/yaku";

export interface Score {
  yakus: YakuId[];
  han: number;
}

export class Scorer {
  public readonly yakus: Yaku[];

  constructor() {
    this.yakus = [
      new Tanyao(),
      new Tsumo(),
      new Riichi(),
      new Haitei(),
      new Houtei(),
      new DoubleRiichi(),
      new Honiisou(),
      new Ippatsu(),
      new Ryanpeikou(),
      new Chiitoitsu(),
      new Iipeikou(),
    ];
  }

  public score(hand: Hand, config: YakuConfig): Score {
    const score: Score = {
      yakus: [],
      han: 0,
    };

    for (const yaku of this.yakus) {
      const han = yaku.check(hand, config);
      if (han > 0) {
        score.yakus.push(yaku.id);
        score.han += han;
      }
    }

    return score;
  }
}
