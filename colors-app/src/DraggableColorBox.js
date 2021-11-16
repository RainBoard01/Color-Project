import React from 'react'
import styled from '@emotion/styled'

const Div = styled.div`
    background-color: ${ props => props.color };
    width: 20%;
    height: 25%;
    margin: 0 auto;
    display: inline-block;
    position: relative;
    cursor: pointer;
    /*margin-bottom: -4.2px;*/
`;

export const DraggableColorBox = props => 
    <Div color={props.color}>
        { props.color }
    </Div>;