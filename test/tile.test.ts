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
  expect(Tiles.Man1.toString()).toBe("m1");
  expect(Tiles.Man2.toString()).toBe("m2");
  expect(Tiles.Man3.toString()).toBe("m3");
  expect(Tiles.Man4.toString()).toBe("m4");
  expect(Tiles.Man5.toString()).toBe("m5");
  expect(Tiles.Man6.toString()).toBe("m6");
  expect(Tiles.Man7.toString()).toBe("m7");
  expect(Tiles.Man8.toString()).toBe("m8");
  expect(Tiles.Man9.toString()).toBe("m9");

  expect(Tiles.Sou1.toString()).toBe("s1");
  expect(Tiles.Sou2.toString()).toBe("s2");
  expect(Tiles.Sou3.toString()).toBe("s3");
  expect(Tiles.Sou4.toString()).toBe("s4");
  expect(Tiles.Sou5.toString()).toBe("s5");
  expect(Tiles.Sou6.toString()).toBe("s6");
  expect(Tiles.Sou7.toString()).toBe("s7");
  expect(Tiles.Sou8.toString()).toBe("s8");
  expect(Tiles.Sou9.toString()).toBe("s9");

  expect(Tiles.Pin1.toString()).toBe("p1");
  expect(Tiles.Pin2.toString()).toBe("p2");
  expect(Tiles.Pin3.toString()).toBe("p3");
  expect(Tiles.Pin4.toString()).toBe("p4");
  expect(Tiles.Pin5.toString()).toBe("p5");
  expect(Tiles.Pin6.toString()).toBe("p6");
  expect(Tiles.Pin7.toString()).toBe("p7");
  expect(Tiles.Pin8.toString()).toBe("p8");
  expect(Tiles.Pin9.toString()).toBe("p9");

  expect(Tiles.Ton.toString()).toBe("j1");
  expect(Tiles.Nan.toString()).toBe("j2");
  expect(Tiles.Shaa.toString()).toBe("j3");
  expect(Tiles.Pei.toString()).toBe("j4");
  expect(Tiles.Haku.toString()).toBe("j5");
  expect(Tiles.Hatsu.toString()).toBe("j6");
  expect(Tiles.Chun.toString()).toBe("j7");
});
