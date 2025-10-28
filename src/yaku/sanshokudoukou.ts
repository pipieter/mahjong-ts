import { Suit } from "..";
import { Hand } from "../hand";
import { Yaku, YakuConfig, YakuId } from "./yaku";

export class SanshokuDoukou extends Yaku {
  public readonly id = YakuId.SanshokuDoukou;
  public readonly romaji = "Sanshoku Doukou";
  public readonly english = "Three Colored Triplets";
  public readonly japanese = "三色同刻";
  public readonly yakuman = false;

  public check(hand: Hand, _: YakuConfig): number {
    const chiis = hand.melds.filter((meld) => meld.isPon() || meld.isKan());

    const sous = chiis.filter((chii) => chii.tiles[0].suit() === Suit.Souzu).map((meld) => meld.tiles[0].number());
    const mans = chiis.filter((chii) => chii.tiles[0].suit() === Suit.Manzu).map((meld) => meld.tiles[0].number());
    const pins = chiis.filter((chii) => chii.tiles[0].suit() === Suit.Pinzu).map((meld) => meld.tiles[0].number());

    for (const sou of sous) {
      for (const man of mans) {
        for (const pin of pins) {
          if (sou === man && sou === pin) {
            return 2;
          }
        }
      }
    }

    return 0;
  }
}
