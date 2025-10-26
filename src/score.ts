import { Honrouto, Pinfu, Sankantsu, Toitoi } from ".";
import { Hand } from "./hand";
import { getWindTile, Honors, Terminals, Tiles } from "./tile";
import { findMeldsAndPair, removeFromArray } from "./util";
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
  fu: number;
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
      new Sankantsu(),
      new Toitoi(),
      new Honrouto(),
    ];
  }

  public score(hand: Hand, config: YakuConfig): Score {
    const score: Score = {
      yakus: [],
      han: 0,
      fu: this.fu(hand, config),
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
    const pinfu = new Pinfu().check(hand, config) > 0;
    const chiitoitsu = new Chiitoitsu().check(hand, config) > 0;

    // Special case: chiitoitsu always has 25 fu
    if (chiitoitsu) {
      return 25;
    }

    // "Special" case: pinfu is always worth 20 fu (on tsumo) or 30 fu (on ron)
    if (pinfu) {
      if (config.tsumo) {
        return 20;
      } else {
        return 30;
      }
    }

    let fu = 20;
    const terminalHonorIds = [...Honors, ...Terminals].map((tile) => tile.id);

    for (const meld of hand.melds) {
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

    // Calculate the waits. More specifically, if there was exactly one wait, increase the fu by 2.
    const waits = [];
    const meldsInHand = hand.melds.filter((meld) => !meld.open && !meld.isKan());
    const tilesInHand = meldsInHand.flatMap((meld) => meld.tiles);
    const tenpaiInHand = removeFromArray(tilesInHand, [config.agari]);

    for (const tile of Object.values(Tiles)) {
      // Check if the tile could have completed any set of melds and a pair
      if (findMeldsAndPair([...tenpaiInHand, tile])) {
        waits.push(tile);
      }
    }

    if (waits.length <= 1) {
      fu += 2;
    }

    // If hand had a yakuhai pair, or the pair was a seat or round wind, increase fu by 2
    const yakuhai = new Set([
      Tiles.Haku.id,
      Tiles.Hatsu.id,
      Tiles.Chun.id,
      getWindTile(config.seat).id,
      getWindTile(config.round).id,
    ]);
    const pair = hand.melds.filter((meld) => meld.isPair())[0];
    if (pair) {
      if (yakuhai.has(pair.tiles[0].id)) {
        fu += 2;
      }
    }

    // If hand won by tsumo, add 2 fu
    if (config.tsumo) {
      fu += 2;
    }
    // Otherwise, if it won by ron, increase it by 10
    else {
      fu += 10;
    }

    // If hand is open and it has no other fu (i.e. is at 20 fu), it is set to 30 fu
    if (fu === 20 && hand.isOpen()) {
      fu = 30;
    }

    // Round up to the nearest 10
    return Math.ceil(fu / 10) * 10;
  }
}
