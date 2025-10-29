import { Hand } from "../hand";
import { Suit } from "../tile";
import { Yaku, YakuConfig, YakuId } from "./yaku";

export class Honiisou extends Yaku {
  public readonly id = YakuId.Honiisou;
  public readonly romaji = "Honiisou";
  public readonly english = "Half Flush";
  public readonly japanese = "混一色";
  public readonly yakuman = false;

  public check(hand: Hand, _: YakuConfig): number {
    const suits = new Set(hand.tiles().map((tile) => tile.suit()));
    const isHoniisou = suits.size === 2 && suits.has(Suit.Jihai);

    if (!isHoniisou) {
      return 0;
    }

    return hand.isOpen() ? 2 : 3;
  }
}
