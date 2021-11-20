import React, { useState, useEffect } from 'react';
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
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { DraggableColorBox } from './DraggableColorBox';

const drawerWidth = 350;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    height: "calc(100vh - 64px)",
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

export const NewPaletteForm = props => {
    const [open, setOpen] = useState(false);
    const [currentColor, setCurrentColor] = useState("");
    const [colors, setColors] = useState([]);
    const [currentName, setCurrentName] = useState("");

    useEffect(() => {
      ValidatorForm.addValidationRule("isColorNameUnique", value => colors.every(({ name }) => name.toLowerCase() !== currentName.toLowerCase()));
      ValidatorForm.addValidationRule("isColorUnique", value => colors.every(({ color }) => color !== currentColor));
      return function cleanup() { 
        ValidatorForm.removeValidationRule("isColorNameUnique");
        ValidatorForm.removeValidationRule("isColorUnique");
      }
    });

    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);
    const updateColor = color => setCurrentColor(color.hex);
    const addColor = () => { 
      setColors([...colors, {
        color: currentColor,
        name: currentName
      }]);
      setCurrentName("");
      // setCurrentColor("");
    };
    const handleChange = e => setCurrentName(e.target.value);
    const submitPalette = () => {
      const newPalette = {
        paletteName: "Diego Se La Come",
        id: "diego-se-la-come",
        emoji: "👌",
        colors: colors
      };
      props.savePalette(newPalette);
      props.history.push("/");
    }

    return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" color='default' open={open}>
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
            <Typography variant='h6' color='inherit' noWrap>
              Persistent drawer
            </Typography>
            <Button variant='contained' color='primary' onClick={ submitPalette }>Save Palette</Button>
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
        <ValidatorForm
          onSubmit={ addColor }
        >
          <TextValidator
            label="Color Name"
            value={ currentName }
            onChange={ handleChange }
            validators={['required', 'isColorUnique','isColorNameUnique']}
            errorMessages={['This field is required','Color already used','Color name must be unique']}
          />
          <Button
            variant="contained"
            color="primary"
            style={{background: currentColor}}
            type='submit'
          >
            ADD COLOR
          </Button>
        </ValidatorForm>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        { colors.map(color => 
            <DraggableColorBox color={ color.color } name={ color.name } key={ color.name }/>
        )}
      </Main>
    </Box>
  );
}
