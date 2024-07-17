import React from 'react'
const PlayerCard = (props) => {

    const clickHandle = (player) => {
        props.onClickEvent(player)
    }
    return (
        <div className="border border-gray-300 rounded-lg p-4 text-center shadow-md bg-white m-4 min-w-[250px] cursor-pointer col-6 col-lg-2" onClick={() => clickHandle(props.player)}>
            <div className="w-10 h-10 rounded-full bg-gray-300 mx-auto items-center justify-center text-2xl mb-2">{props.player.name.split(" ")[0][0]}</div>
            <h2>{props.player.name}</h2>
            <p>{props.player.country}</p>
            <p>{props.player.role}</p>
        </div>
    )
}

export default PlayerCard