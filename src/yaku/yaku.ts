import { CompletedHand } from "../hand";

export interface YakuConfig {
  /** Was the hand in riichi. */
  riichi: boolean;
  /** Did the hand win by tsumo. If false, it is assumed the hand was won by ron. */
  tsumo: boolean;
  /** Number of tiles that remained in the walls at the time of win. */
  wallCount: number;
}

export enum YakuId {
  Tanyao = "tanyao",
  Riichi = "riichi",
  Tsumo = "tsumo",
}

export abstract class Yaku {
  public abstract readonly id: YakuId;
  public abstract readonly romaji: string;
  public abstract readonly english: string;
  public abstract readonly japanese: string;
  public abstract readonly han: number;
  public abstract readonly yakuman: boolean;

  public abstract check(hand: CompletedHand, config: YakuConfig): boolean;
}
