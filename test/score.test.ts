import { describe, expect, test } from "@jest/globals";
import { Tiles } from "../src/tile";
import { mockConfig, verifyUnique } from "./mock";
import { Scorer } from "../src/score";
import { RiichiCall, YakuId } from "../src/yaku/yaku";

describe("basic scoring", () => {
  test("score tanyao tsumo", () => {
    // prettier-ignore
    const tiles = [Tiles.Sou2, Tiles.Sou3, Tiles.Sou4, Tiles.Man4, Tiles.Man4, Tiles.Man4, Tiles.Pin5, Tiles.Pin6, Tiles.Pin7, Tiles.Pin8, Tiles.Pin8, Tiles.Pin8, Tiles.Sou7, Tiles.Sou7];
    const hand = verifyUnique(tiles);
    const config = mockConfig();
    config.tsumo = true;
    config.riichi = RiichiCall.None;

    const scorer = new Scorer();
    const score = scorer.score(hand, config);

    expect(score.han).toEqual(2);
    expect(score.yakus.includes(YakuId.Tanyao));
    expect(score.yakus.includes(YakuId.Tsumo));
    expect(!score.yakus.includes(YakuId.Riichi));
  });
});
