import { Hand } from "../hand";
import { Yaku, YakuConfig, YakuId } from "./yaku";

export class Sanankou extends Yaku {
  public readonly id = YakuId.Sanankou;
  public readonly romaji = "Sanankou";
  public readonly english = "Three Concealed Triplets";
  public readonly japanese = "三暗刻";
  public readonly yakuman = false;

  public check(hand: Hand, config: YakuConfig): number {
    // This code is based on the Python mahjong implementation of sanankou
    // https://github.com/MahjongRepository/mahjong/blob/master/mahjong/hand_calculating/yaku_list/sanankou.py

    const chiis = hand.melds.filter((meld) => meld.isChii() && meld.hasTile(config.agari) && meld.isClosed());
    const pons = hand.melds.filter((meld) => meld.isPon() || meld.isKan());

    const closedPons = [];
    for (const meld of pons) {
      if (meld.isOpen()) {
        continue;
      }

      if (meld.hasTile(config.agari) && !config.tsumo && chiis.length === 0) {
        continue;
      }

      closedPons.push(meld);
    }

    return closedPons.length === 3 ? 2 : 0;
  }
}
