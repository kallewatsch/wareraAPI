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

