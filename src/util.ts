import { Meld } from "./hand";
import { Tile } from "./tile";

export function orderedPermutationsOfLength<T>(array: T[], length: number): T[][] {
  if (array.length < length) {
    return [];
  }

  if (length === 1) {
    return array.map((element) => [element]);
  }

  const permutations: T[][] = [];
  for (let i = 0; i < array.length - length + 1; i++) {
    const element = array[i];
    const subpermutations = orderedPermutationsOfLength(array.slice(i + 1), length - 1);
    for (const subpermutation of subpermutations) {
      permutations.push([element, ...subpermutation]);
    }
  }

  return permutations;
}

/**
 * Remove all tiles in an array from an array. This removes the first occurrence of each element
 * in the array and ignores elements that are not in the array.
 * @param array The original array containing the elements.
 * @param remove The elements to remove.
 * @returns A copy of the original array with the elements removed.
 */
export function removeFromArray(array: readonly Tile[], toRemove: readonly Tile[]): Tile[] {
  const copy = [...array]; // Create a copy

  for (const element of toRemove) {
    const index = copy.findIndex((tile) => tile.id === element.id);
    if (index > -1) {
      copy.splice(index, 1);
    }
  }

  return copy;
}

export function findMeldsAndPair(tiles: Tile[]): Meld[][] {
  // The total amount of tiles should have length 3*N+2
  if (tiles.length % 3 !== 2) {
    return [];
  }

  const combinations: Meld[][] = [];
  const stack: [Tile[], Meld[]][] = [[tiles, []]];

  while (stack.length > 0) {
    const [remaining, melds] = stack.pop();
    // If two tiles remain, see if it can become a pair
    if (remaining.length === 2) {
      const pair = new Meld(remaining, false);
      if (pair.isPair()) {
        combinations.push([...melds, pair]);
      }
    }
    // Otherwise, at least three tiles remain in multiples of three.
    // See if valid triplets can be extracted.
    else {
      const permutations = orderedPermutationsOfLength(remaining, 3);
      for (const permutation of permutations) {
        const meld = new Meld(permutation, false);
        if (meld.isTriplet()) {
          const newRemaining = removeFromArray(remaining, permutation);
          const newMelds = [...melds, meld];
          stack.push([newRemaining, newMelds]);
        }
      }
    }
  }

  return combinations;
}
