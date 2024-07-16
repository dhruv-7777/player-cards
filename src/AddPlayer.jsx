import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PlayerContext } from './playerContextProvider.js';
import './styles/addPlayer.css';

const AddPlayer = ({ onAddPlayer }) => {
    console.log("Prop", onAddPlayer)
    const navigate = useNavigate();
    const { addPlayer, updatePlayer } = useContext(PlayerContext);
    const location = useLocation();
    const { type, player } = location.state || { type: 'ADD', player: {} };

    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        if (type === 'EDIT' && player) {
            setName(player.name);
            setCountry(player.country);
            setRole(player.role);
        }
    }, [type, player]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPlayer = {
            id: type === 'EDIT' ? player.id : undefined,
            name,
            country,
            role
        };
        if (type === "ADD") {
            addPlayer(newPlayer);
        } else {
            updatePlayer(newPlayer);
        }
        navigate('/');
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>{type === 'ADD' ? 'Add New Cricket Player' : 'Cricket Player Information'}</h1>
                <p>{type === 'ADD' ? 'Fill out the form to add a new player to the list.' : 'Cricket player details.'}</p>
                <div className="add-player-form">
                    <div className="row">
                        <div className="col-6 form_groups">
                            <label>Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className="col-6 form_groups">
                            <label>Country</label>
                            <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required />
                        </div>
                        <div className="col-6 form_groups">
                            <label>Position</label>
                            <input type="text" value={role} onChange={(e) => setRole(e.target.value)} required />
                        </div>
                    </div>
                    <div className="add_update_btn">
                        <button className="add-update-player-button" type="submit">{type === 'ADD' ? 'Add Player' : 'Update Player'}</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddPlayer;
