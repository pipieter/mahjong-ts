import { Hand } from "../hand";
import { Yaku, YakuConfig, YakuId } from "./yaku";

export class Tsumo extends Yaku {
  public readonly id = YakuId.Tsumo;
  public readonly romaji = "Tsumo";
  public readonly english = "Tsumo";
  public readonly japanese = "ツモ";
  public readonly han = 1;
  public readonly yakuman = false;

  public check(hand: Hand, config: YakuConfig): boolean {
    return hand.isClosed() && config.tsumo;
  }
}
