import { expect, test } from "@jest/globals";
import { orderedPermutationsOfLength } from "../src/util";

test("permutations", () => {
  const array = [1, 2, 3, 4, 5];
  const length = 3;

  const permutations = orderedPermutationsOfLength(array, length);
  const expectations = [
    [1, 2, 3],
    [1, 2, 4],
    [1, 2, 5],
    [1, 3, 4],
    [1, 3, 5],
    [1, 4, 5],
    [2, 3, 4],
    [2, 3, 5],
    [2, 4, 5],
    [3, 4, 5],
  ];

  expect(permutations.length).toEqual(expectations.length);
  for (let i = 0; i < permutations.length; i++) {
    expect(permutations[i]).toEqual(expectations[i]);
  }
});

test("permutations empty", () => {
  const array: number[] = [];
  const length = 3;

  const permutations = orderedPermutationsOfLength(array, length);
  expect(permutations.length).toEqual(0);
});

test("permutations smaller than length", () => {
  const array: number[] = [1, 2, 3, 4];
  const length = 6;

  const permutations = orderedPermutationsOfLength(array, length);
  expect(permutations.length).toEqual(0);
});
