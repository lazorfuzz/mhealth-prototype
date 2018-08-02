export const toRadians = (deg) => Math.PI * deg/180;

export const randNum = (max, min = .00001) => {
  const flip = Math.random() * 2;
  if (flip > 1) {
    return Math.random() * max;
  }
  return Math.random() * max * -1;

}

export const generateNewRewards = (coords, rewards) => {
  const result = Array(15).fill().map((_) => {
    const lat2 = coords.lat + randNum(.01);
    const lng2 = coords.lng + randNum(.01);
    const R = 6371e3;
    const φ1 = toRadians(coords.lat);
    const φ2 = toRadians(coords.lng);
    const Δφ = toRadians(lat2-coords.lat);
    const Δλ = toRadians(lng2-coords.lng);

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    let dist = 0.621371 * ((R * c)/1000);
    if (dist) dist = dist.toFixed(2);
    return {
      name: 'Treasure',
      lat: lat2,
      lng: lng2,
      distance: dist,
      id: randNum(1000)
    };
  });
  return result.filter(r => r.distance);
}
