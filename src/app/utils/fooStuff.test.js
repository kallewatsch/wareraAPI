import {
    getExpectedDamage,
    getExpectedAttackCost,
    getCanAttackTimes,
    getPrice,
    getTransactionUser,
    getObjKeyViaAttrPath,
    sortByFoo
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
        },
        {
            skills: {
                attack: { total: 100, value: 10 },
                precision: { total: 50, value: 100 },
                criticalDamages: { total: 100, value: 100 },
                criticalChance: { total: 10, value: 100 }
            }, useEquipment: false, expected: 20
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
    ])
        ('getExpectedAttackCost $skills $useEquipment returns $expected',
            ({ skills, useEquipment, expected }) => {
                expect(getExpectedAttackCost(skills, useEquipment)).toEqual(expected)
            })
    it.each([
        { skills: undefined, useEquipment: undefined, expected: 0 }
    ])
        (`getCanAttackTimes($skills, $useEquipment returns $expected)`,
            ({ skills, useEquipment, expected }) => {
                expect(getCanAttackTimes(skills, useEquipment)).toEqual(expected)
            })
    it.each([
        { money: undefined, quantity: undefined, expected: NaN },
        { money: 2, quantity: undefined, expected: NaN },
        { money: undefined, quantity: 1, expected: NaN },
        { money: 10, quantity: 0, expected: Infinity },
        { money: 100, quantity: 10, expected: 10 },
        { money: 90, quantity: 3, expected: 30 },
    ])
        ("getPrice($money, $quantity) returns $expected",
            ({ money, quantity, expected }) => {
                expect(getPrice(money, quantity)).toEqual(expected)
            })
    it.each([
        { users: [], id: 'bla', expected: undefined },
        { users: [{ _id: 'bla', username: 'foo' }], id: 'bla', expected: 'foo' },
    ])
        ("getTransactionUser($users, $id) returns $expected",
            ({ users, id, expected }) => {
                expect(getTransactionUser(users, id)).toEqual(expected)
            })
    it.each([
        { obj: {}, attrPath: [], key: "bla", expected: undefined },
        { obj: { foo: {} }, attrPath: ["foo", "bar"], key: "bla", expected: undefined },
        { obj: { foo: { bar: {} } }, attrPath: ["foo", "bar"], key: "bla", expected: undefined },
        { obj: { foo: { bar: { bla: 42 } } }, attrPath: ["foo", "bar"], key: "bla", expected: 42 },
    ])
        ("getObjKeyViaAttrPath($obj, $attrPath, $key) returns $expected",
            ({ obj, attrPath, key, expected }) => {
                expect(getObjKeyViaAttrPath(obj, attrPath, key)).toEqual(expected)
            })
    it.each([
        { items: [], attrPath: [], key: undefined, expected: [] },
        { items: [{ bla: 1 }, { bla: 2 }], attrPath: [], key: "baz", expected: [{ bla: 1 }, { bla: 2 }] },
        { items: [{ bla: 1 }, { bla: 2, baz: "x" }], attrPath: [], key: "baz", expected: [{ bla: 2, baz: "x" }, { bla: 1 }] },
        { items: [{ bla: 1, baz: "x" }, { bla: 2 }], attrPath: [], key: "baz", expected: [{ bla: 1, baz: "x" }, { bla: 2 }] },
        { items: [{ bla: 1 }, { bla: 2 }], attrPath: [], key: "bla", expected: [{ bla: 2 }, { bla: 1 }] },
        { items: [{ bla: 11 }, { bla: 2 }], attrPath: [], key: "bla", expected: [{ bla: 11 }, { bla: 2 }] },
        { items: [{ bla: 1 }, { bla: 1 }], attrPath: [], key: "bla", expected: [{ bla: 1 }, { bla: 1 }] },
    ])
        ("sortByFoo($items, $attrPath, $key) returns $expected", ({ items, attrPath, key, expected }) => {
            expect(sortByFoo(items, attrPath, key)).toEqual(expected)
        })
})