import React from 'react';
import styled from '@emotion/styled';
import { SortableElement } from 'react-sortable-hoc';

const ColorBox = styled.div`
	background-color: ${props => props.color};
	cursor: pointer;
	height: 25%;
	width: 20%;
	margin: 0 auto;
	display: inline-block;
	position: relative;
`;

const Text = styled.div`
	display: flex;
	height: 100%;
	justify-content: space-between;
	align-items: flex-end;
	padding: 10px;
	color: rgba(0, 0, 0, 0.5);
`;

const Name = styled.span`
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
		'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
	text-transform: uppercase;
	letter-spacing: 1px;
	font-size: 12px;
`;

const Delete = styled('button')`
	transition: transform 0.2s;
	&:hover {
		transform: scale(1.3);
	}
`;

export const DraggableColorBox = SortableElement(props => (
	<ColorBox color={props.color}>
		<Text>
			<Name>{props.name}</Name>
			<Delete
				style={{
					textDecoration: 'none',
					border: 'none',
					background: 'none',
					padding: 0,
					margin: 0
				}}
				onClick={props.deleteColor}
			>
				<svg
					width='15px'
					height='15px'
					viewBox='-32 0 512 512'
					xmlns='http://www.w3.org/2000/svg'
					style={{ fill: 'rgba(0,0,0,0.6)', pointerEvents: 'none' }}
				>
					<path d='M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z' />
				</svg>
			</Delete>
		</Text>
	</ColorBox>
));
