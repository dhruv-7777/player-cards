// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { PlayerContext } from './playerContextProvider.js';


// const AddPlayer = ({ onAddPlayer }) => {
//     const navigate = useNavigate();
//     const { addPlayer, updatePlayer } = useContext(PlayerContext);
//     const location = useLocation();
//     const { type, player } = location.state || { type: 'ADD', player: {} };
//     const [name, setName] = useState('');
//     const [country, setCountry] = useState('');
//     const [role, setRole] = useState('');

//     useEffect(() => {
//         if (type === 'EDIT' && player) {
//             setName(player.name);
//             setCountry(player.country);
//             setRole(player.role);
//         }
//     }, [type, player]);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const newPlayer = {
//             id: type === 'EDIT' ? player.id : undefined,
//             name,
//             country,
//             role
//         };
//         if (type === "ADD") {
//             addPlayer(newPlayer);
//         } else {
//             updatePlayer(newPlayer);
//         }
//         navigate('/');
//     };

//     return (
//         <div className="md:container md:mx-auto text-center" style={{ marginTop: '100px' }}>
//             <form onSubmit={handleSubmit}>
//                 <h1 className="font-bold text-4xl mb-4">{type === 'ADD' ? 'Add New Cricket Player' : 'Cricket Player Information'}</h1>
//                 <p className="text-base md:text-lg text-gray-600">{type === 'ADD' ? 'Fill out the form to add a new player to the list.' : 'Cricket player details.'}</p>
//                 <div className="text-center p-10 mx-auto shadow-custom rounded-lg">
//                     <div className="flex flex-wrap">
//                         <div className="w-full md:w-1/2 mb-5 text-left">
//                             <label className="block mb-2 font-bold">Name</label>
//                             <input type="text" className="max-w-2xl sm:max-w-xl w-full p-2 text-base border border-gray-300 rounded-md" value={name} onChange={(e) => setName(e.target.value)} required />
//                         </div>
//                         <div className="w-full md:w-1/2 mb-5 text-left">
//                             <label className="block mb-2 font-bold">Country</label>
//                             <input type="text" className="max-w-2xl sm:max-w-xl w-full p-2 text-base border border-gray-300 rounded-md" value={country} onChange={(e) => setCountry(e.target.value)} required />
//                         </div>
//                         <div className="w-full md:w-1/2 mb-2 text-left">
//                             <label className="block mb-2 font-bold">Position</label>
//                             <input type="text" className="max-w-2xl sm:max-w-xl w-full p-2 text-base border border-gray-300 rounded-md" value={role} onChange={(e) => setRole(e.target.value)} required />
//                         </div>
//                     </div>
//                     <div className="px-4 py-2 text-base text-white rounded-lg cursor-pointer text-right">
//                         <button className="px-4 py-2 text-base text-white bg-black rounded-lg cursor-pointer self-end" type="submit">{type === 'ADD' ? 'Add Player' : 'Update Player'}</button>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default AddPlayer;

import React, { useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TextField, Button, Container, Typography, Box, InputLabel } from '@mui/material';
import { PlayerContext } from './playerContextProvider.js';
import Grid from '@mui/material/Unstable_Grid2';

// Define the schema using zod
const playerSchema = z.object({
    name: z.string().min(2, "Name is required, Minimum Character is 2"),
    country: z.string().min(2, "Country is required, Minimum Character is 2"),
    role: z.string().min(2, "Role is required, Minimum Character is 2")
});

const AddPlayer = () => {
    const navigate = useNavigate();
    const { addPlayer, updatePlayer } = useContext(PlayerContext);
    const location = useLocation();
    const { type, player } = location.state || { type: 'ADD', player: {} };

    const { handleSubmit, control, reset } = useForm({
        resolver: zodResolver(playerSchema),
        defaultValues: {
            name: '',
            country: '',
            role: ''
        }
    });

    useEffect(() => {
        if (type === 'EDIT' && player) {
            reset({
                name: player.name,
                country: player.country,
                role: player.role
            });
        }
    }, [type, player, reset]);

    const onSubmit = (data) => {
        const newPlayer = {
            id: type === 'EDIT' ? player.id : undefined,
            ...data
        };
        if (type === "ADD") {
            addPlayer(newPlayer);
        } else {
            updatePlayer(newPlayer);
        }
        navigate('/');
    };

    return (
        <Container maxWidth="xl" sx={{ mt: 8, textAlign: 'center' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="h4" mb={3} fontWeight="bold" >
                    {type === 'ADD' ? 'Add New Cricket Player' : 'Cricket Player Information'}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    {type === 'ADD' ? 'Fill out the form to add a new player to the list.' : 'Cricket player details.'}
                </Typography>
                <Box sx={{ mt: 4, p: 4, boxShadow: 3, borderRadius: 2 }}>
                    <Grid container spacing={2}>
                        <Grid xs={6}>
                            <InputLabel sx={{ textAlign: 'left', fontWeight: 'bold' }}>Name</InputLabel>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        error={!!error}
                                        helperText={error ? error.message : null}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid xs={6}>
                            <InputLabel sx={{ textAlign: 'left', fontWeight: 'bold' }} fontWeight="bold">Country</InputLabel>
                            <Controller
                                name="country"
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        error={!!error}
                                        helperText={error ? error.message : null}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid xs={6}>
                            <InputLabel sx={{ textAlign: 'left', fontWeight: 'bold' }} fontWeight="bold">Position</InputLabel>
                            <Controller
                                name="role"
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        error={!!error}
                                        helperText={error ? error.message : null}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 2, textAlign: 'right' }}>
                        <Button variant="contained" color="primary" type="submit" sx={{ backgroundColor: 'black' }}>
                            {type === 'ADD' ? 'Add Player' : 'Update Player'}
                        </Button>
                    </Box>
                </Box>
            </form>
        </Container>
    );
};

export default AddPlayer;

