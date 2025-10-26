import { Hand } from "../hand";
import { Yaku, YakuConfig, YakuId } from "./yaku";

export class Toitoi extends Yaku {
  public readonly id = YakuId.Toitoi;
  public readonly romaji = "Toitoi";
  public readonly english = "All Triplets";
  public readonly japanese = "対々";
  public readonly yakuman = false;

  public check(hand: Hand, _: YakuConfig): number {
    const triplets = hand.melds.filter((meld) => meld.isPon() || meld.isKan());
    return triplets.length === 4 ? 2 : 0;
  }
}
