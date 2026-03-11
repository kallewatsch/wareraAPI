import { extendUser, getUsersAvailableDmg } from "./userStuff"
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
    it.each([
        { users: [], expected: 0 },
        {
            users: [
                { extended: { availableDmg: 20 } }, { extended: { availableDmg: 22 } }
            ],
            expected: 42
        }
    ])("getUsersAvailableDmg($users) returns $expected", ({ users, expected }) => {
        expect(getUsersAvailableDmg(users)).toEqual(expected)
    })
})