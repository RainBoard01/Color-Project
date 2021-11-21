import React from 'react';
import { Link } from 'react-router-dom';
import { Toolbar, Typography, Stack, Button, IconButton } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 350;

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: prop => prop !== 'open'
})(({ theme, open }) => ({
	transition: theme.transitions.create(['margin', 'width'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen
	}),
	...(open && {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: `${drawerWidth}px`,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		})
	})
}));

export const Appbar = props => {
	return (
		<AppBar position='fixed' color='default' open={props.isDrawerOpen}>
			<Toolbar>
				<IconButton
					color='inherit'
					aria-label='open drawer'
					onClick={props.handleDrawerOpen}
					edge='start'
					sx={{ mr: 2, ...(props.isDrawerOpen && { display: 'none' }) }}
				>
					<MenuIcon />
				</IconButton>
				<Typography variant='h6' color='inherit' noWrap>
					Persistent drawer
				</Typography>
				<Stack
					direction='row'
					justifyContent='center'
					alignItems='center'
					spacing={1}
					marginLeft='auto'
				>
					<Link to='/' style={{ textDecoration: 'none' }}>
						<Button variant='contained' color='secondary'>
							Go Back
						</Button>
					</Link>
					<Button
						variant='contained'
						color='primary'
						onClick={props.handleDialogOpen}
					>
						Save Palette
					</Button>
				</Stack>
			</Toolbar>
		</AppBar>
	);
};
