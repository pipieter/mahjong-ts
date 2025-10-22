import { Honors, Suit, Terminals, Tile } from "./tile";
import { orderedPermutationsOfLength } from "./util";

/**
 * Remove all tiles in an array from an array. This removes the first occurrence of each element
 * in the array and ignores elements that are not in the array.
 * @param array The original array containing the elements.
 * @param remove The elements to remove.
 * @returns A copy of the original array with the elements removed.
 */
function removeFromArray(array: readonly Tile[], toRemove: readonly Tile[]): Tile[] {
  const copy = [...array]; // Create a copy

  for (const element of toRemove) {
    const index = copy.findIndex((tile) => tile.id === element.id);
    if (index > -1) {
      copy.splice(index, 1);
    }
  }

  return copy;
}

export class Meld {
  public readonly tiles: Tile[];
  public readonly open: boolean;

  constructor(tiles: Tile[], open: boolean) {
    this.tiles = tiles;
    this.open = open;
  }

  public isTriplet(): boolean {
    return this.isChii() || this.isPon();
  }

  public isChii(): boolean {
    if (this.tiles.length !== 3) return false;

    // Check if tiles are the same suit and aren't honors
    const suits = this.tiles.map((tile) => tile.suit());
    if (suits.some((suit) => suit !== suits[0]) || suits.includes(Suit.Jihai)) return false;

    // Check if tiles are consecutive
    const tiles = [...this.tiles]; // Create a copy
    tiles.sort();
    for (let i = 0; i < tiles.length - 1; i++) {
      if (tiles[i].number() + 1 !== tiles[i + 1].number()) return false;
    }
    return true;
  }

  public isPon(): boolean {
    if (this.tiles.length !== 3) return false;
    return this.tiles.every((tile) => tile.id === this.tiles[0].id);
  }

  public isKan(): boolean {
    if (this.tiles.length !== 4) return false;
    return this.tiles.every((tile) => tile.id === this.tiles[0].id);
  }

  public isPair(): boolean {
    if (this.tiles.length !== 2) return false;
    return this.tiles.every((tile) => tile.id === this.tiles[0].id);
  }

  public isKokushiMusou(): boolean {
    if (this.tiles.length !== 14) return false;

    const tiles = new Set(this.tiles);
    const required = [...Terminals, ...Honors];

    if (tiles.size !== required.length) {
      return false;
    }

    for (const tile of required) {
      if (!tiles.has(tile)) return false;
    }
    return true;
  }

  public toString(): string {
    const tiles = [...this.tiles];
    tiles.sort((a, b) => a.id - b.id);

    const open = this.open ? "o" : "c";
    const ids = tiles.map((tile) => tile.toString());

    return `${open}${ids.join("")}`;
  }
}

/**
 * Completed hand consisting of fourteen tiles, or more including kans.
 */
export class Hand {
  public readonly melds: Meld[];

  constructor(melds: Meld[]) {
    this.melds = melds;
  }

  public toString(): string {
    const melds = this.melds.map((meld) => meld.toString());
    melds.sort();
    return melds.join("+");
  }

  public static find(tiles: Tile[], melds: Meld[] = []): Hand[] {
    const regular = Hand.findRegular(tiles, melds);
    const chiitoi = Hand.findChiitoi(tiles, melds);
    const kokushi = Hand.findKokushi(tiles, melds);

    const hands = [...regular, ...chiitoi, ...kokushi];

    // TODO optimize this, see if duplicate hands can be filtered beforehand
    const unique: Hand[] = [];
    const found: Set<string> = new Set();

    for (const hand of hands) {
      const id = hand.toString();
      if (!found.has(id)) {
        unique.push(hand);
        found.add(id);
      }
    }

    return unique;
  }

  private static findRegular(tiles: Tile[], melds: Meld[]): Hand[] {
    // TODO ensure regular hands have four melds and one pair

    if (tiles.length < 2) {
      return [];
    }

    if (tiles.length === 2) {
      const pair = new Meld(tiles, false);
      if (!pair.isPair()) return [];
      return [new Hand([...melds, pair])];
    }

    // At least three tiles remaining
    const hands = [];
    const permutations = orderedPermutationsOfLength(tiles, 3);
    for (const permutation of permutations) {
      const meld = new Meld(permutation, false);
      if (!meld.isTriplet()) continue;

      hands.push(...Hand.findRegular(removeFromArray(tiles, permutation), [...melds, meld]));
    }

    return hands;
  }

  private static findChiitoi(tiles: Tile[], melds: Meld[]): Hand[] {
    if (melds.length > 0) {
      return [];
    }

    const pairs = [];
    while (tiles.length > 0) {
      const next = tiles[0];
      const pair = [next, next];
      const count = tiles.filter((tile) => tile.id === next.id).length;
      if (count < 2) {
        return [];
      }
      tiles = removeFromArray(tiles, pair);
      pairs.push(new Meld(pair, true));
    }

    return [new Hand(pairs)];
  }

  private static findKokushi(tiles: Tile[], melds: Meld[]): Hand[] {
    if (melds.length > 0) return [];

    const hands = [];
    const meld = new Meld(tiles, false);
    if (meld.isKokushiMusou()) {
      hands.push(new Hand([meld]));
    }
    return hands;
  }

  public tiles(): Tile[] {
    return this.melds.flatMap((meld) => meld.tiles);
  }

  public isOpen(): boolean {
    return this.melds.some((meld) => meld.open);
  }

  public isClosed(): boolean {
    return !this.isOpen();
  }
}
