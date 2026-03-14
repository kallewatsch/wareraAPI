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
                expAttCost: getExpectedAttackCost({ ...user?.skills }, false),
                //canAttackTimes: getCanAttackTimes({ ...user?.skills }, false),
                //availableDmg: getExpectedDamage({ ...user?.skills }) * getCanAttackTimes({ ...user?.skills }, false),
                foods: {
                    noFood: {
                        canAttackTimes: getCanAttackTimesFood({ ...user?.skills }, false, 0),
                        availableDmg: getExpectedDamage({ ...user?.skills }) * getCanAttackTimesFood({ ...user?.skills }, false, 0),
                    },
                    bread: {
                        canAttackTimes: getCanAttackTimesFood({ ...user?.skills }, false, 10),
                        availableDmg: getExpectedDamage({ ...user?.skills }) * getCanAttackTimesFood({ ...user?.skills }, false, 10),
                    },
                    steak: {
                        canAttackTimes: getCanAttackTimesFood({ ...user?.skills }, false, 20),
                        availableDmg: getExpectedDamage({ ...user?.skills }) * getCanAttackTimesFood({ ...user?.skills }, false, 20),
                    },
                    fish: {
                        canAttackTimes: getCanAttackTimesFood({ ...user?.skills }, false, 30),
                        availableDmg: getExpectedDamage({ ...user?.skills }) * getCanAttackTimesFood({ ...user?.skills }, false, 30),
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