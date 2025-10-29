import { Hand, Meld } from "../hand";
import { getWindTile, Terminals, Tile, Tiles } from "../tile";
import { findMeldsAndPair, orderedPermutationsOfLength, removeFromArray } from "../util";
import { Chiitoitsu } from "./chiitoitsu";
import { Yaku, YakuConfig, YakuId } from "./yaku";

/**
 * Check if a ryanmen wait could be found within a set of tiles that can wait on a specific tile.
 * @param tiles
 * @param wait
 */
function findRyanmenWithWait(tiles: Tile[], wait: Tile): boolean {
  if (tiles.length < 2) {
    return false;
  }

  const terminalIds = Terminals.map((terminal) => terminal.id);
  const permutations = orderedPermutationsOfLength(tiles, 2);
  for (const permutation of permutations) {
    const meld = new Meld([...permutation, wait], false);
    // Ryanmen plus wait should return in a valid chii
    if (!meld.isChii()) {
      continue;
    }
    // Check if it is a ryanmen wait. This means that the two tiles are consecutive,
    // and that neither are terminals.

    // Check if hand has consecutive numbers
    if (![1, -1].includes(permutation[0].number() - permutation[1].number())) {
      continue;
    }

    // Check if either tile is a terminal
    if (terminalIds.includes(permutation[0].id) || terminalIds.includes(permutation[1].id)) {
      continue;
    }

    // Lastly, check if a valid set of melds and a pair can be found with the remaining tiles
    const remaining = removeFromArray(tiles, permutation);
    if (findMeldsAndPair(remaining).length > 0) {
      return true;
    }
  }

  return false;
}

export class Pinfu extends Yaku {
  public readonly id = YakuId.Pinfu;
  public readonly romaji = "Pinfu";
  public readonly english = "Minimum fu";
  public readonly japanese = "平和";
  public readonly yakuman = false;

  public check(hand: Hand, config: YakuConfig): number {
    // https://riichi.wiki/Pinfu#Definition

    // Hand must be closed
    if (hand.isOpen()) {
      return 0;
    }

    // A chiitoitsu hand can never be pinfu
    const chiitoitsu = new Chiitoitsu();
    if (chiitoitsu.check(hand, config)) {
      return 0;
    }

    const pons = hand.melds.filter((meld) => meld.isPon());
    const kans = hand.melds.filter((meld) => meld.isKan());

    // Hand must only consist of four chiis and one pair, and can thus not contain
    // any pons or kans
    if (pons.length > 0 || kans.length > 0) {
      return 0;
    }

    const disallowed: Set<number> = new Set();
    // Hand is not allowed to contain any dragon tiles
    disallowed.add(Tiles.Haku.id);
    disallowed.add(Tiles.Chun.id);
    disallowed.add(Tiles.Hatsu.id);

    // Hand is not allowed to contain the round wind
    disallowed.add(getWindTile(config.round).id);
    // Hand is not allowed to contain seat tile
    disallowed.add(getWindTile(config.seat).id);

    if (hand.tiles().some((tile) => disallowed.has(tile.id))) {
      return 0;
    }

    // In order for the hand to count as pinfu, the tenpai hand had to have a ryanmen wait.
    // To verify this, we reconstruct the hand from before the win and see if such a wait
    // could be found based on the (closed) tiles in hand.
    const meldsInHand = hand.melds.filter((meld) => !meld.open);
    const tilesInHand = meldsInHand.flatMap((meld) => meld.tiles);
    const tenpaiTiles = removeFromArray(tilesInHand, [config.agari]);
    if (findRyanmenWithWait(tenpaiTiles, config.agari)) {
      return 1;
    }

    return 0;
  }
}
