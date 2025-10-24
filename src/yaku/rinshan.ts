import { Hand } from "../hand";
import { Yaku, YakuConfig, YakuId } from "./yaku";

export class Rinshan extends Yaku {
  public readonly id = YakuId.Rinshan;
  public readonly romaji = "Rinshan kaihou";
  public readonly english = "Dead wall draw";
  public readonly japanese = "嶺上開花";
  public readonly yakuman = false;

  public check(_: Hand, config: YakuConfig): number {
    return config.rinshan ? 1 : 0;
  }
}
