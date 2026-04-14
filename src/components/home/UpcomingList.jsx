import { useEffect, useState } from "react";
import { getGames } from "../../api/games.api";
import GameCard from "../ui/GameCard";

const MS_PER_DAY = 1000 * 60 * 60 * 24;

function diffInDays(date) {
  return Math.ceil((new Date(date) - new Date()) / MS_PER_DAY);
}

function getBucket(releaseDate) {
  const days = diffInDays(releaseDate);

  if (days < 0) return null;

  // 0–30 días → semanas
  if (days <= 7) return { label: "This week", rank: 1 };
  if (days <= 14) return { label: "Next week", rank: 2 };
  if (days <= 21) return { label: "2 weeks left", rank: 3 };
  if (days <= 28) return { label: "3 weeks left", rank: 4 };
  if (days <= 30) return { label: "4 weeks left", rank: 5 };

  // meses
  const months = Math.floor(days / 30);

  if (months < 12) {
    return {
      label: months <= 1 ? "1 month" : `${months} months`,
      rank: 100 + months,
    };
  }

  // años
  const years = Math.floor(months / 12);

  return {
    label: years === 1 ? "1 year" : `${years} years`,
    rank: 1000 + years,
  };
}

export default function UpcomingList() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    getGames()
      .then((data) => {
        const upcoming = data.filter(
          (g) => g.status === "upcoming"
        );
        setGames(upcoming);
      })
      .catch(console.error);
  }, []);

  // agrupar con rank
  const grouped = games.reduce((acc, game) => {
    const bucket = getBucket(game.releaseDate);
    if (!bucket) return acc;

    const { label, rank } = bucket;

    if (!acc[label]) {
      acc[label] = {
        rank,
        games: [],
      };
    }

    acc[label].games.push(game);

    return acc;
  }, {});

  // orden estable por rank
  const sortedGroups = Object.entries(grouped).sort(
    (a, b) => a[1].rank - b[1].rank
  );

  return (
    <section className="px-12 py-24 bg-surface-container-lowest">
      <h2 className="text-4xl font-bold text-white mb-8">
        Upcoming Games
      </h2>

      <div className="space-y-10">
        {sortedGroups.map(([label, data]) => (
          <div key={label}>
            <h3 className="text-xl font-semibold text-gray-300 mb-4">
              {label}
            </h3>

            <div className="space-y-4">
              {data.games
                .sort(
                  (a, b) =>
                    new Date(a.releaseDate) -
                    new Date(b.releaseDate)
                )
                .map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}