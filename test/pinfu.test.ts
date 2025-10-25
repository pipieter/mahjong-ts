/**
 * Because the pinfu hand has many restrictions and because it influences the amount of fu
 * calculated, extra tests were written to verify the correctness of its implementation. These
 * tests are based on the Definition section of the riichi wiki pinfu page.
 * (https://riichi.wiki/Pinfu#Definition)
 */

import { describe, expect, test } from "@jest/globals";
import { Hand, Meld, Pinfu, Tile, Tiles, Wind } from "../src";
import { mockConfig, verifyUnique } from "./mock";

describe("pinfu success tests", () => {
  test("pinfu results in yaku", () => {
    const pinfu = new Pinfu();
    const config = mockConfig();
    const agaris = [Tiles.Sou6, Tiles.Sou9];

    for (const agari of agaris) {
      const melds = [
        new Meld([Tiles.Man1, Tiles.Man2, Tiles.Man3], false),
        new Meld([Tiles.Sou2, Tiles.Sou3, Tiles.Sou4], false),
        new Meld([Tiles.Pin5, Tiles.Pin6, Tiles.Pin7], false),
        new Meld([Tiles.Pin9, Tiles.Pin9], false),
        new Meld([Tiles.Sou7, Tiles.Sou8, agari], false),
      ];
      const hand = new Hand(melds);
      config.agari = agari;

      expect(pinfu.check(hand, config)).toEqual(1);
    }
  });

  test("pinfu is allowed to have non-seat and non-round wind", () => {
    const pinfu = new Pinfu();
    const config = mockConfig();

    const melds = [
      new Meld([Tiles.Man1, Tiles.Man2, Tiles.Man3], false),
      new Meld([Tiles.Sou2, Tiles.Sou3, Tiles.Sou4], false),
      new Meld([Tiles.Pin5, Tiles.Pin6, Tiles.Pin7], false),
      new Meld([Tiles.Sou7, Tiles.Sou8, Tiles.Sou9], false),
      new Meld([Tiles.Shaa, Tiles.Shaa], false),
    ];
    const hand = new Hand(melds);
    config.agari = Tiles.Sou9;
    config.round = Wind.Ton;
    config.seat = Wind.Pei;

    expect(pinfu.check(hand, config)).toEqual(1);
  });
});

