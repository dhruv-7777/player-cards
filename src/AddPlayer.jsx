import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PlayerContext } from './playerContextProvider.js';


const AddPlayer = ({ onAddPlayer }) => {
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
        <div className="md:container md:mx-auto text-center" style={{ marginTop: '100px' }}>
            <form onSubmit={handleSubmit}>
                <h1 className="font-bold text-4xl mb-4">{type === 'ADD' ? 'Add New Cricket Player' : 'Cricket Player Information'}</h1>
                <p className="text-base md:text-lg text-gray-600">{type === 'ADD' ? 'Fill out the form to add a new player to the list.' : 'Cricket player details.'}</p>
                <div className="text-center p-10 mx-auto shadow-custom rounded-lg">
                    <div className="flex flex-wrap">
                        <div className="w-full md:w-1/2 mb-5 text-left">
                            <label className="block mb-2 font-bold">Name</label>
                            <input type="text" className="max-w-2xl sm:max-w-xl w-full p-2 text-base border border-gray-300 rounded-md" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className="w-full md:w-1/2 mb-5 text-left">
                            <label className="block mb-2 font-bold">Country</label>
                            <input type="text" className="max-w-2xl sm:max-w-xl w-full p-2 text-base border border-gray-300 rounded-md" value={country} onChange={(e) => setCountry(e.target.value)} required />
                        </div>
                        <div className="w-full md:w-1/2 mb-2 text-left">
                            <label className="block mb-2 font-bold">Position</label>
                            <input type="text" className="max-w-2xl sm:max-w-xl w-full p-2 text-base border border-gray-300 rounded-md" value={role} onChange={(e) => setRole(e.target.value)} required />
                        </div>
                    </div>
                    <div className="px-4 py-2 text-base text-white rounded-lg cursor-pointer text-right">
                        <button className="px-4 py-2 text-base text-white bg-black rounded-lg cursor-pointer self-end" type="submit">{type === 'ADD' ? 'Add Player' : 'Update Player'}</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddPlayer;
