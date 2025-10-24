import { Hand } from "../hand";
import { Tile } from "../tile";

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
  /** Did the winner win with an ippatsu? */
  ippatsu: boolean;
  /** Number of tiles that remained in the walls at the time of win. */
  wallCount: number;
  /** Was the winner the dealer? */
  dealer: boolean;
  /** The dora indicators. */
  dora: Tile[];
  /** The uradora indicators. */
  uradora: Tile[];
  /** The number of akadora in the hand. */
  akadora: number;
}

/**
 * Ids to reference the yaku. These equal the Tenhou ids, as denoted by their log format.
 */
export enum YakuId {
  Tsumo = 0,
  Riichi = 1,
  Ippatsu = 2,
  Haitei = 5,
  Houtei = 6,
  Tanyao = 8,
  Iipeikou = 9,
  DoubleRiichi = 21,
  Chiitoitsu = 22,
  Ittsuu = 24,
  Ryanpeikou = 32,
  Honiisou = 34,
  Ryuuiisou = 43,
}

export abstract class Yaku {
  public abstract readonly id: YakuId;
  public abstract readonly romaji: string;
  public abstract readonly english: string;
  public abstract readonly japanese: string;
  public abstract readonly yakuman: boolean;

  /**
   * Check if a hand and a config match the yaku. If it does, the number of han is returned. Yakuman will return 13 han.
   * A yaku worth multiple yakuman will return a multiplied value, e.g. a double yakuman will return 26 han.
   *
   * If the hand does not match a yaku, the value zero is returned.
   *
   * @param hand The hand to check. Must be a complete hand.
   * @param config The config that describes the victory.
   * @return The amount of han associated with the hand. Returns 0 if the hand does not match the yaku.
   */
  public abstract check(hand: Hand, config: YakuConfig): number;
}
