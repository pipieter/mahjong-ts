import { Hand } from "../hand";
import { Suit, Tile } from "../tile";
import { Yaku, YakuConfig, YakuId } from "./yaku";

function isHoniisou(tiles: Tile[]): boolean {
  const suits = new Set(tiles.map((tile) => tile.suit()));

  // Honiisou expects two suits, one of which is honors
  return suits.size === 2 && suits.has(Suit.Jihai);
}

abstract class Honiisou extends Yaku {
  public readonly id = YakuId.Honiisou;
  public readonly romaji = "Honiisou";
  public readonly english = "Half Flush";
  public readonly japanese = "混一色";
  public readonly yakuman = false;
}

export class OpenHoniisou extends Honiisou {
  public readonly han = 2;

  public check(hand: Hand, _: YakuConfig): boolean {
    return hand.isOpen() && isHoniisou(hand.tiles());
  }
}

export class ClosedHoniisou extends Honiisou {
  public readonly han = 3;

  public check(hand: Hand, _: YakuConfig): boolean {
    return hand.isClosed() && isHoniisou(hand.tiles());
  }
}
