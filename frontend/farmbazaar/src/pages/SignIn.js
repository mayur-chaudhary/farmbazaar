import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from '../components/NavBars/Footer';
import NavBarAuth from '../components/NavBars/NavBarAuth';

const defaultTheme = createTheme();

export default function SignIn() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');
    
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }), // Pass email as username
      });

      if (response.ok) {
        const data = await response.json(); // Parse response as JSON
        // Store only necessary user data in session storage
        const userData = {
          id: data.id,
          username: data.username,
          fname: data.fname,
          lname: data.lname,
          phno: data.phno,
          address: data.address,
          role: data.role,
          active: data.active,
          isLoggedIn: true, // Add isLoggedIn flag
        };
        sessionStorage.setItem('userData', JSON.stringify(userData));
        // Redirect based on user role
        redirectToRole(data.role); // Assuming the response includes a role property
      } else {
        // Handle authentication failure
        console.error('Authentication failed');
      }
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  };

  const redirectToRole = (role) => {
    switch (role) {
      case 'ADMIN':
        window.location.href = '/';
        break;
      case 'FARMER':
        window.location.href = '/farmer-dashboard';
        break;
      case 'CUSTOMER':
        window.location.href = '/customer-dashboard';
        break;
      case 'DELIVERY_PARTNER':
        window.location.href = '/delivery-partner-dashboard';
        break;
      default:
        console.error('Unknown role:', role);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <NavBarAuth/>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Footer />
      </Container>
    </ThemeProvider>
  );
}
