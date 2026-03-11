import { extendUser } from "./userStuff"
import {
    getExpectedDamage,
    getExpectedAttackCost,
    getCanAttackTimes,
    getHoursUntilLastOnline
} from "./fooStuff"


jest.mock('./fooStuff', () => ({
    __esModule: true,
    ...jest.requireActual('./fooStuff'),
    getExpectedDamage: jest.fn((skills, useEquipment = true) => 42),
    getExpectedAttackCost: jest.fn((skills, useEquipment = true) => 10),
    getCanAttackTimes: jest.fn((skills, useEquipment = true) => 69),
    getHoursUntilLastOnline: jest.fn((datetimestr) => NaN)
}))

describe("userStuff", () => {
    // this is stupid
    it.each([
        {
            user: {},
            expected: {
                extended: {
                    expDmg: 42,
                    expAttCost: 10,
                    canAttackTimes: 69,
                    availableDmg: 42 * 69,
                    hoursUntilLastOnline: NaN
                }
            }
        }
    ])("extendUser($user) returns $expected", ({ user, expected }) => {
        expect(extendUser(user)).toEqual(expected)
        expect(getExpectedDamage).toHaveBeenCalledWith({})
        expect(getExpectedAttackCost).toHaveBeenCalledWith({}, false)
        expect(getCanAttackTimes).toHaveBeenCalledWith({})
        expect(getHoursUntilLastOnline).toHaveBeenCalledWith(undefined)
    })
})