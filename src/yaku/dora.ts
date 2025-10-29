import { Hand } from "../hand";
import { RiichiCall, Yaku, YakuConfig, YakuId } from "./yaku";

export class Dora extends Yaku {
  public readonly id = YakuId.Dora;
  public readonly romaji = "Dora";
  public readonly english = "Dora";
  public readonly japanese = "ドラ";
  public readonly yakuman = false;

  public check(hand: Hand, config: YakuConfig): number {
    let han = 0;
    for (const dora of config.dora) {
      han += hand.tiles().filter((tile) => dora.dora().id === tile.id).length;
    }
    return han;
  }
}

export class Uradora extends Yaku {
  public readonly id = YakuId.Uradora;
  public readonly romaji = "Uradora";
  public readonly english = "Uradora";
  public readonly japanese = "裏ドラ";
  public readonly yakuman = false;

  public check(hand: Hand, config: YakuConfig): number {
    if (config.riichi === RiichiCall.None) {
      return 0;
    }

    let han = 0;
    for (const dora of config.uradora) {
      han += hand.tiles().filter((tile) => dora.dora().id === tile.id).length;
    }
    return han;
  }
}

export class Akadora extends Yaku {
  public readonly id = YakuId.Akadora;
  public readonly romaji = "Akadora";
  public readonly english = "Red Dora";
  public readonly japanese = "赤ドラ";
  public readonly yakuman = false;

  public check(_: Hand, config: YakuConfig): number {
    return config.akadora;
  }
}
