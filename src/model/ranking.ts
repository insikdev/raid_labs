import { Player } from "./player";

export type Ranking = {
  score: number;
  wins: number;
  losses: number;
  player: Player;
};

export type RankingWithWinRate = Ranking & { win_rate: number };

export type SortableRankingField = keyof Omit<RankingWithWinRate, "player">;
