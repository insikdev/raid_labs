import {
  Ranking,
  RankingWithWinRate,
  SortableRankingField,
} from "../model/ranking";

export type GetRankingsResponse = {
  data: RankingWithWinRate[];
  pagination: {
    total: number;
    offset: number;
    limit: number;
    hasNextPage: boolean;
  };
};

class Server {
  private static API_ENDPOINT =
    "https://gateway.pinata.cloud/ipfs/bafkreia2tigtk5kv5x6mptrscob7rwyvooyzte2j7luimkfssvm3m2zf54";
  private cache: RankingWithWinRate[] = [];

  private async getRankingsFromServer() {
    try {
      const res = await fetch(Server.API_ENDPOINT);
      const data = await res.json();

      this.cache = data.map((item: Ranking) => ({
        ...item,
        win_rate: Math.round((item.wins / (item.losses + item.wins)) * 100),
      }));
    } catch (error) {
      console.error(error);
      this.cache = [];
    }
  }

  public async getRankings(
    offset: number,
    limit: number,
    sort: SortableRankingField,
    order: "ASC" | "DESC"
  ): Promise<GetRankingsResponse> {
    if (this.cache.length === 0) {
      await this.getRankingsFromServer();
    }

    const sorted = [...this.cache].sort((a, b) =>
      order === "ASC" ? a[sort] - b[sort] : b[sort] - a[sort]
    );
    const paginated = sorted.slice(offset, offset + limit);

    return {
      data: paginated,
      pagination: {
        total: this.cache.length,
        offset,
        limit,
        hasNextPage: offset + limit < this.cache.length,
      },
    };
  }
}

export const server = new Server();
