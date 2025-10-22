import { CompletedHand } from "../hand";
import { Yaku, YakuConfig, YakuId } from "./yaku";

export class Riichi extends Yaku {
  public readonly id = YakuId.Riichi;
  public readonly romaji = "Riichi";
  public readonly english = "Riichi";
  public readonly japanese = "立直";
  public readonly han = 1;
  public readonly yakuman = false;

  public check(hand: CompletedHand, config: YakuConfig): boolean {
    return hand.isClosed() && config.riichi;
  }
}
