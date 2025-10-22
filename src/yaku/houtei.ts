import { Hand } from "../hand";
import { Yaku, YakuConfig, YakuId } from "./yaku";

export class Houtei extends Yaku {
  public readonly id = YakuId.Houtei;
  public readonly romaji = "Houtei raoyui";
  public readonly english = "Under the River";
  public readonly japanese = "河底撈魚";
  public readonly han = 1;
  public readonly yakuman = false;

  public check(_: Hand, config: YakuConfig): boolean {
    return config.wallCount === 0 && !config.tsumo;
  }
}
