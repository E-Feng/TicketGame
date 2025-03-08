import { CITIES } from './boardConsts';

export const isDestComplete = (destCard, routes) => {
  const ownedCities = [];
  routes.forEach((r) => {
    r.cities.forEach((c) => {
      if (!ownedCities.includes(c)) ownedCities.push(c);
    });
  });

  // Algorithm - Check 1 city, get list of all connected cities,
  //     completed if both cities in list, remove cities from main list,
  //     continue with remaining cities (rest are "island" groups)
  while (ownedCities.length > 0) {
    const mainEvalCity = ownedCities.pop();

    const visited = [mainEvalCity];
    const queue = [mainEvalCity];

    while (queue.length > 0) {
      const evalCity = queue.pop();

      const connRoutes = routes.filter((r) => r.cities.includes(evalCity));
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
    const cities = destCard.cities;
    if (visited.includes(cities[0]) && visited.includes(cities[1])) {
      return true;
    }
  }

  return false;
};

const getNeighborRoutes = (routes, targetRoute, targetCity) => {
  const city = targetCity || targetRoute.cities;
  const neighborRoutes = routes.filter((r) => {
    const cond1 = r.cities.some((c) => city.includes(c));
    const cond2 = r.id !== targetRoute.id;
    return cond1 && cond2;
  });
  return neighborRoutes;
};

export const getLongestPathLength = (routes) => {
  if (routes.length === 0) return 0;
  if (routes.length === 1) return routes[0].length;

  let longestLength = 0;

  // Finding cities where only odd # route is connected
  const startRoutes = [];
  CITIES.forEach((city) => {
    const cityId = city.id;
    const routesFromCity = routes.filter((r) => r.cities.includes(cityId));

    if (routesFromCity.length % 2 === 1) {
      routesFromCity.forEach((route) => {
        if (!startRoutes.includes(route)) {
          startRoutes.push(route);
        }
      });
    }
  });
  if (startRoutes.length === 0) {
    startRoutes.push(routes[0]);
  }
  console.log(startRoutes);

  // Adding 2nd route to determine direction
  const startPaths = [];
  startRoutes.forEach((startRoute) => {
    const neighborRoutes = getNeighborRoutes(routes, startRoute);
    neighborRoutes.forEach((nr) => {
      startPaths.push([startRoute.id, nr.id]);
    });
  });

  // DFS algo
  startPaths.forEach((startPath) => {
    const stack = [startPath];

    while (stack.length > 0) {
      console.log("aaaa")
      const path = stack.pop();

      const pathLength = path.reduce((total, id) => {
        const route = routes.filter((r) => r.id === id)[0];
        return total + route.length;
      }, 0);
      longestLength = Math.max(longestLength, pathLength);

      const endRouteIds = path.slice(-2);
      const endRoutes = endRouteIds.map((id) => {
        return routes.filter((r) => r.id === id)[0];
      });
      const endCity = endRoutes[1].cities.filter(
        (c) => !endRoutes[0].cities.includes(c)
      )[0];

      const neighborRoutes = getNeighborRoutes(routes, endRoutes[1], endCity);
      neighborRoutes.forEach((nr) => {
        if (!path.includes(nr.id)) {
          const newPath = [...path, nr.id];
          stack.push(newPath);
        }
      });
    }
  });

  return longestLength;
};
