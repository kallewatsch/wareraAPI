
export const getMilitaryRankBonus = (rank) => {
    const normalBoni = Array.apply(null, Array(104))
        .map((x, index) => {
            const bonus = (index + 1) % 4 || index == 0 ? 0.25 : 0.5
            return bonus
        })
    const generalBoni = Array.apply(null, Array(11))
        .map((x, index) => {
            const bonus = (index + 1) % 6 || index == 0 ? 0.25 : 0.5
            return bonus
        })
    const commanderBoni = [0.5, 0.5, 0.5, 0.5]

    const allBoni = [...normalBoni, ...generalBoni, ...commanderBoni].reduce((acc, curr, index) => {
        acc.push(curr + (acc[index - 1] || 0));
        return acc;
    }, []);
    const boni = [0, ...allBoni]
    return boni.at(rank)

}

export const getOverflowDamage = (value) => {
    return value > 100 ? Math.floor(value - 100) * 4 : 0
}


export const getExpectedDamage = (skills, useEquipment = true) => {
    /* 
- Skills exceeding their cap now grant bonuses to other skills.
- Precision above 100%: overflow converted to +4 attack per overflow point.
- Critical chance above 100%: overflow converted to +4 critical damage per overflow point.
*/
    const {
        attack, precision, criticalChance, criticalDamages
    } = skills || {}

    const key = useEquipment ? "total" : "value"

    //console.log(key, attack[key], precision[key], criticalChance[key], criticalDamages[key])

    const { _attackOld, _precision, _criticalDamagesOld, _criticalChance } = {
        _attackOld: attack?.[key] || 0,
        _precision: precision?.[key] || 0,
        _criticalDamagesOld: criticalDamages?.[key] || 0,
        _criticalChance: criticalChance?.[key] || 0
    }


    const _attack = _attackOld + getOverflowDamage(_precision)
    const _criticalDamages = _criticalDamagesOld + getOverflowDamage(_criticalChance)

    const avgDmgMiss = (_attack / 2) * (1 - (_precision / 100))
    const avgHit = _attack * (_precision / 100) * (1 - (_criticalChance / 100))
    const avgCrit = (_attack + (_criticalDamages / 100) * _attack) * (_criticalChance / 100) * (_precision / 100)
    return avgDmgMiss + avgHit + avgCrit
    /* const avgDmgHit = (_attack * (_precision / 100)) + ((_criticalChance / 100) * (_criticalDamages/100) * _attack)
    return avgDmgMiss + avgDmgHit */
}

export const getExpectedAttackCost = (skills, useEquipment = true) => {
    const { dodge, armor } = skills || {}
    const key = useEquipment ? "total" : "value"
    const attackBaseCost = 10 // TODO: use gameConfig for this?

    const { _dodge, _armor } = {
        _dodge: dodge?.[key] || 0,
        _armor: armor?.[key] || 0
    }

    //const hpCost = Math.max(1, (attackBaseCost - ((_armor / 100) * attackBaseCost)))
    // no more armor cap patch version 0.24.0-beta
    const armorNew = _armor / (_armor + 40)
    const dodgeNew = _dodge / (_dodge + 40)
    const hpCost = attackBaseCost - ((armorNew /* / 100 */) * attackBaseCost)

    const avgDodge = hpCost * (1 - (dodgeNew /* / 100 */))
    //const avgNoDodge = attackBaseCost - ((_armor / 100) * attackBaseCost)

    return avgDodge //+ avgNoDodge//(attackBaseCost - ((_armor / 100) * attackBaseCost)) * (1 - (_dodge / 100))
}

export const getCanAttackTimes = (skills, useEquipment = true) => {
    //const { health: {currentBarValue: health } } = skills // what about currentBarValue vs total or value? use diffrent functions?
    // this is meh...
    const health = skills?.health?.currentBarValue || 0
    const attackCost = getExpectedAttackCost(skills, useEquipment)
    return Math.floor(health / attackCost)
}

export const getCanAttackTimesFood = (skills, useEquipment = true, food = 0) => {
    /* 
     - - Bread: 10 → 10% of max HP.
  - Steak: 20 → 15% of max HP.
  - Cooked Fish: 30 → 20% of max HP.
    */
    const hunger = skills?.hunger?.currentBarValue || 0
    const maxHealth = skills?.health?.value || 0
    const healthRegen = (maxHealth * (food / 100)) * Math.floor(hunger)
    //const healthRegen = Math.floor(hunger) * food
    const health = skills?.health?.currentBarValue || 0
    const totalHealth = healthRegen + health
    const attackCost = getExpectedAttackCost(skills, useEquipment)
    return Math.floor(totalHealth / attackCost)
}

export const getPrice = (money, quantity) => {
    return money / quantity
}

export const getTransactionUser = (users, id) => {
    const user = users.find(user => user._id == id)
    return user?.username
}

export const getObjKeyViaAttrPath = (obj, attrPath, key) => {

    let _obj = Object.assign({}, obj)

    for (let prop of attrPath) {
        if (!_obj.hasOwnProperty(prop)) {
            return undefined
        }
        _obj = Object.assign({}, { ..._obj[prop] })
    }
    return _obj[key]

}

export const sortByFoo = (items, attrPath, key) => {
    return [...items].sort((a, b) => {
        const foo = getObjKeyViaAttrPath(a, attrPath, key)
        const bar = getObjKeyViaAttrPath(b, attrPath, key)
        if (foo == undefined && bar == undefined) {
            return 0
        }
        if (foo == undefined) {
            return 1
        }
        if (bar == undefined) {
            return -1
        }
        return foo > bar ? -1 : foo < bar ? 1 : 0
    })
}

export const getDaysUntil = (date) => {
    const now = Date.now()
    const past = new Date(date)
    const day = (1000 * 60 * 60 * 24)

    return Math.floor((now - past) / day)
}

export const getHoursUntilLastOnline = (datetimestr) => {
    const now = Date.now()
    const past = new Date(datetimestr)
    return Math.ceil((now - past) / 3600000)
}