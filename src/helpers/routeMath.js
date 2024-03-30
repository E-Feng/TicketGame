import { CITIES } from './boardConsts';

export const markCompletedDests = (gameState, id) => {
  const destCards = gameState.getPlayer(id).destCards;

  const ownedRoutes = gameState.board.routes.filter((r) => {
    const trackOwners = r.tracks.map((t) => t.owner);
    return trackOwners.includes(id);
  });
  const ownedCities = [];
  ownedRoutes.forEach((r) => {
    r.cities.forEach((c) => {
      if (!ownedCities.includes(c)) ownedCities.push(c);
    });
  });

  while (ownedCities.length > 0) {
    const mainEvalCity = ownedCities.pop();

    const visited = [mainEvalCity];
    const queue = [mainEvalCity];

    while (queue.length > 0) {
      const evalCity = queue.pop();

      const connRoutes = ownedRoutes.filter((r) => r.cities.includes(evalCity));
      connRoutes.forEach((r) => {
        const connCity = r.cities.filter((c) => c !== evalCity)[0];

        // Removing city from main list
        const idxOwnedCities = ownedCities.indexOf(connCity);
        if (idxOwnedCities !== -1) ownedCities.splice(idxOwnedCities);

        // Continuing search
        if (!visited.includes(connCity)) {
          visited.push(connCity);
          queue.push(connCity);
        }
      });
    }

    // Checking dest card for connected group (visited)
    destCards.forEach((destCard) => {
      const cities = destCard.cities;
      if (visited.includes(cities[0]) && visited.includes(cities[1])) {
        destCard.markCompleted();
      }
    });
  }
};

export const getPlayersLongestTrack = (gameState) => {
  console.log(gameState);

  const players = gameState.players;

  players.forEach((p) => {
    const ownedRoutes = gameState.board.routes.filter((r) => {
      const trackOwners = r.tracks.map((t) => t.owner);
      return trackOwners.includes(p.id);
    });

    // Finding cities where only 1 route is connected
    const citiesOneRoute = [];
    CITIES.forEach((city) => {
      const id = city.id;
      const routes = ownedRoutes.filter((r) => r.cities.includes(id));

      if (routes.length === 1) citiesOneRoute.push(id);
    });
    if (citiesOneRoute.length === 0) {
      // citiesOneRoute.push(ownedRoutes[0].cities[0]);
    }
    console.log(citiesOneRoute)

    citiesOneRoute.forEach(city => {
      const visited = []
      const queue = []

    })
  });
};
