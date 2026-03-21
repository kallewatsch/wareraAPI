import { extendUser, getUsersAvailableDmg } from "./userStuff"
import {
    getExpectedDamage,
    getExpectedAttackCost,
    getCanAttackTimesFood,
    getHoursUntilLastOnline
} from "./fooStuff"


jest.mock('./fooStuff', () => ({
    __esModule: true,
    ...jest.requireActual('./fooStuff'),
    getExpectedDamage: jest.fn((skills, useEquipment = true) => 42),
    getExpectedAttackCost: jest.fn((skills, useEquipment = true) => 10),
    getCanAttackTimesFood: jest.fn((skills, useEquipment = true, food=0) => 69),
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
                    foods: {
                        noFood: {
                            canAttackTimes: 69,
                            availableDmg: 42 * 69,
                        }
                    },

                    hoursUntilLastOnline: NaN
                }
            }
        }
    ])("extendUser($user) returns $expected", ({ user, expected }) => {
        //expect(extendUser(user)).toEqual(expected)
        extendUser(user)
        expect(getExpectedDamage).toHaveBeenCalledWith({})
        expect(getExpectedAttackCost).toHaveBeenCalledWith({}, true)
        expect(getCanAttackTimesFood).toHaveBeenCalledWith({}, true, 0)
        expect(getHoursUntilLastOnline).toHaveBeenCalledWith(undefined)
    })
    it.each([
        { users: [], expected: 0 },
        {
            users: [
                { extended: { foods: { noFood: { availableDmg: 20 } } } },
                { extended: { foods: { noFood: { availableDmg: 22 } } } }
            ],
            expected: 42
        }
    ])("getUsersAvailableDmg($users) returns $expected", ({ users, expected }) => {
        expect(getUsersAvailableDmg(users)).toEqual(expected)
    })
})