import { Hand } from "../hand";
import { Yaku, YakuConfig, YakuId } from "./yaku";

export class Iipeikou extends Yaku {
  public readonly id = YakuId.Iipeikou;
  public readonly romaji = "Iipeikou";
  public readonly english = "Double Sequences";
  public readonly japanese = "一盃口";
  public readonly yakuman = false;

  public check(hand: Hand, _: YakuConfig): number {
    // Iipeikou is closed only
    if (hand.isOpen()) {
      return 0;
    }

    const chiis = hand.melds.filter((meld) => meld.isChii());
    const chiiIds = chiis.map((chii) => chii.toString());

    const counts: { [key: string]: number } = {};

    for (const chii of chiiIds) {
      counts[chii] = (counts[chii] || 0) + 1;
    }

    let doubleSequenceCount = 0;
    for (const chii of Object.keys(counts)) {
      if (counts[chii] >= 2) {
        doubleSequenceCount++;
      }
    }

    // The double sequence counts needs to be exactly one. If it is two, ryanpeikou should be rewarded instead.
    return doubleSequenceCount === 1 ? 1 : 0;
  }
}
