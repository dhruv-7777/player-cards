import React, { createContext, useEffect, useState } from 'react';

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const [playerData, setPlayerData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/players')
            .then(response => response.json())
            .then(data => setPlayerData(data));
    }, []);

    const addPlayer = (player) => {
        const newPlayer = { ...player, initial: player.name.charAt(0) };
        fetch('http://localhost:5000/players', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPlayer)
        })
        .then(response => response.json())
        .then(data => setPlayerData([...playerData, data]));
    };

    const updatePlayer = (player) => {
        const updatedPlayer = { ...player, initial: player.name.charAt(0) };
        fetch(`http://localhost:5000/players/${player.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedPlayer)
        })
        .then(response => response.json())
        .then(data => {
            const updatedPlayers = playerData.map(p => p.id === data.id ? data : p);
            setPlayerData(updatedPlayers);
        });
    };

    const providerProps = {
        playerData,
        addPlayer,
        updatePlayer
    };

    return (
        <PlayerContext.Provider value={providerProps}>
            {props.children}
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;
