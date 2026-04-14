const API_URL = "https://localhost:8000/api";

export async function getGames() {
  const res = await fetch(`${API_URL}/games`);
  if (!res.ok) throw new Error("Error fetching games");
  return res.json();
}