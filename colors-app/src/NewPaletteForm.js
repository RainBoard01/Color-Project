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
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { DraggableColorBox } from './DraggableColorBox';
import { arrayMoveImmutable } from 'array-move';
import { sortableContainer } from 'react-sortable-hoc';

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

const SortableContainer = sortableContainer(({ children }) => {
  return <div style={{ height: '100%'}}>{ children }</div>;
});

export const NewPaletteForm = props => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isDialogOpen,setIsDialogOpen] = useState(false);
    const [currentColor, setCurrentColor] = useState("");
    const [colors, setColors] = useState([]);
    const [currentName, setCurrentName] = useState("");
    const [currentPaletteName, setCurrentPaletteName] = useState("");
    
    useEffect(() => {
      ValidatorForm.addValidationRule("isColorNameUnique", value => colors.every(({ name }) => name.toLowerCase() !== currentName.toLowerCase()));
      ValidatorForm.addValidationRule("isColorUnique", value => colors.every(({ color }) => color !== currentColor));
      ValidatorForm.addValidationRule("isPaletteNameUnique", value => props.data.every(({ paletteName }) => paletteName.toLowerCase() !== currentPaletteName.toLowerCase()));
      return function cleanup() { 
        ValidatorForm.removeValidationRule("isColorNameUnique");
        ValidatorForm.removeValidationRule("isColorUnique");
        ValidatorForm.removeValidationRule("isPaletteNameUnique")
      }
    });

    const handleDrawerOpen = () => setIsDrawerOpen(true);
    const handleDrawerClose = () => setIsDrawerOpen(false);
    const handleDialogOpen = () => setIsDialogOpen(true);
    const handleDialogClose = () => setIsDialogOpen(false);
    const updateColor = color => setCurrentColor(color.hex);
    const addColor = () => { 
      setColors([...colors, {
        color: currentColor,
        name: currentName
      }]);
      setCurrentName("");
    };
    const handleNameChange = e => setCurrentName(e.target.value);
    const handleDialogChange = e => setCurrentPaletteName(e.target.value);
    const submitPalette = () => {
      const newPalette = {
        paletteName: currentPaletteName,
        id: currentPaletteName.toLowerCase().replace(/ /g, "-"),
        emoji: "🎈",
        colors: colors
      };
      handleDialogClose();
      setCurrentPaletteName("");
      props.savePalette(newPalette);
      props.history.push("/");
    }
    
    const deleteColor = name => setColors(colors.filter(color => color.name !== name));
    
    const onSortEnd = ({ oldIndex, newIndex }) => {
      setColors(arrayMoveImmutable(colors, oldIndex, newIndex));
    };

    return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" color='default' open={isDrawerOpen}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(isDrawerOpen && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
            <Typography variant='h6' color='inherit' noWrap>
              Persistent drawer
            </Typography>
            <Button variant='contained' color='primary' onClick={ handleDialogOpen }>
              Save Palette
            </Button>
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
        open={isDrawerOpen}
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
            onChange={ handleNameChange }
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
      <Main open={isDrawerOpen}>
        <DrawerHeader /> 
        <SortableContainer axis="xy" onSortEnd={ onSortEnd }>
          {colors.map((color, index) => (
            <DraggableColorBox
              color={ color.color }
              name={ color.name }
              key={ color.name }
              index={ index }
              deleteColor={ () => deleteColor(color.name) }
            />
          ))}
        </SortableContainer>
        <Dialog open={ isDialogOpen } onClose={ handleDialogClose }>
          <ValidatorForm onSubmit={ submitPalette }>
            <DialogTitle>Choose A Palette Name 🎨</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter a name for your new beautiful palette. It needs to be unique!
              </DialogContentText>
              <TextValidator 
                autoFocus
                value={ currentPaletteName }
                onChange={ handleDialogChange }
                margin="dense"
                label="Palette Name"
                fullWidth
                validators={['required',"isPaletteNameUnique"]}
                errorMessages={['This field is required', "Palette name already used"]}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={ handleDialogClose }
                variant="contained"
                color="secondary"
              >
                CANCEL
              </Button>
              <Button
                type='submit'
                variant="contained"
                color="primary"
              >
                SAVE
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </Main>
    </Box>
  );
}