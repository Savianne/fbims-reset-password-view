import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { IStyledFC } from "./UseRipple";

interface IFCIconInput extends IStyledFC {
    onChange?: (val: string) => void;
    placeholder: string;
    type: string;
    error?: boolean;
    disabled?: boolean;
    icon: JSX.Element;
    flexible?: boolean;
    value?: string
}

const FCIconInput: React.FC<IFCIconInput> = ({className, type, placeholder, error, disabled, icon, onChange, value = ""}) => {
    const [passwordShow, setPasswordShow] = React.useState(false);

    return (
        <div className={className}>
            <span className="icon-container">
                { icon }  
            </span>
            <input type={type == "password"? passwordShow? 'text' : 'password' : type} placeholder={placeholder} disabled={disabled} onChange={(e) => onChange && onChange(e.target.value)} value={value}/>
            {
                type == 'password' && <span className="view-pass-toggle" onClick={(e) => setPasswordShow(!passwordShow)}>
                    <FontAwesomeIcon icon={["fas", passwordShow? "eye-slash" : 'eye']} />
                </span>
            }
        </div>
    )
}

const IconInput = styled(FCIconInput)`
    display: flex;
    flex: ${(props) => props.flexible? "0 1 100%" : '0 1 fit-content'};
    min-width: 250px;
    height: fit-content;
    align-items: center;
    border: 1.5px solid  ${(props) => props.error? "#FD1515" : "rgba(157, 195, 230, 1)"};
    border-radius: 3px;
    

    .icon-container {
        display: flex;
        flex: 0 0 40px;
        height: 40px;
        align-items: center;
        justify-content: center;
        border-right: 1.5px solid  ${(props) => props.error? "#FD1515" : "rgba(157, 195, 230, 1)"};
        font-size: 20px;
        color: ${(props) => props.error? "#FD1515" : "rgba(157, 195, 230, 1)"};
    }

    input, 
    input:active,
    input:focus,
    input:hover {
        display: flex;
        flex: 0 1 100%;
        height: 40px;
        outline: none;
        padding: 0 5px;
        border: 0;
        color: rgba(157, 195, 230, 1);
        background-color: transparent;
    }

    input:focus {
        outline: 2px solid  ${(props) => props.error? "#FD1515" : "rgba(157, 195, 230, 1)"};
    }

    input::placeholder {
        color:  rgba(157, 195, 230, 1);
        font-weight: 600;
    }

    .view-pass-toggle {
        color: gray;
        height: 20px;
        width: 20px;
        display: flex;
        align-items: center;
        justify-content:center;
        margin: 0 8px;
        font-size: 11px;
    }
`;

export default IconInput;