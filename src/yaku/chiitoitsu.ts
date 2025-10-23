import { Hand } from "../hand";
import { Yaku, YakuConfig, YakuId } from "./yaku";

export class Chiitoitsu extends Yaku {
  public readonly id = YakuId.Chiitoitsu;
  public readonly romaji = "Chiitoitsu";
  public readonly english = "Seven Pairs";
  public readonly japanese = "七対子";
  public readonly yakuman = false;

  public check(hand: Hand, _: YakuConfig): number {
    if (hand.isOpen()) {
      return 0;
    }

    const pairs = hand.melds.filter((meld) => meld.isPair());
    if (pairs.length !== 7) {
      return 0;
    }

    // Seven pairs requires seven *unique* pairs.
    const pairIds = pairs.map((pair) => pair.toString());
    const pairSet = new Set(pairIds);

    return pairIds.length === pairSet.size ? 2 : 0;
  }
}
