import { Hand, Meld } from "../hand";
import { Suit } from "../tile";
import { Yaku, YakuConfig, YakuId } from "./yaku";

/**
 * Checks if the tiles form a 123, 456, and 789 straight. Does not check for suit.
 * @param melds The melds to check.
 * @returns True if the melds form a straight.
 */
function isStraight(melds: Meld[]): boolean {
  if (melds.length < 3) return false;

  let c123 = false;
  let c456 = false;
  let c789 = false;

  for (const meld of melds) {
    if (!meld.isChii()) {
      continue;
    }
    const nums = meld.tiles.map((tile) => tile.number());
    if (nums.includes(1) && nums.includes(2) && nums.includes(3)) c123 = true;
    if (nums.includes(4) && nums.includes(5) && nums.includes(6)) c456 = true;
    if (nums.includes(7) && nums.includes(8) && nums.includes(9)) c789 = true;
  }

  return c123 && c456 && c789;
}

export class Ittsuu extends Yaku {
  public readonly id = YakuId.Ittsuu;
  public readonly romaji = "Ittsuu";
  public readonly english = "Pure Straight";
  public readonly japanese = "一気通貫";
  public readonly yakuman = false;

  public check(hand: Hand, _: YakuConfig): number {
    const chiis = hand.melds.filter((meld) => meld.isChii());

    const man = chiis.filter((chii) => chii.tiles[0].suit() === Suit.Manzu);
    const pin = chiis.filter((chii) => chii.tiles[0].suit() === Suit.Pinzu);
    const sou = chiis.filter((chii) => chii.tiles[0].suit() === Suit.Souzu);

    const ittsuu = isStraight(man) || isStraight(pin) || isStraight(sou);
    if (!ittsuu) {
      return 0;
    }

    return hand.isClosed() ? 2 : 1;
  }
}
