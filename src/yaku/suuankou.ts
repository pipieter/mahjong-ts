import { Hand } from "../hand";
import { Yaku, YakuConfig, YakuId } from "./yaku";

export class Suuankou extends Yaku {
  public readonly id = YakuId.Suuankou;
  public readonly romaji = "Suuankou";
  public readonly english = "Four Concealed Triplets";
  public readonly japanese = "四暗刻";
  public readonly yakuman = false;

  public check(hand: Hand, config: YakuConfig): number {
    const pair = hand.melds.filter((meld) => meld.isPair())[0];
    const triplets = hand.melds.filter((meld) => (meld.isPon() || meld.isKan()) && meld.isClosed());

    if (triplets.length !== 4) {
      return 0;
    }

    // Handle specific kokushi case
    if (!pair) {
      return 0;
    }

    // In case of ron, the hand must be won on the agari wait
    if (!config.tsumo && !pair.hasTile(config.agari)) {
      return 0;
    }

    return 13;
  }
}
