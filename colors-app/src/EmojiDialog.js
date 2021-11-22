import React from 'react';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import { Dialog, DialogTitle } from '@mui/material';

export const EmojiDialog = props => {
	const { isEmojiOpen, handleEmojiClose, submitPalette } = props;
	return (
		<Dialog open={isEmojiOpen} onClose={handleEmojiClose}>
			<DialogTitle>Choose A Emoji 😎</DialogTitle>
			<Picker native={true} onSelect={emoji => submitPalette(emoji)} />
		</Dialog>
	);
};
