import { expect, test } from "@jest/globals";
import { Suit, Tiles } from "../src/tile";

test("verify tile suits", () => {
  expect(Tiles.Man1.suit()).toBe(Suit.Manzu);
  expect(Tiles.Man2.suit()).toBe(Suit.Manzu);
  expect(Tiles.Man3.suit()).toBe(Suit.Manzu);
  expect(Tiles.Man4.suit()).toBe(Suit.Manzu);
  expect(Tiles.Man5.suit()).toBe(Suit.Manzu);
  expect(Tiles.Man6.suit()).toBe(Suit.Manzu);
  expect(Tiles.Man7.suit()).toBe(Suit.Manzu);
  expect(Tiles.Man8.suit()).toBe(Suit.Manzu);
  expect(Tiles.Man9.suit()).toBe(Suit.Manzu);

  expect(Tiles.Sou1.suit()).toBe(Suit.Souzu);
  expect(Tiles.Sou2.suit()).toBe(Suit.Souzu);
  expect(Tiles.Sou3.suit()).toBe(Suit.Souzu);
  expect(Tiles.Sou4.suit()).toBe(Suit.Souzu);
  expect(Tiles.Sou5.suit()).toBe(Suit.Souzu);
  expect(Tiles.Sou6.suit()).toBe(Suit.Souzu);
  expect(Tiles.Sou7.suit()).toBe(Suit.Souzu);
  expect(Tiles.Sou8.suit()).toBe(Suit.Souzu);
  expect(Tiles.Sou9.suit()).toBe(Suit.Souzu);

  expect(Tiles.Pin1.suit()).toBe(Suit.Pinzu);
  expect(Tiles.Pin2.suit()).toBe(Suit.Pinzu);
  expect(Tiles.Pin3.suit()).toBe(Suit.Pinzu);
  expect(Tiles.Pin4.suit()).toBe(Suit.Pinzu);
  expect(Tiles.Pin5.suit()).toBe(Suit.Pinzu);
  expect(Tiles.Pin6.suit()).toBe(Suit.Pinzu);
  expect(Tiles.Pin7.suit()).toBe(Suit.Pinzu);
  expect(Tiles.Pin8.suit()).toBe(Suit.Pinzu);
  expect(Tiles.Pin9.suit()).toBe(Suit.Pinzu);

  expect(Tiles.Ton.suit()).toBe(Suit.Jihai);
  expect(Tiles.Nan.suit()).toBe(Suit.Jihai);
  expect(Tiles.Shaa.suit()).toBe(Suit.Jihai);
  expect(Tiles.Pei.suit()).toBe(Suit.Jihai);
  expect(Tiles.Hatsu.suit()).toBe(Suit.Jihai);
  expect(Tiles.Haku.suit()).toBe(Suit.Jihai);
  expect(Tiles.Chun.suit()).toBe(Suit.Jihai);
});

test("verify tile numbers", () => {
  expect(Tiles.Man1.number()).toBe(1);
  expect(Tiles.Man2.number()).toBe(2);
  expect(Tiles.Man3.number()).toBe(3);
  expect(Tiles.Man4.number()).toBe(4);
  expect(Tiles.Man5.number()).toBe(5);
  expect(Tiles.Man6.number()).toBe(6);
  expect(Tiles.Man7.number()).toBe(7);
  expect(Tiles.Man8.number()).toBe(8);
  expect(Tiles.Man9.number()).toBe(9);

  expect(Tiles.Sou1.number()).toBe(1);
  expect(Tiles.Sou2.number()).toBe(2);
  expect(Tiles.Sou3.number()).toBe(3);
  expect(Tiles.Sou4.number()).toBe(4);
  expect(Tiles.Sou5.number()).toBe(5);
  expect(Tiles.Sou6.number()).toBe(6);
  expect(Tiles.Sou7.number()).toBe(7);
  expect(Tiles.Sou8.number()).toBe(8);
  expect(Tiles.Sou9.number()).toBe(9);

  expect(Tiles.Pin1.number()).toBe(1);
  expect(Tiles.Pin2.number()).toBe(2);
  expect(Tiles.Pin3.number()).toBe(3);
  expect(Tiles.Pin4.number()).toBe(4);
  expect(Tiles.Pin5.number()).toBe(5);
  expect(Tiles.Pin6.number()).toBe(6);
  expect(Tiles.Pin7.number()).toBe(7);
  expect(Tiles.Pin8.number()).toBe(8);
  expect(Tiles.Pin9.number()).toBe(9);
});

test("verify tile strings", () => {
  expect(Tiles.Man1.toString()).toBe("1m");
  expect(Tiles.Man2.toString()).toBe("2m");
  expect(Tiles.Man3.toString()).toBe("3m");
  expect(Tiles.Man4.toString()).toBe("4m");
  expect(Tiles.Man5.toString()).toBe("5m");
  expect(Tiles.Man6.toString()).toBe("6m");
  expect(Tiles.Man7.toString()).toBe("7m");
  expect(Tiles.Man8.toString()).toBe("8m");
  expect(Tiles.Man9.toString()).toBe("9m");

  expect(Tiles.Sou1.toString()).toBe("1s");
  expect(Tiles.Sou2.toString()).toBe("2s");
  expect(Tiles.Sou3.toString()).toBe("3s");
  expect(Tiles.Sou4.toString()).toBe("4s");
  expect(Tiles.Sou5.toString()).toBe("5s");
  expect(Tiles.Sou6.toString()).toBe("6s");
  expect(Tiles.Sou7.toString()).toBe("7s");
  expect(Tiles.Sou8.toString()).toBe("8s");
  expect(Tiles.Sou9.toString()).toBe("9s");

  expect(Tiles.Pin1.toString()).toBe("1p");
  expect(Tiles.Pin2.toString()).toBe("2p");
  expect(Tiles.Pin3.toString()).toBe("3p");
  expect(Tiles.Pin4.toString()).toBe("4p");
  expect(Tiles.Pin5.toString()).toBe("5p");
  expect(Tiles.Pin6.toString()).toBe("6p");
  expect(Tiles.Pin7.toString()).toBe("7p");
  expect(Tiles.Pin8.toString()).toBe("8p");
  expect(Tiles.Pin9.toString()).toBe("9p");

  expect(Tiles.Ton.toString()).toBe("1j");
  expect(Tiles.Nan.toString()).toBe("2j");
  expect(Tiles.Shaa.toString()).toBe("3j");
  expect(Tiles.Pei.toString()).toBe("4j");
  expect(Tiles.Haku.toString()).toBe("5j");
  expect(Tiles.Hatsu.toString()).toBe("6j");
  expect(Tiles.Chun.toString()).toBe("7j");
});
