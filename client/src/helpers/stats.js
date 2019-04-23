export const Stats = {
  normalStats: ['end', 'dex','int','str','spr'],
  prestigeStats: ['hp','sp','dmg','mdmg','def','mdef','aim','eva'],
};

export function getStatArray(statType) {
  if (statType === 'normal') {
    return Stats.normalStats;
  } else if (statType === 'prestige') {
    return Stats.prestigeStats;
  } else {
    return [];
  }
};