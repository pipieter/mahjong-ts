import { Hand } from "../hand";
import { Wind } from "../tile";
import { Yaku, YakuConfig, YakuId } from "./yaku";

export class Tenhou extends Yaku {
  public readonly id = YakuId.Tenhou;
  public readonly romaji = "Tenhou";
  public readonly english = "Heavenly Hand";
  public readonly japanese = "天和";
  public readonly yakuman = true;

  public check(_: Hand, config: YakuConfig): number {
    return config.tsumo && config.turn === 1 && config.seat === Wind.Ton ? 13 : 0;
  }
}

export class Chiihou extends Yaku {
  public readonly id = YakuId.Chiihou;
  public readonly romaji = "Chiihou";
  public readonly english = "Earthly Hand";
  public readonly japanese = "地和";
  public readonly yakuman = true;

  public check(_: Hand, config: YakuConfig): number {
    return config.tsumo && config.turn === 1 && config.seat !== Wind.Ton ? 13 : 0;
  }
}
