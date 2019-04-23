export const Stats = {
  normalStats: ['end', 'dex','int','str','spr'],
  prestigeStats: ['hp','sp','dmg','mdmg','def','mdef','aim','eva'],
};

export function getStatArray(statType) {
  if (statType === 'normal') {
    return this.normalStats;
  } else if (statType === 'prestige') {
    return this.prestigeStats;
  } else {
    return [];
  }
};