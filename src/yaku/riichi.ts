import { Hand } from "../hand";
import { RiichiCall, Yaku, YakuConfig, YakuId } from "./yaku";

export class Riichi extends Yaku {
  public readonly id = YakuId.Riichi;
  public readonly romaji = "Riichi";
  public readonly english = "Riichi";
  public readonly japanese = "立直";
  public readonly yakuman = false;

  public check(hand: Hand, config: YakuConfig): number {
    return hand.isClosed() && config.riichi === RiichiCall.Riichi ? 1 : 0;
  }
}
