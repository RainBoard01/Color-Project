import React from 'react'
import styled from '@emotion/styled'
import DeleteIcon from '@mui/icons-material/Delete';

const ColorBox = styled.div`
    background-color: ${ props => props.color };
    width: 20%;
    height: 25%;
    margin: 0 auto;
    display: inline-block;
    position: relative;
    cursor: pointer;
    /*margin-bottom: -4.2px;*/
`;

const Text = styled.div`
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: flex-end;
    padding: 10px;
    color: rgba(0,0,0,0.5);
`;

const Name = styled.span`
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 12px;
`;

const Delete = styled(DeleteIcon)`
    font-size: 20px;
    transition: transform .2s;
    &:hover {
        color: white;
        transform: scale(1.3);
    }
`;

export const DraggableColorBox = props => 
    <ColorBox color={props.color}>
        <Text>
            <Name>{ props.name }</Name>
            <Delete onClick={ props.deleteColor }/>
        </Text>
    </ColorBox>;