describe("pinfu failure tests", () => {
  test("pinfu must be closed", () => {
    const pinfu = new Pinfu();
    const config = mockConfig();
    const agaris = [Tiles.Pin6, Tiles.Pin9];

    for (const agari of agaris) {
      const melds = [
        new Meld([Tiles.Man4, Tiles.Man5, Tiles.Man6], false),
        new Meld([Tiles.Pin3, Tiles.Pin4, Tiles.Pin6], false),
        new Meld([Tiles.Sou5, Tiles.Sou5], false),
        new Meld([Tiles.Pin7, Tiles.Pin8, agari], false),
        new Meld([Tiles.Sou5, Tiles.Sou6, Tiles.Sou7], true), // open meld
      ];
      const hand = new Hand(melds);
      config.agari = agari;

      expect(pinfu.check(hand, config)).toEqual(0);
    }
  });

  test("pinfu cannot have seat or round wind", () => {
    const pinfu = new Pinfu();
    const config = mockConfig();
    const agaris = [Tiles.Man1, Tiles.Man4];

    for (const agari of agaris) {
      const melds = [
        new Meld([Tiles.Man2, Tiles.Man3, agari], false),
        new Meld([Tiles.Pin1, Tiles.Pin2, Tiles.Pin3], false),
        new Meld([Tiles.Sou6, Tiles.Sou7, Tiles.Sou8], false),
        new Meld([Tiles.Man3, Tiles.Man4, Tiles.Man5], false),
        new Meld([Tiles.Ton, Tiles.Ton], false),
      ];
      const hand = new Hand(melds);
      config.agari = agari;
      config.seat = Wind.Ton;
      config.round = Wind.Shaa;

      expect(pinfu.check(hand, config)).toEqual(0);
    }
  });

  test("pinfu cannot have pair wait", () => {
    const pinfu = new Pinfu();
    const config = mockConfig();
    const agari = Tiles.Man3;

    const melds = [
      new Meld([Tiles.Pin1, Tiles.Pin2, Tiles.Pin3], false),
      new Meld([Tiles.Pin4, Tiles.Pin5, Tiles.Pin6], false),
      new Meld([Tiles.Man7, Tiles.Man8, Tiles.Man9], false),
      new Meld([Tiles.Sou5, Tiles.Sou6, Tiles.Sou7], false),
      new Meld([Tiles.Man3, agari], false),
    ];
    const hand = new Hand(melds);
    config.agari = agari;

    expect(pinfu.check(hand, config)).toEqual(0);
  });

  test("pinfu cannot have pon", () => {
    const pinfu = new Pinfu();
    const config = mockConfig();
    const agari = Tiles.Man9;

    const melds = [
      new Meld([Tiles.Pin1, Tiles.Pin2, Tiles.Pin3], false),
      new Meld([Tiles.Pin4, Tiles.Pin5, Tiles.Pin6], false),
      new Meld([Tiles.Man3, Tiles.Man3, Tiles.Man3], false),
      new Meld([Tiles.Man7, Tiles.Man8, agari], false),
      new Meld([Tiles.Sou6, Tiles.Sou6], false),
    ];
    const hand = new Hand(melds);
    config.agari = agari;

    expect(pinfu.check(hand, config)).toEqual(0);
  });

  test("pinfu cannot have dragon pair", () => {
    const pinfu = new Pinfu();
    const config = mockConfig();
    const agari = Tiles.Man4;

    const melds = [
      new Meld([Tiles.Man2, Tiles.Man3, agari], false),
      new Meld([Tiles.Pin1, Tiles.Pin2, Tiles.Pin3], false),
      new Meld([Tiles.Sou6, Tiles.Sou7, Tiles.Sou8], false),
      new Meld([Tiles.Man3, Tiles.Man4, Tiles.Man5], false),
      new Meld([Tiles.Haku, Tiles.Haku], false),
    ];
    const hand = new Hand(melds);
    config.agari = agari;

    expect(pinfu.check(hand, config)).toEqual(0);
  });

  test("pinfu cannot have kanchan pair", () => {
    const pinfu = new Pinfu();
    const config = mockConfig();
    const agari = Tiles.Sou8;

    const melds = [
      new Meld([Tiles.Man1, Tiles.Man2, Tiles.Man3], false),
      new Meld([Tiles.Sou2, Tiles.Sou3, Tiles.Sou4], false),
      new Meld([Tiles.Sou7, Tiles.Sou9, agari], false),
      new Meld([Tiles.Pin5, Tiles.Pin6, Tiles.Pin7], false),
      new Meld([Tiles.Pin2, Tiles.Pin2], false),
    ];
    const hand = new Hand(melds);
    config.agari = agari;

    expect(pinfu.check(hand, config)).toEqual(0);
  });

  test("pinfu can depend on agari for complex waits", () => {
    const pinfu = new Pinfu();
    const config = mockConfig();
    const agaris: [Tile, number][] = [
      [Tiles.Pin3, 0],
      [Tiles.Pin6, 1],
      [Tiles.Pin9, 1],
    ];

    for (const [agari, han] of agaris) {
      const hand = verifyUnique([
        Tiles.Man4,
        Tiles.Man5,
        Tiles.Man6,
        Tiles.Sou1,
        Tiles.Sou2,
        Tiles.Sou3,
        Tiles.Pin3,
        Tiles.Pin4,
        Tiles.Pin5,
        Tiles.Pin6,
        Tiles.Pin6,
        Tiles.Pin7,
        Tiles.Pin8,
        agari,
      ]);
      config.agari = agari;

      expect(pinfu.check(hand, config)).toEqual(han);
    }
  });
});
