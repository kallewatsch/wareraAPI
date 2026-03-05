export const getExpectedDamage = (skills, useEquipment = true) => {
    const {
        attack, precision, criticalChance, criticalDamages
    } = skills || {}

    const key = useEquipment ? "total" : "value"

    const { _attack, _precision, _criticalDamages, _criticalChance } = {
        _attack: attack?.[key] || 0,
        _precision: precision?.[key] || 0,
        _criticalDamages: criticalDamages?.[key] || 0,
        _criticalChance: criticalChance?.[key] || 0
    }

    const avgDmgMiss = (_attack / 2) * (_precision / 100)
    const avgHit = _attack * (_precision / 100)
    const avgCrit = (_attack + (_criticalDamages / 100) * _attack) * (_criticalChance / 100)

    return avgDmgMiss + avgHit + avgCrit

}

export const getExpectedAttackCost = (skills, useEquipment = true) => {
    const { dodge, armor } = skills || {}
    const key = useEquipment ? "total" : "value"
    const attackBaseCost = 10 // TODO: use gameConfig for this?

    const { _dodge, _armor } = {
        _dodge: dodge?.[key] || 0,
        _armor: armor?.[key] || 0
    }

    return (attackBaseCost - ((_armor / 100) * attackBaseCost)) * (1 - (_dodge / 100))
}

export const getCanAttackTimes = (skills, useEquipment = true) => {
    //const { health: {currentBarValue: health } } = skills // what about currentBarValue vs total or value? use diffrent functions?
    // this is meh...
    const health = skills?.health?.currentBarValue || 0
    const attackCost = getExpectedAttackCost(skills, useEquipment)
    return Math.floor(health / attackCost)
}

export const getPrice = (transaction) => {
    return transaction.money / transaction.quantity
}

export const getTransactionUser = (users, id) => {
    const user = users.find(user => user._id == id)
    return  user?.username
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