import {
    getExpectedDamage,
    getExpectedAttackCost,
    getCanAttackTimes,
    getCanAttackTimesFood,
    getHoursUntilLastOnline
} from "./fooStuff"

export const extendUser = (user) => {

    return Object.assign(
        {},
        { ...user },
        {
            extended: {
                expDmg: getExpectedDamage({ ...user?.skills }),
                expAttCost: getExpectedAttackCost({ ...user?.skills }, true),
                //canAttackTimes: getCanAttackTimes({ ...user?.skills }, true),
                //availableDmg: getExpectedDamage({ ...user?.skills }) * getCanAttackTimes({ ...user?.skills }, true),
                foods: {
                    noFood: {
                        canAttackTimes: getCanAttackTimesFood({ ...user?.skills }, true, 0),
                        availableDmg: getExpectedDamage({ ...user?.skills }) * getCanAttackTimesFood({ ...user?.skills }, true, 0),
                    },
                    bread: {
                        canAttackTimes: getCanAttackTimesFood({ ...user?.skills }, true, 10),
                        availableDmg: getExpectedDamage({ ...user?.skills }) * getCanAttackTimesFood({ ...user?.skills }, true, 10),
                    },
                    steak: {
                        canAttackTimes: getCanAttackTimesFood({ ...user?.skills }, true, 20),
                        availableDmg: getExpectedDamage({ ...user?.skills }) * getCanAttackTimesFood({ ...user?.skills }, true, 20),
                    },
                    fish: {
                        canAttackTimes: getCanAttackTimesFood({ ...user?.skills }, true, 30),
                        availableDmg: getExpectedDamage({ ...user?.skills }) * getCanAttackTimesFood({ ...user?.skills }, true, 30),
                    }
                },
                hoursUntilLastOnline: getHoursUntilLastOnline(user?.dates?.lastConnectionAt)
            }
        }
    )

}

export const getUsersAvailableDmg = (users, food="noFood") => {
    return Math.round(users.reduce((acc, curr) => acc + curr.extended.foods[food]?.availableDmg || 0, 0))
}