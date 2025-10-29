import { Suit } from "..";
import { Hand, Meld } from "../hand";
import { Yaku, YakuConfig, YakuId } from "./yaku";

export class SanshokuDoujun extends Yaku {
  public readonly id = YakuId.SanshokuDoujun;
  public readonly romaji = "Sanshoku Doujun";
  public readonly english = "Three Colored Sequences";
  public readonly japanese = "三色同順";
  public readonly yakuman = false;

  private simplifyMeldNumbers(meld: Meld): number {
    const tiles = [...meld.tiles];
    tiles.sort();
    let simplified = 0;
    for (const tile of tiles) {
      simplified = simplified * 10 + tile.number();
    }
    return simplified;
  }

  public check(hand: Hand, _: YakuConfig): number {
    const chiis = hand.melds.filter((meld) => meld.isChii());

    const sous = chiis.filter((chii) => chii.tiles[0].suit() === Suit.Souzu).map(this.simplifyMeldNumbers);
    const mans = chiis.filter((chii) => chii.tiles[0].suit() === Suit.Manzu).map(this.simplifyMeldNumbers);
    const pins = chiis.filter((chii) => chii.tiles[0].suit() === Suit.Pinzu).map(this.simplifyMeldNumbers);

    for (const sou of sous) {
      for (const man of mans) {
        for (const pin of pins) {
          if (sou === man && sou === pin) {
            return hand.isOpen() ? 1 : 2;
          }
        }
      }
    }

    return 0;
  }
}
