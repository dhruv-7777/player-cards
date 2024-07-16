import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayerContext } from './playerContextProvider.js';
import PlayerCard from './PlayerCard';
import "./styles/playerList.css";

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
        <div className="player-list container">
            <div className="d-flex justify-content-between home">
                <div>
                    <h1>Cricket Player Listing</h1>
                    <p className="explore">Explore the top cricket players from around the world.</p>
                </div>
                <button className="add-player-button" onClick={handleAddPlayerClick}>Add New Player</button>
            </div>
            <div className="row justify-content-center">
                {playerData.map(player => (
                    <PlayerCard onClickEvent={handlePlayerCardClick} key={player.id} player={player} />
                ))}
            </div>
        </div>
    );
};

export default PlayerDashboard;

