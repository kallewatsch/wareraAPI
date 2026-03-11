import {
    getExpectedDamage,
    getExpectedAttackCost,
    getCanAttackTimes,
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
                canAttackTimes: getCanAttackTimes({ ...user?.skills }),
                availableDmg: getExpectedDamage({ ...user?.skills }) * getCanAttackTimes({ ...user?.skills }),
                hoursUntilLastOnline: getHoursUntilLastOnline(user?.dates?.lastConnectionAt)
            }
        }
    )

}