import React, { createContext, useEffect, useState } from 'react';

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const [playerData, setPlayerData] = useState([]);

    useEffect(() => {
        // Load data from localStorage or fallback to initial data from data.json
        const localData = localStorage.getItem('players');
        if (localData) {
            setPlayerData(JSON.parse(localData));
        } else {
            // Fetch initial data from public/data.json
            fetch('/data.json')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setPlayerData(data);
                    localStorage.setItem('players', JSON.stringify(data));
                })
                .catch(error => console.error('Fetch error:', error));
        }
    }, []);

    const addPlayer = (player) => {
        const newPlayer = { ...player, id: Date.now(), initial: player.name.charAt(0) };
        const updatedPlayers = [...playerData, newPlayer];
        setPlayerData(updatedPlayers);
        localStorage.setItem('players', JSON.stringify(updatedPlayers));
    };

    const updatePlayer = (player) => {
        const updatedPlayer = { ...player, initial: player.name.charAt(0) };
        const updatedPlayers = playerData.map(p => p.id === player.id ? updatedPlayer : p);
        setPlayerData(updatedPlayers);
        localStorage.setItem('players', JSON.stringify(updatedPlayers));
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
