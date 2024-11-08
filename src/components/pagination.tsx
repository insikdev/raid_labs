import Prev from "../assets/prev.svg?react";
import Next from "../assets/next.svg?react";

type Props = React.PropsWithChildren & {
  total: number;
  offset: number;
  limit: number;
  clickPrev: () => void;
  clickNext: () => void;
  changeLimit: (limit: number) => void;
  hasPrev: boolean;
  hasNext: boolean;
};

function Pagination({
  limit,
  offset,
  total,
  clickNext,
  clickPrev,
  hasNext,
  hasPrev,
  changeLimit,
}: Props) {
  return (
    <div className="flex items-center justify-end gap-x-6 mt-10">
      <div className="flex justify-center items-center h-10">
        <select
          value={limit}
          onChange={(e) => changeLimit(Number(e.target.value))}
          className="focus:ring rounded outline-none h-full px-2 bg-white"
        >
          {[10, 20].map((item) => (
            <option value={item}>{item} per page</option>
          ))}
        </select>
      </div>
      <div className="flex items-center bg-white gap-x-4 rounded px-2 h-10">
        <div>
          <span className="font-bold">
            {offset + 1}-{Math.min(offset + limit, total)}
          </span>
          <span> of </span>
          <span>{total}</span>
        </div>
        <div className="flex">
          <button
            onClick={clickPrev}
            disabled={!hasPrev}
            className={`h-6 w-auto ${
              !hasPrev ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <Prev className="h-full w-auto" />
          </button>
          <button
            onClick={clickNext}
            disabled={!hasNext}
            className={`h-6 w-auto ${
              !hasNext ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <Next className="h-full w-auto" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
