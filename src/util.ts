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
