import { useEffect, useReducer, useState } from "react";
import { SortableRankingField } from "./model/ranking";
import { GetRankingsResponse, server } from "./api/get_rankings";
import RankingItem from "./components/ranking_item";
import SortableItem from "./components/sortable_field";
import Pagination from "./components/pagination";

type RankingQueryParams = {
  offset: number;
  limit: number;
  sortBy: SortableRankingField;
  isDescending: boolean;
};

type RankingAction =
  | { type: "SET_SORT_FIELD"; sortBy: SortableRankingField }
  | { type: "GO_TO_NEXT_PAGE"; totalItems: number }
  | { type: "GO_TO_PREV_PAGE" }
  | { type: "SET_ITEMS_PER_PAGE"; limit: number };

function rankingQueryReducer(
  state: RankingQueryParams,
  action: RankingAction
): RankingQueryParams {
  switch (action.type) {
    case "SET_SORT_FIELD": {
      return {
        ...state,
        sortBy: action.sortBy,
        isDescending:
          state.sortBy === action.sortBy ? !state.isDescending : true,
      };
    }
    case "GO_TO_NEXT_PAGE": {
      const next = state.offset + state.limit;
      return { ...state, offset: Math.min(next, action.totalItems) };
    }
    case "GO_TO_PREV_PAGE": {
      const prev = state.offset - state.limit;
      return { ...state, offset: Math.max(prev, 0) };
    }
    case "SET_ITEMS_PER_PAGE": {
      return { ...state, limit: action.limit };
    }
    default: {
      return state;
    }
  }
}

function App() {
  const [rankingData, setRankingData] = useState<GetRankingsResponse>();
  const [queryParams, dispatch] = useReducer(rankingQueryReducer, {
    offset: 0,
    limit: 10,
    sortBy: "score",
    isDescending: true,
  });

  function handleSortFieldClick(sortBy: SortableRankingField) {
    dispatch({ type: "SET_SORT_FIELD", sortBy });
  }

  function handlePrevPageClick() {
    dispatch({ type: "GO_TO_PREV_PAGE" });
  }

  function handleNextPageClick() {
    if (rankingData) {
      dispatch({
        type: "GO_TO_NEXT_PAGE",
        totalItems: rankingData.pagination.total,
      });
    }
  }

  function handleItemsPerPageChange(limit: number) {
    dispatch({ type: "SET_ITEMS_PER_PAGE", limit });
  }

  useEffect(() => {
    server
      .getRankings(
        queryParams.offset,
        queryParams.limit,
        queryParams.sortBy,
        queryParams.isDescending ? "DESC" : "ASC"
      )
      .then(setRankingData);
  }, [queryParams]);

  if (!rankingData) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-10">
      <h1 className="text-5xl font-bold text-center mb-10">LEADERBOARD</h1>
      <ul className="flex flex-col gap-y-1">
        <li className="row py-6 rounded text-gray-500">
          <div>Rank</div>
          <div>Player Name</div>
          <div>Guild Name</div>
          <SortableItem
            isActive={queryParams.sortBy === "score"}
            title="Score"
            isDesc={queryParams.isDescending}
            onClick={() => handleSortFieldClick("score")}
          />
          <SortableItem
            isActive={queryParams.sortBy === "wins"}
            title="Wins"
            isDesc={queryParams.isDescending}
            onClick={() => handleSortFieldClick("wins")}
          />
          <SortableItem
            isActive={queryParams.sortBy === "losses"}
            title="Losses"
            isDesc={queryParams.isDescending}
            onClick={() => handleSortFieldClick("losses")}
          />
          <SortableItem
            isActive={queryParams.sortBy === "win_rate"}
            title="Win Rate"
            isDesc={queryParams.isDescending}
            onClick={() => handleSortFieldClick("win_rate")}
          />
        </li>
        {rankingData?.data.map((item, index) => (
          <RankingItem
            key={item.player.id}
            {...item}
            rank={queryParams.offset + index + 1}
          />
        ))}
      </ul>
      <Pagination
        limit={queryParams.limit}
        offset={queryParams.offset}
        total={rankingData.pagination.total}
        clickPrev={handlePrevPageClick}
        clickNext={handleNextPageClick}
        hasNext={
          queryParams.offset + queryParams.limit < rankingData.pagination.total
        }
        hasPrev={queryParams.offset !== 0}
        changeLimit={handleItemsPerPageChange}
      />
    </section>
  );
}

export default App;
