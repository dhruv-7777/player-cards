import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayerContext } from './playerContextProvider.js';
import PlayerCard from './PlayerCard';
const PlayerDashboard = () => {
    const navigate = useNavigate();
    const [typeOfEvent, setEvent] = useState("ADD");
    const [editPlayerDetails, setEditPlayer] = useState({});
    const { playerData } = useContext(PlayerContext);

    const handlePlayerCardClick = (player) => {
        setEvent("EDIT");
        setEditPlayer(player);
        navigate(`/${player.id}`, { state: { type: 'EDIT', player:player }});
    };
    const handleAddPlayerClick = () => {
        navigate('/create', { state: { type: 'ADD' } });
    };

    return (
        <div className="md:container md:mx-auto text-center p-10">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl mb-4 font-bold">Cricket Player Listing</h1>
                    <p className="text-base md:text-lg text-gray-600">Explore the top cricket players from around the world.</p>
                </div>
                <button className="mt-0 px-5 py-2 text-base text-white bg-black rounded-lg cursor-pointer" onClick={handleAddPlayerClick}>Add New Player</button>
            </div>
            <div className="row">
                {playerData.map(player => (
                    <PlayerCard onClickEvent={handlePlayerCardClick} key={player.id} player={player} />
                ))}
            </div>
        </div>
    );
};

export default PlayerDashboard;

