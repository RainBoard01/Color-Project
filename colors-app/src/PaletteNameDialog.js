import React from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle
} from '@mui/material';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

export const PaletteNameDialog = props => {
	const {
		isDialogOpen,
		handleDialogChange,
		savePaletteName,
		currentPaletteName,
		handleDialogClose
	} = props;

	return (
		<Dialog open={isDialogOpen} onClose={handleDialogClose}>
			<ValidatorForm onSubmit={savePaletteName}>
				<DialogTitle>Choose A Palette Name 🎨</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Please enter a name for your new beautiful palette. It needs to be unique!
					</DialogContentText>
					<TextValidator
						autoFocus
						value={currentPaletteName}
						onChange={handleDialogChange}
						margin='dense'
						label='Palette Name'
						fullWidth
						validators={['required', 'isPaletteNameUnique']}
						errorMessages={['This field is required', 'Palette name already used']}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleDialogClose} variant='contained' color='secondary'>
						CANCEL
					</Button>
					<Button type='submit' variant='contained' color='primary'>
						SAVE
					</Button>
				</DialogActions>
			</ValidatorForm>
		</Dialog>
	);
};
