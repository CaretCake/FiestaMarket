export const Stats = {
  uNormalStats: ['End', 'Dex','Int','Str','Spr'],
  uPrestigeStats: ['Hp','Sp','Dmg','Mdmg','Def','Mdef','Aim','Eva'],
  lNormalStats: ['end', 'dex','int','str','spr'],
  lPrestigeStats: ['hp','sp','dmg','mdmg','def','mdef','aim','eva']
};

export function getStatArray(statType, lettercase) {
  if (statType === 'normal') {
    if (lettercase === 'lower') {
      return Stats.lNormalStats;
    } else {
      return Stats.uNormalStats;
    }
  } else if (statType === 'prestige') {
    if (lettercase === 'lower') {
      return Stats.lPrestigeStats;
    } else {
      return Stats.uPrestigeStats;
    }
  } else {
    return [];
  }
};