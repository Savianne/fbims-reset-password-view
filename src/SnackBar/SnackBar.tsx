import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IStyledFC } from "../UseRipple";

interface IFCSnackBar extends  IStyledFC {
    type: "error" | "success" | "info" | "warning" | "default";
    text: string;
    closeCallBack: () => void;
    durationInSec: number;
}

const FCSnackBar: React.FC<IFCSnackBar> = ({className, type, text, closeCallBack, durationInSec}) => {
    const comRef = React.useRef<null | HTMLDivElement>(null);
    const [render, setRender] = React.useState(true);

    React.useEffect(() => {
        setTimeout(() => {
            comRef.current?.setAttribute('transition', "start");
            setTimeout(() => {
                comRef.current?.setAttribute('state', "remove");
                setRender(false);
            }, 650);
        }, (1000 * (durationInSec - 1)) + 500);
    }, []);

    React.useEffect(() => {
        if(!render) closeCallBack();
    }, [render])
    return (
    <div className={className} ref={comRef}>
        <span className="icon-container">
            <FontAwesomeIcon icon={["fas", type == 'error' || type == 'warning'? "exclamation-circle" : type == 'success'? "check-circle" : type == 'info'? "info-circle" : "info-circle"]} />
        </span>
        <p className="text">
            { text }
        </p>
        <span className="btn-close" onClick={(e) => {
            comRef.current?.setAttribute('transition', "start");
            setTimeout(() => {
                comRef.current?.setAttribute('state', "remove");
                setRender(false);
            }, 650);
        }}>
            <FontAwesomeIcon icon={["fas", 'times']} />
        </span>
    </div>
    );
}

const SnackBar = styled(FCSnackBar)`
    display: flex;
    width: 250px;
    padding: 10px;
    align-items: center;
    background-color: ${(props) => props.type == 'error'? "#f21818ad" : props.type == 'warning'? "#ff9800c2" : props.type == 'info'? "#03a9f4ad" : props.type == 'success'? "#00ff39ba" : "#0e0e0ec7"};
    color: white;
    border-radius: 5px;
    overflow: hidden;

    &[transition="start"] {
        transition: 1500ms opacity ease-in-out, 500ms margin-left ease-in-out 300ms;
        opacity: 0.3;
        margin-left: -180px;
    }

    &[state="remove"] {
        display: none;
    }

    .text {
        flex: 1;
        font-size: 13px;
    }

    .icon-container {
        height: fit-content;
        margin-right: 10px;
    }

    .btn-close {
        display: flex;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        align-items: center;
        justify-content: center;
        margin-left: 10px;
    }

    .btn-close:hover {
        transition: 300ms background-color;
        background-color: #98989859;
    }
`;

export default SnackBar;