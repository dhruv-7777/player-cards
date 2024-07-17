import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayerContext } from './playerContextProvider.js';
import PlayerCard from './PlayerCard';
import { Button, Container, Typography, Grid } from '@mui/material'; // Import Material UI components

const PlayerDashboard = () => {
    const navigate = useNavigate();
    const { playerData } = useContext(PlayerContext);

    const handlePlayerCardClick = (player) => {
        navigate(`/${player.id}`, { state: { type: 'EDIT', player: player } });
    };

    const handleAddPlayerClick = () => {
        navigate('/create', { state: { type: 'ADD' } });
    };

    return (
        <Container maxWidth="xl" sx={{ textAlign: 'center', my: 10 }}>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <Typography variant="h4" mb={3} fontWeight="bold">
                        Cricket Player Listing
                    </Typography>
                    <Typography variant="body1" className="text-gray-600 text-base md:text-lg">
                        Explore the top cricket players from around the world.
                    </Typography>
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className="py-2 text-white rounded-lg"
                    onClick={handleAddPlayerClick}
                    sx={{ backgroundColor: 'black' }}
                >
                    Add New Player
                </Button>
            </div>
            <Grid container spacing={3}>
                {playerData.map((player) => (
                    <Grid item xs={12} sm={6} md={3} key={player.id}>
                        <PlayerCard onClickEvent={handlePlayerCardClick} player={player} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default PlayerDashboard;
