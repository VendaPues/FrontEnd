import * as React from 'react';
import { AppBar } from '@mui/material';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import  MenuIcon  from '@mui/icons-material/Menu';


export const NavBar = () => {

    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
          <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <img src="./logo.svg"></img>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Venda Pues!
            </Typography>
            <Button color="inherit">Inicio de sesión</Button>
          </Toolbar>
        </AppBar>
      </Box>

    );

}