import imgs from "../../imgs"

export const imgSrcWeapons = {
    mythic: imgs.imgJet,
    legendary: imgs.imgTank,
    epic: imgs.imgSniper,
    rare: imgs.imgRifle,
    uncommon: imgs.imgGun,
    common: imgs.imgKnife,
    noItem: imgs.imgCase1
}

export const equipmentItemValues = {
    weapon: {
        mythic: { attack: 280, criticalChance: 40 },
        legendary: { attack: 160, criticalChance: 30 },
        epic: { attack: 120, criticalChance: 20 },
        rare: { attack: 90, criticalChance: 15 },
        uncommon: { attack: 60, criticalChance: 10 },
        common: { attack: 40, criticalChance: 5 },
        noItem: { attack: 0, criticalChance: 0 }
    },
    helmet: {
        mythic: { criticalDamages: 80 },
        legendary: { criticalDamages: 60 },
        epic: { criticalDamages: 40 },
        rare: { criticalDamages: 30 },
        uncommon: { criticalDamages: 20 },
        common: { criticalDamages: 10 },
        noItem: { criticalDamages: 0 }
    },
    chest: {
        mythic: { armor: 60 },
        legendary: { armor: 45 },
        epic: { armor: 30 },
        rare: { armor: 20 },
        uncommon: { armor: 10 },
        common: { armor: 5 },
        noItem: { armor: 0 }
    },
    pants: {
        mythic: { armor: 60 },
        legendary: { armor: 45 },
        epic: { armor: 30 },
        rare: { armor: 20 },
        uncommon: { armor: 10 },
        common: { armor: 5 },
        noItem: { armor: 0 }
    },
    gloves: {
        mythic: { precision: 40 },
        legendary: { precision: 30 },
        epic: { precision: 20 },
        rare: { precision: 15 },
        uncommon: { precision: 10 },
        common: { precision: 5 },
        noItem: { precision: 0 }
    },
    boots: {
        mythic: { dodge: 40 },
        legendary: { dodge: 30 },
        epic: { dodge: 20 },
        rare: { dodge: 15 },
        uncommon: { dodge: 10 },
        common: { dodge: 5 },
        noItem: { dodge: 0 }
    }
}