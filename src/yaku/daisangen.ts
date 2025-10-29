import { Hand } from "../hand";
import { Tiles } from "../tile";
import { Yaku, YakuConfig, YakuId } from "./yaku";

export class Daisangen extends Yaku {
  public readonly id = YakuId.Daisangen;
  public readonly romaji = "Daisangen";
  public readonly english = "Big Three Dragons";
  public readonly japanese = "大三元";
  public readonly yakuman = true;

  public check(hand: Hand, _: YakuConfig): number {
    let haku = false;
    let hatsu = false;
    let chun = false;

    for (const meld of hand.melds) {
      if (meld.isPon() || meld.isKan()) {
        if (meld.tiles[0].id === Tiles.Haku.id) haku = true;
        if (meld.tiles[0].id === Tiles.Hatsu.id) hatsu = true;
        if (meld.tiles[0].id === Tiles.Chun.id) chun = true;
      }
    }

    return haku && hatsu && chun ? 13 : 0;
  }
}
