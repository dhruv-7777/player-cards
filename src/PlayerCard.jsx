// import React from 'react'
// const PlayerCard = (props) => {

//     const clickHandle = (player) => {
//         props.onClickEvent(player)
//     }
//     return (
//         <div className="border border-gray-300 rounded-lg p-4 text-center shadow-md bg-white m-4 min-w-[250px] cursor-pointer col-6 col-lg-2" onClick={() => clickHandle(props.player)}>
//             <div className="w-10 h-10 rounded-full bg-gray-300 mx-auto items-center justify-center text-2xl mb-2">{props.player.name.split(" ")[0][0]}</div>
//             <h2>{props.player.name}</h2>
//             <p>{props.player.country}</p>
//             <p>{props.player.role}</p>
//         </div>
//     )
// }

// export default PlayerCard

import React from 'react';
import { Typography, Avatar, Paper } from '@mui/material'; // Importing Material UI components

const PlayerCard = (props) => {
    const { player, onClickEvent } = props;

    const clickHandle = () => {
        onClickEvent(player);
    };

    return (
        <Paper
            className="border border-gray-300 rounded-lg p-4 text-center shadow-md bg-white m-4 min-w-[350px] md:min-w-[245px] cursor-pointer col-6 col-lg-2"
            onClick={clickHandle}
            sx={{ '&:hover': { backgroundColor: '#f0f0f0' } }} // Hover effect using MUI sx prop
        >
            <Avatar
                sx={{
                    width: 56,
                    height: 56,
                    color: '#000',
                    backgroundColor: '#e8e8e8', // Default background color for Avatar
                    mx: 'auto',
                    mb: 2,
                }}
            >
                {player.name.split(' ')[0][0]} {/* Displaying initials */}
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
