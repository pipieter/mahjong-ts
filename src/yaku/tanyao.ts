import { Hand } from "../hand";
import { Honors, Terminals } from "../tile";
import { Yaku, YakuConfig, YakuId } from "./yaku";

export class Tanyao extends Yaku {
  public readonly id = YakuId.Tanyao;
  public readonly romaji = "Tanyao";
  public readonly english = "All Simples";
  public readonly japanese = "断幺九";
  public readonly yakuman = false;

  public check(hand: Hand, _: YakuConfig): number {
    const tiles = hand.tiles().map((tile) => tile.id);
    const invalid = [...Terminals, ...Honors].map((tile) => tile.id);

    return tiles.some((tile) => invalid.includes(tile)) ? 0 : 1;
  }
}
