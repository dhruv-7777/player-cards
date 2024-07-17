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

