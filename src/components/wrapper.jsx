import React from "react";
import { Box, Typography, TextField, Stack, Button, Grid, InputAdornment } from '@mui/material';
import {AccountCircle, Key} from '@mui/icons-material'

const Wrapper = () => {
  return (
    <Box sx={{ backgroundColor: 'white', minHeight: 'auto', p: { xs: '1em', sm: '2em', md: '1em 4em' }, minWidth: { xs: '300px', sm: '500px', md: '700px' }, borderRadius: '15px', justifyContent: 'center', m: '0 1em' }}>
      <Typography sx={{ color: 'orangered', mt: '1em', fontSize: { xs: 25, md: 35 }, fontFamily: "Montserrat Bold" }}>
        User Login
      </Typography>
      <TextField
        sx={{ m: '2em 0 1em 0', backgroundColor: 'lightgray', color: 'white' }}
        fullWidth
        variant='outlined'
        margin='normal'
        label='Username'
        name='username'
        autoComplete='username'
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        type='password'
        sx={{ m: '0', backgroundColor: 'lightgray', color: 'white' }}
        fullWidth
        variant='outlined'
        margin='normal'
        label='Password'
        name='password'
        autoComplete='password'
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Key />
            </InputAdornment>
          ),
        }}
      />
      <Button
        variant='contained'
        sx={{
          margin: '1.3em 0 0 0',
          fontSize: 15,
          width: '100%',
          height: 40,
          borderRadius: 22,
          fontFamily: "Montserrat Bold",
          bgcolor: 'orangered'

        }}
        /* onClick={() => {
          return !emailError && login();
        }} */
        id="logInButton">
        Login
      </Button>
      <Grid container sx={{ m: '1em 0' }}>
        <Grid item xs={12} md={6}>
          <Button
            fullWidth
            color='primary'
            sx={{
              textAlign: 'right',
              fontSize: { xs: 11, md: 14 },
              fontFamily: "Montserrat Light",
              color: 'orangered'
            }}
            //onClick={() => setAuthState('FORGOT_PASSWORD')}
            id='forgotPasswordButton'>
            <strong>Forgot Password?</strong>
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            fullWidth

            sx={{
              textAlign: 'right',
              fontSize: { xs: 11, md: 14 },
              fontFamily: "Montserrat Light",
              color: 'orangered'
            }}
            //onClick={() => setAuthState('FORGOT_PASSWORD')}
            id='forgotPasswordButton'>
            <strong>Create Account</strong>
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Wrapper;