import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function Login() {
  const [errorMessage, setErrorMessage] = React.useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const credentials = { username: data.get('username'), password: data.get('password') }

    return fetch(`http://localhost:5000/api/authUser`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    }).then(res => res.json()).then(data => {
      console.log(data)
      if (data.message === "match") {
        const userData = data.user;
        sessionStorage.setItem('userToken', userData.token);
        window.location.reload();
      } else {
        if (data.message === "wrong_password") {
          setErrorMessage("Het opgegeven wachtwoord is onjuist.");
        } else if (data.message === "no_user_found") {
          setErrorMessage(`Er is geen account gevonden met deze gebuikersnaam (${credentials.username}).`);
        }
      }
    }).catch(error => {
      console.log(error.message);
      return null;
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className='Login_Container'>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
          <Typography component="h1" variant="h12" marginBottom={5}>
            MRP
          </Typography>
          <Typography textAlign={"center"} fontSize={14}>
            Welkom op het inlogscherm voor het <b>Uren Registratie</b> scherm voor MRP.
          </Typography>

          {errorMessage ? <Typography textAlign={"center"} margin={2} color={"red"} fontSize={14}>
            {errorMessage}
          </Typography> : null}
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Gebruikersnaam"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Wachtwoord"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color='success'
              sx={{ mt: 3, mb: 2 }}
            >
              Inloggen
            </Button>
          </Box>
          <Typography textAlign={"center"} fontSize={12} fontWeight={'bold'}>© s0me1</Typography>
        </Box>
      </div>
    </Container>
  );
}