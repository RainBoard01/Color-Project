import React from 'react';
import { Drawer, IconButton, Stack, Typography, Button } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { styled } from '@mui/material/styles';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const drawerWidth = 350;

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: 'flex-end'
}));

const Div = styled('div')({
	display: 'flex',
	flexDirection: 'column',
	width: '90%',
	height: '100%',
	justifyContent: 'flex-start',
	alignItems: 'center',
	margin: '0 auto'
});

export const DrawerC = props => {
	const {
		isDrawerOpen,
		handleDrawerClose,
		setColors,
		generateRandomColor,
		isPaletteFull,
		currentColor,
		currentName,
		updateColor,
		addColor,
		handleNameChange
	} = props;

	return (
		<Drawer
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					width: drawerWidth,
					boxSizing: 'border-box'
				}
			}}
			variant='persistent'
			anchor='left'
			open={isDrawerOpen}
		>
			<DrawerHeader>
				<IconButton onClick={handleDrawerClose}>
					<ChevronLeftIcon />
				</IconButton>
			</DrawerHeader>
			<Div>
				<Typography variant='h5' style={{ marginBottom: '1rem' }}>
					Design Your Palette
				</Typography>
				<Stack
					direction='row'
					justifyContent='center'
					alignItems='center'
					spacing={2}
					style={{ marginBottom: '1rem' }}
				>
					<Button
						variant='contained'
						color='secondary'
						onClick={() => setColors([])}
					>
						CLEAR PALETTE
					</Button>
					<Button
						variant='contained'
						color='primary'
						onClick={generateRandomColor}
						disabled={isPaletteFull}
					>
						{[isPaletteFull ? 'PALETTE FULL' : 'RANDOM COLOR']}
					</Button>
				</Stack>
				<ChromePicker color={currentColor} onChangeComplete={updateColor} />
				<ValidatorForm
					onSubmit={addColor}
					style={{
						width: '100%',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center'
					}}
				>
					<TextValidator
						style={{
							width: '314.094px',
							marginTop: '1rem'
						}}
						label={isPaletteFull ? 'Palette Full' : 'Color Name'}
						value={currentName}
						onChange={handleNameChange}
						validators={['required', 'isColorUnique', 'isColorNameUnique']}
						errorMessages={[
							'This field is required',
							'Color already used',
							'Color name must be unique'
						]}
						disabled={isPaletteFull}
						variant='filled'
					/>
					<Button
						variant='contained'
						color='primary'
						style={{
							background: currentColor,
							width: '100%',
							padding: '1rem',
							marginTop: '1rem',
							fontSize: '1.5rem'
						}}
						type='submit'
						disabled={isPaletteFull}
					>
						{isPaletteFull ? 'PALETTE FULL' : 'ADD COLOR'}
					</Button>
				</ValidatorForm>
			</Div>
		</Drawer>
	);
};
