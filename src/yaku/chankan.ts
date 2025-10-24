import { Hand } from "../hand";
import { Yaku, YakuConfig, YakuId } from "./yaku";

export class Chankan extends Yaku {
  public readonly id = YakuId.Chankan;
  public readonly romaji = "Chankan";
  public readonly english = "Robbing a kan";
  public readonly japanese = "搶槓";
  public readonly yakuman = false;

  public check(_: Hand, config: YakuConfig): number {
    return config.chankan ? 1 : 0;
  }
}
