import {
    getExpectedDamage,
    getExpectedAttackCost,
} from "./fooStuff"


describe("fooStuff", () => {
    it.each([
        { skills: undefined, useEquipment: undefined, expected: 0 },
        { skills: {}, useEquipment: false, expected: 0 },
        {
            skills: {
                attack: { total: 100, value: 50 },
                precision: { total: 50, value: 50 },
                criticalDamages: { total: 100, value: 100 },
                criticalChance: { total: 10, value: 10 }
            }, useEquipment: true, expected: 95
        },
        {
            skills: {
                attack: { total: 100, value: 50 },
                precision: { total: 50, value: 50 },
                criticalDamages: { total: 100, value: 100 },
                criticalChance: { total: 10, value: 10 }
            }, useEquipment: false, expected: 47.5
        }
    ])('getExpectedDamage $skills $useEquipment returns $expected', ({ skills, useEquipment, expected }) => {
        expect(getExpectedDamage(skills, useEquipment)).toEqual(expected)
    })
    it.each([
        { skills: undefined, useEquipment: undefined, expected: 10 },
        { skills: {}, useEquipment: false, expected: 10 },
        {
            skills: {
                dodge: { total: 10, value: 0 },
                armor: { total: 50, value: 0 }
            }, useEquipment: true, expected: 4.5
        },
        {
            skills: {
                dodge: { total: 10, value: 0 },
                armor: { total: 10, value: 0 }
            }, useEquipment: false, expected: 10
        }
    ])('getExpectedAttackCost $skills $useEquipment returns $expected', ({ skills, useEquipment, expected }) => {
        expect(getExpectedAttackCost(skills, useEquipment)).toEqual(expected)
    })
})