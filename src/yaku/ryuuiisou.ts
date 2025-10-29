import { Hand } from "../hand";
import { Tiles } from "../tile";
import { Yaku, YakuConfig, YakuId } from "./yaku";

export class Ryuuiisou extends Yaku {
  public readonly id = YakuId.Ryuuiisou;
  public readonly romaji = "Ryuuiisou";
  public readonly english = "All Green";
  public readonly japanese = "緑一色";
  public readonly yakuman = true;

  public check(hand: Hand, _: YakuConfig): number {
    const ids = hand.tiles().map((tile) => tile.id);
    const green = [Tiles.Sou2, Tiles.Sou3, Tiles.Sou4, Tiles.Sou6, Tiles.Sou8, Tiles.Hatsu].map((tile) => tile.id);

    return ids.every((id) => green.includes(id)) ? 13 : 0;
  }
}
