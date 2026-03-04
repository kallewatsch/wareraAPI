import React from "react"


/* 

{
                    "_id": "69a31a5c82916de978631ed1",
                    "countries": [
                        "6813b6d446e731854c7ac79c",
                        "6813b6d446e731854c7ac7f2"
                    ],
                    "priority": "2",
                    "data": {
                        "type": "countryMoneyTransfer",
                        "money": 500,
                        "countries": [
                            "6813b6d446e731854c7ac79c",
                            "6813b6d446e731854c7ac7f2"
                        ]
                    },
                    "createdAt": "2026-02-28T16:39:56.992Z",
                    "updatedAt": "2026-02-28T16:39:56.992Z",
                    "__v": 0
                },

*/

export const MoneyTransfer = (props) => {

    const { sender, receiver, money, date } = props

    console.log("MoneyTransfer", props)

    return (
        <div>
            {sender.name} sent {money} to {receiver.name} on {date}
        </div>
    )

}


export default MoneyTransfer