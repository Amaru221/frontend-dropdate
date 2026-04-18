


export function groupGamesByDate(games) {
  return games.reduce((acc, game) => {
    if (!game.releaseDate) return acc;

    const date = new Date(game.releaseDate)
      .toISOString()
      .split("T")[0];

    if (!acc[date]) {
      acc[date] = [];
    }

    acc[date].push(game);

    return acc;
  }, {});
}