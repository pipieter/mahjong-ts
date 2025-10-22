import { Hand } from "../hand";
import { Yaku, YakuConfig, YakuId } from "./yaku";

export class Haitei extends Yaku {
  public readonly id = YakuId.Haitei;
  public readonly romaji = "Haitei raoyue";
  public readonly english = "Under the Sea";
  public readonly japanese = "海底撈月";
  public readonly han = 1;
  public readonly yakuman = false;

  public check(_: Hand, config: YakuConfig): boolean {
    return config.wallCount === 0 && config.tsumo;
  }
}
