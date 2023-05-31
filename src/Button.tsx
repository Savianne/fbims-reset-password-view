import React from "react";
import styled from "styled-components";
import UseRipple from "./UseRipple";

const Button = styled.button<{color?: string, bgColor?: string, flexible?: boolean}>`
    &, &:active, &:hover {
        display: flex;
        position: relative;
        align-items: center;
        justify-content: center;
        flex: ${(props) => props.flexible? "0 1 100%" : '0 1 fit-content'};
        min-width: 110px;
        height: fit-content;
        border-radius: 20px;
        padding: 13px 10px;
        color: ${(props) => props.color?  props.color : 'black'};
        background-color: ${(props) => props.bgColor?  props.bgColor : "#F9F9F9"};
        box-shadow: rgb(0 0 0 / 10%) 0px 5px 5px -3px;
        border: none;
        font-size: 15px;
        cursor: ${(props) => props.disabled? "not-allowed" : "pointer"};
        pointer-events: ${(props) => props.disabled? "none" : "auto"};
        opacity: ${(props) => props.disabled? "0.40" : "1"};
    }

    &:hover {
        box-shadow: ${(props) => props.disabled? 'none' : 'rgb(0 0 0 / 20%) 0px 5px 5px -3px'};
    }

    &:active {
        box-shadow: ${(props) => props.disabled? 'none' : 'rgb(0 0 0 / 10%) 0px 5px 5px -3px, rgb(0 0 0 / 5%) 0px 8px 10px 1px, rgb(0 0 0 / 6%) 0px 3px 14px 2px'};
    }
    
`;

export default Button;
