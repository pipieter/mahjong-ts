import { Hand, Meld } from "../hand";
import { Tile, Tiles, Wind } from "../tile";
import { Yaku, YakuConfig, YakuId } from "./yaku";

function findTriplet(melds: Meld[], tile: Tile): boolean {
  for (const meld of melds) {
    if (meld.isPon() || meld.isKan()) {
      if (meld.tiles[0].id === tile.id) {
        return true;
      }
    }
  }

  return false;
}

export class EastSeat extends Yaku {
  public readonly id = YakuId.EastSeat;
  public readonly romaji = "Ton Jikaze";
  public readonly english = "East Seat";
  public readonly japanese = "自風東";
  public readonly yakuman = false;

  public check(hand: Hand, config: YakuConfig): number {
    return findTriplet(hand.melds, Tiles.Ton) && config.seat === Wind.Ton ? 1 : 0;
  }
}

export class SouthSeat extends Yaku {
  public readonly id = YakuId.SouthSeat;
  public readonly romaji = "Nan Jikaze";
  public readonly english = "South Seat";
  public readonly japanese = "自風南";
  public readonly yakuman = false;

  public check(hand: Hand, config: YakuConfig): number {
    return findTriplet(hand.melds, Tiles.Nan) && config.seat === Wind.Nan ? 1 : 0;
  }
}

export class WestSeat extends Yaku {
  public readonly id = YakuId.WestSeat;
  public readonly romaji = "Shaa Jikaze";
  public readonly english = "West Seat";
  public readonly japanese = "自風西";
  public readonly yakuman = false;

  public check(hand: Hand, config: YakuConfig): number {
    return findTriplet(hand.melds, Tiles.Shaa) && config.seat === Wind.Shaa ? 1 : 0;
  }
}

export class NorthSeat extends Yaku {
  public readonly id = YakuId.NorthSeat;
  public readonly romaji = "Pei Jikaze";
  public readonly english = "North Seat";
  public readonly japanese = "自風北";
  public readonly yakuman = false;

  public check(hand: Hand, config: YakuConfig): number {
    return findTriplet(hand.melds, Tiles.Pei) && config.seat === Wind.Pei ? 1 : 0;
  }
}

export class EastRound extends Yaku {
  public readonly id = YakuId.EastRound;
  public readonly romaji = "Ton Bakaze";
  public readonly english = "East Round";
  public readonly japanese = "場風東";
  public readonly yakuman = false;

  public check(hand: Hand, config: YakuConfig): number {
    return findTriplet(hand.melds, Tiles.Ton) && config.round === Wind.Ton ? 1 : 0;
  }
}

export class SouthRound extends Yaku {
  public readonly id = YakuId.SouthRound;
  public readonly romaji = "Nan Bakaze";
  public readonly english = "South Round";
  public readonly japanese = "場風南";
  public readonly yakuman = false;

  public check(hand: Hand, config: YakuConfig): number {
    return findTriplet(hand.melds, Tiles.Nan) && config.round === Wind.Nan ? 1 : 0;
  }
}

export class WestRound extends Yaku {
  public readonly id = YakuId.WestRound;
  public readonly romaji = "Shaa Bakaze";
  public readonly english = "West Round";
  public readonly japanese = "場風西";
  public readonly yakuman = false;

  public check(hand: Hand, config: YakuConfig): number {
    return findTriplet(hand.melds, Tiles.Shaa) && config.round === Wind.Shaa ? 1 : 0;
  }
}

export class NorthRound extends Yaku {
  public readonly id = YakuId.NorthRound;
  public readonly romaji = "Pei Bakaze";
  public readonly english = "North Round";
  public readonly japanese = "場風北";
  public readonly yakuman = false;

  public check(hand: Hand, config: YakuConfig): number {
    return findTriplet(hand.melds, Tiles.Pei) && config.round === Wind.Pei ? 1 : 0;
  }
}

export class HakuYakuhai extends Yaku {
  public readonly id = YakuId.HakuYakuhai;
  public readonly romaji = "Haku Yakuhai";
  public readonly english = "White Dragon";
  public readonly japanese = "役牌白";
  public readonly yakuman = false;

  public check(hand: Hand, _: YakuConfig): number {
    return findTriplet(hand.melds, Tiles.Haku) ? 1 : 0;
  }
}

export class HatsuYakuhai extends Yaku {
  public readonly id = YakuId.HatsuYakuhai;
  public readonly romaji = "Hatsu Yakuhai";
  public readonly english = "Green Dragon";
  public readonly japanese = "役牌發";
  public readonly yakuman = false;

  public check(hand: Hand, _: YakuConfig): number {
    return findTriplet(hand.melds, Tiles.Hatsu) ? 1 : 0;
  }
}

export class ChunYakuhai extends Yaku {
  public readonly id = YakuId.ChunYakuhai;
  public readonly romaji = "Chun Yakuhai";
  public readonly english = "Red Dragon";
  public readonly japanese = "役牌中";
  public readonly yakuman = false;

  public check(hand: Hand, _: YakuConfig): number {
    return findTriplet(hand.melds, Tiles.Chun) ? 1 : 0;
  }
}
