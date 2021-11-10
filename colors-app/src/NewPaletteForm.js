import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { 
    Box,
    Drawer,
    CssBaseline,
    Toolbar,
    IconButton,
    Divider,
    Stack,
    Button,
    Typography
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { ChromePicker } from 'react-color';

const drawerWidth = 350;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export const NewPaletteForm = () => {
    const [open, setOpen] = useState(false);
    const [currentColor, setCurrentColor] = useState("teal");
    const [colors, setColors] = useState(["purple","#e15734"]);

    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);
    const updateColor = color => setCurrentColor(color.hex);
    const addColor = () => setColors([...colors, currentColor]);

    return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
            Persistent drawer
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Typography variant="h4">
            Design Your Palette
        </Typography>
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
            <Button variant="contained" color="secondary">
                CLEAR PALETTE
            </Button>
            <Button variant="contained" color="primary">
                RANDOM COLOR
            </Button>
        </Stack>
        <ChromePicker 
            color={ currentColor }
            onChangeComplete={ updateColor }
        />
        <Button
            variant="contained"
            color="primary"
            style={{background: currentColor}}
            onClick={ addColor }
        >
            ADD COLOR
        </Button>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <ul>
            { colors.map(color => 
                <li style={{backgroundColor: color}}>{ color }</li>
            ) }
        </ul>
      </Main>
    </Box>
  );
}
