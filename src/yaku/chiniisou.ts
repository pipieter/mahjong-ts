import { Hand } from "../hand";
import { Suit } from "../tile";
import { Yaku, YakuConfig, YakuId } from "./yaku";

export class Chiniisou extends Yaku {
  public readonly id = YakuId.Chiniisou;
  public readonly romaji = "Chiniisou";
  public readonly english = "Full Flush";
  public readonly japanese = "清一色";
  public readonly yakuman = false;

  public check(hand: Hand, _: YakuConfig): number {
    const suits = new Set(hand.tiles().map((tile) => tile.suit()));
    const isChiniisou = suits.size === 1 && !suits.has(Suit.Jihai); // Chinissou requires a *numbered* suit

    if (!isChiniisou) {
      return 0;
    }

    return hand.isOpen() ? 5 : 6;
  }
}
