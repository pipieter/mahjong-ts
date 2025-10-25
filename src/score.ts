import { Hand } from "./hand";
import { Chankan } from "./yaku/chankan";
import { Chiitoitsu } from "./yaku/chiitoitsu";
import { Chiniisou } from "./yaku/chiniisou";
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
      new Chiniisou(),
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

  public fu(hand: Hand, config: YakuConfig): number {
    /*
    const pinfu = new Pinfu().check(hand, config) > 0;
    const chiitoitsu = new Chiitoitsu().check(hand, config) > 0;

    // Special case: chiitoitsu always has 25 fu
    if (chiitoitsu) {
      return 25;
    }

    // Special case: pinfu is always worth 20 fu (on tsumo) or 30 fu (on ron)
    if (pinfu) {
      if (config.tsumo) {
        return 20;
      } else {
        return 30;
      }
    }

    let fu = 20;
    const terminalHonorIds = [...Honors, ...Terminals].map((tile) => tile.id);

    for (const meld of this.melds) {
      let meldFu = 0;
      if (meld.isPon()) {
        meldFu = 4;
      } else if (meld.isKan()) {
        meldFu = 16;
      }

      if (terminalHonorIds.includes(meld.tiles[0].id)) {
        meldFu *= 2;
      }
      if (meld.open) {
        meldFu /= 2;
      }

      fu += meldFu;
    }

    if (waits.length > 1) {
      fu += 2;
    }

    // Important, if the hand is open and the fu is 20, a +2 is added to ensure it rounds to 30 fu
    if (fu === 20 && this.isOpen()) {
      fu += 2;
    }

    // Round up to the nearest 10
    return Math.ceil(fu / 10) * 10;
    */
    return 0;
  }
}
