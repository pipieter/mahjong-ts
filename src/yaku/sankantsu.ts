import { Hand } from "../hand";
import { Yaku, YakuConfig, YakuId } from "./yaku";

export class Sankantsu extends Yaku {
  public readonly id = YakuId.Sankantsu;
  public readonly romaji = "Sankantsu";
  public readonly english = "Three Kans";
  public readonly japanese = "三槓子";
  public readonly yakuman = false;

  public check(hand: Hand, _: YakuConfig): number {
    const kans = hand.melds.filter((meld) => meld.isKan());
    return kans.length === 3 ? 2 : 0;
  }
}
