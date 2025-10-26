import { Hand } from "../hand";
import { Honors, Terminals } from "../tile";
import { Yaku, YakuConfig, YakuId } from "./yaku";

export class Honrouto extends Yaku {
  public readonly id = YakuId.Honrouto;
  public readonly romaji = "Honrouto";
  public readonly english = "All Terminals and Honors";
  public readonly japanese = "混老頭";
  public readonly yakuman = false;

  public check(hand: Hand, _: YakuConfig): number {
    const tiles = hand.tiles();
    const honorIds = Honors.map((tile) => tile.id);
    const terminalIds = Terminals.map((tile) => tile.id);
    const terminalHonorIds = [...honorIds, ...terminalIds];

    const containsHonors = tiles.some((tile) => honorIds.includes(tile.id));
    const containsTerminals = tiles.some((tile) => terminalIds.includes(tile.id));
    const allTerminalsOrHonors = tiles.every((tile) => terminalHonorIds.includes(tile.id));

    return containsHonors && containsTerminals && allTerminalsOrHonors ? 2 : 0;
  }
}
