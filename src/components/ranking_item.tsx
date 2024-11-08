import { RankingWithWinRate } from "../model/ranking";

type Props = React.PropsWithChildren & RankingWithWinRate & { rank: number };

function RankingItem({ losses, player, score, win_rate, wins, rank }: Props) {
  return (
    <li className="row py-6 cursor-pointer rounded-2xl bg-white shadow hover:ring-4 ring-yellow-400 transition-all">
      <div>{rank}</div>
      <div>{player.name}</div>
      <div>{player.guild?.name}</div>
      <div>{score}</div>
      <div>{wins}</div>
      <div>{losses}</div>
      <div>{win_rate}%</div>
    </li>
  );
}

export default RankingItem;
