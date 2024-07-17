import React from 'react';
import { Typography, Avatar, Paper } from '@mui/material';

const PlayerCard = (props) => {
    const { player, onClickEvent } = props;

    const clickHandle = () => {
        onClickEvent(player);
    };

    return (
        <Paper
            className="border border-gray-300 rounded-lg p-4 text-center shadow-md bg-white m-4 min-w-[350px] md:min-w-[245px] cursor-pointer col-6 col-lg-2"
            onClick={clickHandle}
            sx={{ '&:hover': { backgroundColor: '#f0f0f0' } }} >
            <Avatar
                sx={{
                    width: 56,
                    height: 56,
                    color: '#000',
                    backgroundColor: '#e8e8e8',
                    mx: 'auto',
                    mb: 2,
                }}
            >
                {player.name.split(' ')[0][0]}
            </Avatar>
            <Typography variant="h6" gutterBottom>
                {player.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
                {player.country}
            </Typography>
            <Typography variant="body1" gutterBottom>
                {player.role}
            </Typography>
        </Paper>
    );
};

export default PlayerCard;
