import { Hand } from "../hand";
import { Terminals } from "../tile";
import { Yaku, YakuConfig, YakuId } from "./yaku";

export class Chinroutou extends Yaku {
  public readonly id = YakuId.Chinroutou;
  public readonly romaji = "Chinroutou";
  public readonly english = "All terminals";
  public readonly japanese = "清老頭";
  public readonly yakuman = true;

  public check(hand: Hand, config: YakuConfig): number {
    const terminalIds = Terminals.map((tile) => tile.id);
    return hand.tiles().every((tile) => terminalIds.includes(tile.id)) ? 13 : 0;
  }
}
