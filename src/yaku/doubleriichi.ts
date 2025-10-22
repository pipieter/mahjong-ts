import { Hand } from "../hand";
import { RiichiCall, Yaku, YakuConfig, YakuId } from "./yaku";

export class DoubleRiichi extends Yaku {
  public readonly id = YakuId.DoubleRiichi;
  public readonly romaji = "Daburu riichi";
  public readonly english = "Double Riichi";
  public readonly japanese = "両立直";
  public readonly han = 2;
  public readonly yakuman = false;

  public check(hand: Hand, config: YakuConfig): boolean {
    return hand.isClosed() && config.riichi === RiichiCall.Double;
  }
}
