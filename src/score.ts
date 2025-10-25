import { Hand } from "./hand";
import { Chankan } from "./yaku/chankan";
import { Chiitoitsu } from "./yaku/chiitoitsu";
import { Daisangen } from "./yaku/daisangen";
import { DoubleRiichi } from "./yaku/doubleriichi";
import { Haitei } from "./yaku/haitei";
import { Honiisou } from "./yaku/honiisou";
import { Houtei } from "./yaku/houtei";
import { Iipeikou } from "./yaku/iipeikou";
import { Ippatsu } from "./yaku/ippatsu";
import { Riichi } from "./yaku/riichi";
import { Rinshan } from "./yaku/rinshan";
import { Ryanpeikou } from "./yaku/ryanpeikou";
import { Ryuuiisou } from "./yaku/ryuuiisou";
import { Shousangen } from "./yaku/shousangen";
import { Tanyao } from "./yaku/tanyao";
import { Chiihou, Tenhou } from "./yaku/tenhou";
import { Tsumo } from "./yaku/tsumo";
import { Yaku, YakuConfig, YakuId } from "./yaku/yaku";
import {
  ChunYakuhai,
  EastRound,
  EastSeat,
  HakuYakuhai,
  HatsuYakuhai,
  NorthRound,
  NorthSeat,
  SouthRound,
  SouthSeat,
  WestRound,
  WestSeat,
} from "./yaku/yakuhai";

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
      new Chiitoitsu(),
      new Ryuuiisou(),
      new Tenhou(),
      new Chiihou(),
      new Chankan(),
      new Rinshan(),
      new EastSeat(),
      new SouthSeat(),
      new WestSeat(),
      new NorthSeat(),
      new EastRound(),
      new SouthRound(),
      new WestRound(),
      new NorthRound(),
      new HakuYakuhai(),
      new HatsuYakuhai(),
      new ChunYakuhai(),
      new Daisangen(),
      new Shousangen(),
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
