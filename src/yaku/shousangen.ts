import { Hand } from "../hand";
import { Tiles } from "../tile";
import { Yaku, YakuConfig, YakuId } from "./yaku";

export class Shousangen extends Yaku {
  public readonly id = YakuId.Shousangen;
  public readonly romaji = "Shousangen";
  public readonly english = "Small Three Dragons";
  public readonly japanese = "小三元";
  public readonly yakuman = false;

  public check(hand: Hand, _: YakuConfig): number {
    const dragons = [Tiles.Haku.id, Tiles.Hatsu.id, Tiles.Chun.id];
    const triplets = new Set();
    const pairs = new Set();

    for (const meld of hand.melds) {
      if (meld.tiles.length === 0) continue;
      if (!dragons.includes(meld.tiles[0].id)) continue;

      if (meld.isPair()) pairs.add(meld.tiles[0].id);
      if (meld.isPon() || meld.isKan()) triplets.add(meld.tiles[0].id);
    }

    return triplets.size === 2 && pairs.size === 1 ? 2 : 0;
  }
}
