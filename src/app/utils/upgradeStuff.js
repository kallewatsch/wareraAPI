export const getUpgradesData = (upgrades) => {
    return ({
        total: upgrades.length,
        pending: upgrades.filter(upgrade => upgrade.status == "pending").length,
        active: upgrades.filter(upgrade => upgrade.status == "active").length,
        disabled: upgrades.filter(upgrade => upgrade.status == "disabled").length,
    })
}