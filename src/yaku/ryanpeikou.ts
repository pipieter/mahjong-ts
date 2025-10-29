import { Hand } from "../hand";
import { Yaku, YakuConfig, YakuId } from "./yaku";

export class Ryanpeikou extends Yaku {
  public readonly id = YakuId.Ryanpeikou;
  public readonly romaji = "Ryanpeikou";
  public readonly english = "Double Twin Sequences";
  public readonly japanese = "二盃口";
  public readonly yakuman = false;

  public check(hand: Hand, _: YakuConfig): number {
    // Ryanpeikou is closed only
    if (hand.isOpen()) {
      return 0;
    }

    const pairs = hand.melds.filter((meld) => meld.isPair());
    const chiis = hand.melds.filter((meld) => meld.isChii());
    const chiiIds = chiis.map((chii) => chii.toString());

    if (pairs.length !== 1 || chiis.length !== 4) {
      return 0;
    }

    if (new Set(chiiIds).size !== 2) {
      return 0;
    }

    for (const chii of chiiIds) {
      const matching = chiiIds.filter((c) => c === chii);
      if (matching.length !== 2) {
        return 0;
      }
    }

    return 3;
  }
}
