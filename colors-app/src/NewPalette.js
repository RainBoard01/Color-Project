import React from 'react';
import { styled } from '@mui/material/styles';
import { DraggableColorBox } from './DraggableColorBox';
import { PaletteNameDialog } from './PaletteNameDialog';
import { EmojiDialog } from './EmojiDialog';
import { sortableContainer } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';

const drawerWidth = 350;

const Main = styled('main', { shouldForwardProp: prop => prop !== 'open' })(
	({ theme, open }) => ({
		flexGrow: 1,
		height: 'calc(100vh - 64px)',
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		marginLeft: `-${drawerWidth}px`,
		...(open && {
			transition: theme.transitions.create('margin', {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen
			}),
			marginLeft: 0
		})
	})
);

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: 'flex-end'
}));

const SortableContainer = sortableContainer(({ children }) => {
	return <div style={{ height: '100%' }}>{children}</div>;
});

export const NewPalette = props => {
	const {
		colors,
		setColors,
		isDrawerOpen,
		deleteColor,
		isDialogOpen,
		handleDialogClose,
		submitPalette,
		currentPaletteName,
		handleDialogChange,
		isEmojiOpen,
		savePaletteName,
		handleEmojiClose
	} = props;

	const onSortEnd = ({ oldIndex, newIndex }) => {
		setColors(arrayMoveImmutable(colors, oldIndex, newIndex));
	};

	return (
		<Main open={isDrawerOpen}>
			<DrawerHeader />
			<SortableContainer axis='xy' onSortEnd={onSortEnd}>
				{colors.map((color, index) => (
					<DraggableColorBox
						color={color.color}
						name={color.name}
						key={color.name}
						index={index}
						deleteColor={() => deleteColor(color.name)}
					/>
				))}
			</SortableContainer>
			<PaletteNameDialog
				isDialogOpen={isDialogOpen}
				handleDialogChange={handleDialogChange}
				savePaletteName={savePaletteName}
				currentPaletteName={currentPaletteName}
				handleDialogClose={handleDialogClose}
			/>
			<EmojiDialog
				submitPalette={submitPalette}
				isEmojiOpen={isEmojiOpen}
				handleEmojiClose={handleEmojiClose}
			/>
		</Main>
	);
};
