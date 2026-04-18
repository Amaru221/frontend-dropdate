import api, { patchWithMerge } from "./http";


export async function getGamesRelasesRange1() {
  const res = await fetch(`${API_URL}/games`);
  if (!res.ok) throw new Error("Error fetching games");
  return res.json();
}



export async function getGames() {
    const response = await api.get(`/games`);
    console.log(response);
    return response.data;
}

export async function getGamesRelasesRange(startDate, endDate, platform) {

  const params = {
    startDate: startDate|| undefined,
    endDate: endDate || undefined,
    platform: platform || undefined,
  };

  const response = await api.get(`/games/search`, {params});
  return response.data;
}


