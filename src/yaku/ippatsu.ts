import { Hand } from "../hand";
import { RiichiCall, Yaku, YakuConfig, YakuId } from "./yaku";

export class Ippatsu extends Yaku {
  public readonly id = YakuId.Ippatsu;
  public readonly romaji = "Ippatsu";
  public readonly english = "One Shot";
  public readonly japanese = "一発";
  public readonly yakuman = false;

  public check(_: Hand, config: YakuConfig): number {
    return config.riichi !== RiichiCall.None && config.ippatsu ? 1 : 0;
  }
}
