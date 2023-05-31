import React from "react";
import styled from "styled-components";

import { IStyledFC } from "./UseRipple";

interface IFCRevealer extends IStyledFC {
    reveal: boolean;
    maxHeight?: string;
}

const FCRevealer: React.FC<IFCRevealer> = ({className, children, reveal}) => {

    return (
        <div className={className}>
            <div className="content-reveal">
                { children }
            </div>
        </div>
    );
}

const Revealer = styled(FCRevealer)`
    position: relative;
    max-height: 0;
    display: flex;
    flex: 0 1 100%;
    align-items: center;
    justify-content: center;
    max-height: ${(props) => props.reveal? props.maxHeight? props.maxHeight : '300px' : 0};
    /* height: ${(props) => props.reveal? '100%' : 0}; */
    transition: max-height 500ms ease-in-out;
    overflow: ${(props) => props.reveal? 'vissible' : 'hidden'};

    & .content-reveal {
        /* position: absolute;
        top: ${(props) => props.reveal? 0 : '-50%'}; */
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        height: fit-content;
        align-items: center;
        justify-content: center;
        opacity: ${(props) => props.reveal? 1 : 0};
        transition: opacity 500ms linear, top 500ms linear;
    }
`;

export default Revealer;