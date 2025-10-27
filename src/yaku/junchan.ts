import { Hand, Meld } from "../hand";
import { Terminals } from "../tile";
import { Chinroutou } from "./chinroutou";
import { Yaku, YakuConfig, YakuId } from "./yaku";

export class Junchan extends Yaku {
  public readonly id = YakuId.Junchan;
  public readonly romaji = "Junchan";
  public readonly english = "Terminal in each meld";
  public readonly japanese = "純全帯么九";
  public readonly yakuman = false;

  public check(hand: Hand, config: YakuConfig): number {
    // Junchan is incompatible with chinroutou
    const chinroutou = new Chinroutou();
    if (chinroutou.check(hand, config) > 0) {
      return 0;
    }

    const terminalIds = Terminals.map((tile) => tile.id);
    const meldHasTerminal = (meld: Meld) => meld.tiles.some((tile) => terminalIds.includes(tile.id));

    if (hand.melds.every(meldHasTerminal)) {
      return hand.isOpen() ? 2 : 3;
    }
    return 0;
  }
}
