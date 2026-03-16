import { getExpectedAttackCost, getExpectedDamage } from "./fooStuff"

const simulateAttackCost = (armor, dodge) => {
    const x = Math.random()
    switch (true) {
        case x >= 1 - (dodge / 100):
            return 0
        default:
            return 10 - ((armor / 100) * 10)
    }
}

const simulateAttackDamage = ({ criticalChance, precision, criticalDamages, attack }) => {
    const x = Math.random()
    const y = Math.random()
    switch (true) {
        case x >= 1 - (precision / 100):
            switch (true) {
                case y >= 1 - (criticalChance / 100):
                    return attack + ((criticalDamages / 100) * attack)
                default:
                    return attack
            }
        default:
            return attack / 2
    }
}

describe("simulate Attack Cost", () => {
    it("getExpectedAttackCost returns close value after 1000 runs", () => {
        const armor = 90
        const dodge = 79
        const runs = 1000000
        const exp = runs * getExpectedAttackCost({ armor: { total: armor }, dodge: { total: dodge } }, true)
        let actual = 0
        const A = /* runs *  */(dodge / 100)
        const B = 1 - (dodge / 100)
        const stdDeviation = Math.sqrt(runs * (A + B))
        for (let i = 0; i < runs; i++) {
            actual += simulateAttackCost(armor, dodge)
        }
        expect(exp).toBeGreaterThanOrEqual(actual - stdDeviation)
        expect(exp).toBeLessThanOrEqual(actual + stdDeviation)
    })
})

describe("simulate Attack Damage", () => {
    it("getExpectedDamage", () => {
        const precision = 50
        const criticalChance = 10
        const attack = 100
        const criticalDamages = 200
        const runs = 10000000
        const exp = runs * getExpectedDamage({
            precision: { total: precision },
            criticalChance: { total: criticalChance },
            attack: { total: attack },
            criticalDamages: { total: criticalDamages }
        }
        )
        const A = (1 - (precision / 100)) * attack / 2
        const B = (precision / 100) * (attack + ((criticalDamages / 100) * attack)) * (criticalChance / 100)
        const C = (precision / 100) * attack * (1 - (criticalChance / 100))
        const stdDeviation = Math.sqrt(runs * (A + B + C))
        console.log(A, B, C, stdDeviation)
        let actual = 0
        for (let i = 0; i < runs; i++) {
            actual += simulateAttackDamage({ criticalChance, precision, attack, criticalDamages })
        }
        expect(exp).toBeGreaterThanOrEqual(actual - stdDeviation)
        expect(exp).toBeLessThanOrEqual(actual + stdDeviation)
    })

})