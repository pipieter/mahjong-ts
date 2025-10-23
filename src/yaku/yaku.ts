import { Hand } from "../hand";

export enum RiichiCall {
  None,
  Riichi,
  Double,
}

export interface YakuConfig {
  /** Was the hand in riichi. */
  riichi: RiichiCall;
  /** Did the hand win by tsumo. If false, it is assumed the hand was won by ron. */
  tsumo: boolean;
  /** Number of tiles that remained in the walls at the time of win. */
  wallCount: number;
}

/**
 * Ids to reference the yaku. These equal the Tenhou ids, as denoted by their log format.
 */
export enum YakuId {
  Tsumo = 0,
  Riichi = 1,
  Haitei = 5,
  Houtei = 6,
  Tanyao = 8,
  DoubleRiichi = 21,
  Honiisou = 34,
}

export abstract class Yaku {
  public abstract readonly id: YakuId;
  public abstract readonly romaji: string;
  public abstract readonly english: string;
  public abstract readonly japanese: string;
  public abstract readonly yakuman: boolean;

  /**
   * Check if a hand and a config match the yaku.
   * @param hand The hand to check. Must be a complete hand.
   * @param config The config that describes the victory.
   * @return The amount of han associated with the hand. Returns 0 if the hand does not match the yaku.
   */
  public abstract check(hand: Hand, config: YakuConfig): number;
}
