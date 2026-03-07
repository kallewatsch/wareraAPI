import React from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import SimpleStats from "../SimpleStats"
import IconsWithOverlay from "../util/IconsWithOverlay"
import Upgrade from "../util/Upgrade"
import { useSelector } from "react-redux"
import { GiBroadsword, GiCapitol, GiPeaceDove, GiShield, GiTrail } from "react-icons/gi"
import RegionUpgrades from "./RegionUpgrades"


export const Region = props => {

    const {
        _id, name, neighbors, country, countryCode, initialCountry, isCapital, isLinkedToCapital, ...otherProps
    } = props

    const { regions, countries, upgrades } = useSelector(state => state.app)

    const neighborItems = neighbors.map(n => ({ name: regions?.[n]?.name, countryCode: regions?.[n]?.countryCode }))
    const currentCountryCode = countries.find(cunt => cunt._id == country)?.code
    const regionUpgrades = upgrades.filter(upgrade => upgrade?.region == _id)

    const txt1 = isCapital && initialCountry == country ? 'Is Capital' : 'Is linked to Capital'
    const txts = [txt1, 'Bunker Level', 'Base Level', 'Pacification Center Level']

    return (
        <>
            <h1>
                <img src={`https://app.warera.io/images/flags/${currentCountryCode}.svg?v=16`} />
                {initialCountry != country && <span className="banned"><img src={`https://app.warera.io/images/flags/${countryCode}.svg?v=16`} /></span>}
                {name}
            </h1>

            <IconsWithOverlay providerValue={{ size: "2em" }} txts={txts}>
                {isCapital && initialCountry == country ?
                    <GiCapitol className='icon-gray' /> :
                    <GiTrail className={isLinkedToCapital ? 'icon-green' : 'icon-red'} />
                }
            </IconsWithOverlay>
            <RegionUpgrades regionUpgrades={regionUpgrades} />
            <ul>
                {neighborItems && neighborItems.map((item, i) => <li key={i}><img src={`https://app.warera.io/images/flags/${item.countryCode}.svg?v=16`} />{item.name}</li>)}
            </ul>
            <SimpleStats {...otherProps} />
        </>
    )

}

export default Region