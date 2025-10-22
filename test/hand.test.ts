import { expect, test } from "@jest/globals";
import { Hand, Meld } from "../src/hand";
import { Tiles } from "../src/tile";

test("basic meld ids", () => {
  expect(new Meld([Tiles.Man1, Tiles.Man2, Tiles.Man3], true).toString()).toEqual("o1m2m3m");
  expect(new Meld([Tiles.Sou3, Tiles.Sou3, Tiles.Sou3, Tiles.Sou3], false).toString()).toEqual("c3s3s3s3s");
  expect(new Meld([Tiles.Haku, Tiles.Haku, Tiles.Haku], false).toString()).toEqual("c5j5j5j");
});

test("completed hand find single hand", () => {
  // The following melds should result in a unique hand
  const tiles = [
    Tiles.Man1,
    Tiles.Man2,
    Tiles.Man3,
    Tiles.Man6,
    Tiles.Man7,
    Tiles.Man8,
    Tiles.Sou3,
    Tiles.Sou3,
    Tiles.Sou3,
    Tiles.Pin4,
    Tiles.Pin5,
    Tiles.Pin6,
    Tiles.Haku,
    Tiles.Haku,
  ];

  const hands = Hand.find(tiles, []);

  expect(hands.length).toEqual(1);
});

test("complete hand find isshanten hand", () => {
  // The hand below should be isshanten
  const tiles = [
    Tiles.Man1,
    Tiles.Man3,
    Tiles.Man4,
    Tiles.Sou2,
    Tiles.Sou2,
    Tiles.Sou2,
    Tiles.Pin3,
    Tiles.Pin4,
    Tiles.Pin5,
    Tiles.Pei,
    Tiles.Pei,
    Tiles.Pei,
    Tiles.Pin9,
    Tiles.Pin9,
  ];

  const hands = Hand.find(tiles, []);
  expect(hands.length).toEqual(0);
});

test("complete hand find chiitoitsu hand", () => {
  // The hand below should be a chiitoitsu hand
  const tiles = [
    Tiles.Man3,
    Tiles.Man3,
    Tiles.Man5,
    Tiles.Man5,
    Tiles.Sou7,
    Tiles.Sou7,
    Tiles.Pin2,
    Tiles.Pin2,
    Tiles.Pin3,
    Tiles.Pin3,
    Tiles.Pin9,
    Tiles.Pin9,
    Tiles.Pei,
    Tiles.Pei,
    Tiles.Nan,
    Tiles.Nan,
  ];

  const hands = Hand.find(tiles, []);
  expect(hands.length).toEqual(1);

  const pairs = hands[0].melds;
  expect(pairs.every((pair) => pair.isPair())).toEqual(true);
});

test("complete hand find kokushi", () => {
  const tiles = [
    Tiles.Man1,
    Tiles.Man9,
    Tiles.Sou1,
    Tiles.Sou9,
    Tiles.Pin1,
    Tiles.Pin9,
    Tiles.Pei,
    Tiles.Nan,
    Tiles.Ton,
    Tiles.Shaa,
    Tiles.Haku,
    Tiles.Hatsu,
    Tiles.Chun,
    Tiles.Chun,
  ];

  const hands = Hand.find(tiles, []);
  expect(hands.length).toEqual(1);
  expect(hands[0].melds.length).toEqual(1);
  expect(hands[0].melds[0].isKokushiMusou()).toEqual(true);
});

test("complete hand find incomplete kokushi", () => {
  const tiles = [
    Tiles.Man1,
    Tiles.Man9,
    Tiles.Sou1,
    Tiles.Sou9,
    Tiles.Pin1,
    Tiles.Pin9,
    Tiles.Pei,
    Tiles.Nan,
    Tiles.Ton,
    Tiles.Shaa,
    Tiles.Haku,
    Tiles.Hatsu,
    Tiles.Chun,
    Tiles.Sou5,
  ];

  const hands = Hand.find(tiles, []);
  expect(hands.length).toEqual(0);
});
