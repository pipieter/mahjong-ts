/**
 * For the ids of each tile, see TileId.
 */
export class Tile {
  public readonly id: number;

  constructor(id: number) {
    this.id = id;
  }

  public suit(): Suit {
    if (0 <= this.id && this.id <= 8) return Suit.Manzu;
    if (9 <= this.id && this.id <= 17) return Suit.Pinzu;
    if (18 <= this.id && this.id <= 26) return Suit.Souzu;
    return Suit.Jihai;
  }

  public number(): number {
    return (this.id % 9) + 1;
  }

  public toString(): string {
    return `${this.suit()}${this.number()}`;
  }

  /**
   * The tile of which this tile is the dora indicator to. For example, if this tile were sou four, this dora
   * of that tile would be sou five.
   */
  public dora(): Tile {
    const dora: { [key: number]: Tile } = {};
    dora[Tiles.Man1.id] = Tiles.Man2;
    dora[Tiles.Man2.id] = Tiles.Man3;
    dora[Tiles.Man3.id] = Tiles.Man4;
    dora[Tiles.Man4.id] = Tiles.Man5;
    dora[Tiles.Man5.id] = Tiles.Man6;
    dora[Tiles.Man6.id] = Tiles.Man7;
    dora[Tiles.Man7.id] = Tiles.Man8;
    dora[Tiles.Man8.id] = Tiles.Man9;
    dora[Tiles.Man9.id] = Tiles.Man1;
    dora[Tiles.Pin1.id] = Tiles.Pin2;
    dora[Tiles.Pin2.id] = Tiles.Pin3;
    dora[Tiles.Pin3.id] = Tiles.Pin4;
    dora[Tiles.Pin4.id] = Tiles.Pin5;
    dora[Tiles.Pin5.id] = Tiles.Pin6;
    dora[Tiles.Pin6.id] = Tiles.Pin7;
    dora[Tiles.Pin7.id] = Tiles.Pin8;
    dora[Tiles.Pin8.id] = Tiles.Pin9;
    dora[Tiles.Pin9.id] = Tiles.Pin1;
    dora[Tiles.Sou1.id] = Tiles.Sou2;
    dora[Tiles.Sou2.id] = Tiles.Sou3;
    dora[Tiles.Sou3.id] = Tiles.Sou4;
    dora[Tiles.Sou4.id] = Tiles.Sou5;
    dora[Tiles.Sou5.id] = Tiles.Sou6;
    dora[Tiles.Sou6.id] = Tiles.Sou7;
    dora[Tiles.Sou7.id] = Tiles.Sou8;
    dora[Tiles.Sou8.id] = Tiles.Sou9;
    dora[Tiles.Sou9.id] = Tiles.Sou1;
    dora[Tiles.Ton.id] = Tiles.Nan;
    dora[Tiles.Nan.id] = Tiles.Shaa;
    dora[Tiles.Shaa.id] = Tiles.Pei;
    dora[Tiles.Pei.id] = Tiles.Ton;
    dora[Tiles.Haku.id] = Tiles.Hatsu;
    dora[Tiles.Hatsu.id] = Tiles.Chun;
    dora[Tiles.Chun.id] = Tiles.Haku;

    return dora[this.id];
  }
}

export enum Suit {
  Manzu = "m",
  Pinzu = "p",
  Souzu = "s",
  Jihai = "j",
}

/**
 * Enum to make testing and debugging easier.
 */
export const Tiles = {
  Man1: new Tile(0),
  Man2: new Tile(1),
  Man3: new Tile(2),
  Man4: new Tile(3),
  Man5: new Tile(4),
  Man6: new Tile(5),
  Man7: new Tile(6),
  Man8: new Tile(7),
  Man9: new Tile(8),
  Pin1: new Tile(9),
  Pin2: new Tile(10),
  Pin3: new Tile(11),
  Pin4: new Tile(12),
  Pin5: new Tile(13),
  Pin6: new Tile(14),
  Pin7: new Tile(15),
  Pin8: new Tile(16),
  Pin9: new Tile(17),
  Sou1: new Tile(18),
  Sou2: new Tile(19),
  Sou3: new Tile(20),
  Sou4: new Tile(21),
  Sou5: new Tile(22),
  Sou6: new Tile(23),
  Sou7: new Tile(24),
  Sou8: new Tile(25),
  Sou9: new Tile(26),
  /** East wind */
  Ton: new Tile(27),
  /**  South wind */
  Nan: new Tile(28),
  /**  West wind */
  Shaa: new Tile(29),
  /**  North wind */
  Pei: new Tile(30),
  /**  White dragon */
  Haku: new Tile(31),
  /**  Green dragon */
  Hatsu: new Tile(32),
  /**  Red dragon */
  Chun: new Tile(33),
};

export const Terminals = [Tiles.Man1, Tiles.Man9, Tiles.Pin1, Tiles.Pin9, Tiles.Sou1, Tiles.Sou9];
export const Honors = [Tiles.Ton, Tiles.Nan, Tiles.Shaa, Tiles.Pei, Tiles.Haku, Tiles.Hatsu, Tiles.Chun];

export enum Wind {
  /** East wind */
  Ton,
  /** South wind */
  Nan,
  /** West wind */
  Shaa,
  /** North wind */
  Pei,
}

export function getWindTile(wind: Wind): Tile {
  const map = {};
  map[Wind.Ton] = Tiles.Ton;
  map[Wind.Nan] = Tiles.Nan;
  map[Wind.Shaa] = Tiles.Shaa;
  map[Wind.Pei] = Tiles.Pei;
  return map[wind];
}
