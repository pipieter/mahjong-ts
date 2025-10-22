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
    return `${this.number()}${this.suit()}`;
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
  Ton: new Tile(27), // East wind
  Nan: new Tile(28), // South wind
  Shaa: new Tile(29), // West wind
  Pei: new Tile(30), // North wind
  Haku: new Tile(31), // White dragon
  Hatsu: new Tile(32), // Green dragon
  Chun: new Tile(33), // Red dragon
};

export const Terminals = [Tiles.Man1, Tiles.Man9, Tiles.Pin1, Tiles.Pin9, Tiles.Sou1, Tiles.Sou9];
export const Honors = [Tiles.Ton, Tiles.Nan, Tiles.Shaa, Tiles.Pei, Tiles.Haku, Tiles.Hatsu, Tiles.Chun];
