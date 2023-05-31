import React,  { useContext } from "react";
import styled, { css } from "styled-components";
import { IStyledFC } from "../types/IStyledFC";

import { SnackBarContextProvider } from "./SnackBarContext";

import SnackBar from "./SnackBar";

interface ISnackBars extends IStyledFC {
    position: "bottom-left" | "bottom-right" | "bottom-center" | "top-left" | "top-right" | "top-center";
}

const FCSnackBars: React.FC<ISnackBars> = ({className}) => {
    const snackBars = useContext(SnackBarContextProvider);

    return (
        snackBars?.snackBars.length? 
        <div className={className}>
            {
                snackBars.snackBars.map(snackbar => {
                    return ( <SnackBar {...snackbar} closeCallBack={() => snackBars.removeSnackBar(snackbar.id)} /> );
                })
            }
        </div> : null
    )
}
const SnackBars = styled(FCSnackBars)`
    display: flex;
    flex-wrap: wrap;
    width: 250px;
    padding: 5px 15px;
    height: fit-content;
    max-height: 100vh;
    /* background-color: red; */
    position: fixed;
    z-index: 3000;

    ${(props) => {
        switch(props.position) {
            case "top-left":
                return css`
                    top: 0;
                    left: 0;
                `;
            case "top-right":
                return css`
                    top: 0;
                    right: 0;
                `;
            case "top-center":
                return css`
                    top: 0;
                    left: 50%;
                    transform: translateX(-50%);
                `;
            case "bottom-left":
                return css`
                    bottom: 0;
                    left: 0;
                `;
            case "bottom-right":
                return css`
                    bottom: 0;
                    right: 0;
                `;
            case "bottom-center":
                return css`
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                `;
        }
    }}

    ${SnackBar} {
        margin-bottom: 5px;
    }
`;

export default SnackBars;
