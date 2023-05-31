import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IStyledFC } from "./UseRipple";

import Revealer from "./Revealer";

interface IValidationResult {
    caption: string,
    passed: boolean,
}

interface IFormErrorFieldValues {
    errorText: string,
    validationResult: IValidationResult[]
};

interface IFCInputErrorToltip extends IStyledFC {
    error: IFormErrorFieldValues,
}

const FCInputErrorToltip: React.FC<IFCInputErrorToltip> = ({className, error}) => {
    const elemRef = React.useRef<null | HTMLDivElement>(null);
    const [revealErrorInfo, updateRevealErrorInfoState] = React.useState(false);
    const [onClickArea, setOnClickArea] = React.useState(false);

    React.useEffect(() => {
        elemRef.current?.setAttribute('reveal', revealErrorInfo? 'true' : 'false');
    }, [revealErrorInfo]);

    React.useEffect(() => {
        function clickAway() {
            if(revealErrorInfo && !(onClickArea)) {
                updateRevealErrorInfoState(false);
            }
        }

        window.addEventListener('click', clickAway);

        return function cleanUp() {
            window.removeEventListener('click', clickAway);
        }
        
    });

    return (
        <div ref={elemRef} className={className}>
            <span className="error-text-container">
                <p className="error-text">{error.errorText}</p>
                <i className="toggler-icon"
                onClick={(e) => updateRevealErrorInfoState(!revealErrorInfo)}
                onMouseEnter={() => {
                    setOnClickArea(true);
                }}
                onMouseLeave={() => {
                    setOnClickArea(false);
                }}><FontAwesomeIcon icon={["fas", "caret-down"]} /></i>
            </span>
            <Revealer reveal={revealErrorInfo}>
                <ul>
                    {
                        error.validationResult.map(item => {
                            return (
                                <li><p className='caption'>{item.caption}</p><i className={item.passed? "checkIndicatorIcon-passed" : "checkIndicatorIcon-fail"}><FontAwesomeIcon icon={["fas", "check-circle"]} /></i></li>
                            )
                        })
                    }
                </ul>
            </Revealer>
        </div>
    )
}

const InputErrorToltip = styled(FCInputErrorToltip)`
    display: flex;
    flex: 0 1 100%;
    min-width: 250px;
    width: fit-content;
    flex-wrap: wrap;
    font-size: 11px;
    border-radius: 3px;
    background-color: transparent;
    transition: background-color 400ms linear;

    &[reveal='true'] {
        border: 1px solid ${({theme}) => theme.borderColor};
        box-shadow: rgb(0 0 0 / 20%) 0px 5px 5px -3px, rgb(0 0 0 / 14%) 0px 8px 10px 1px, rgb(0 0 0 / 12%) 0px 3px 14px 2px;
        background-color: #010a21d9;
        backdrop-filter: 10px;
    }


    & .error-text-container {
        display: flex;
        flex: 0 1 100%;
        color: ${({theme}) => theme.staticColor.delete};
        /* z-index: 1; */
    }

    & .error-text-container .error-text {
        width: fit-content;
    }

    & .error-text-container .toggler-icon {
        display: flex;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        align-items: center;
        justify-content: center;
        margin-left: 10px;
        cursor: pointer;
        transition: background-color 200ms linear;
    }
    
    &[reveal='true'] .error-text-container .toggler-icon {
        transform: rotate(180deg);
    }
    & .error-text-container .toggler-icon:hover {
        background-color: #d0416a52;
    }

    & ${Revealer} {
        flex: 0 1 100%;
        padding: 5px;
    }

    & ${Revealer} ul {
        width: 100%;
    }

    & ${Revealer} ul li {
        display: flex;
        margin: 5px 0;
    }

    & ${Revealer} ul li .caption {
        flex: 1;
        color: whitesmoke;
        font-weight: 100;
    }

    & ${Revealer} ul li .checkIndicatorIcon-passed,
    & ${Revealer} ul li .checkIndicatorIcon-fail {
        display: flex;
        align-items: center;
    }
    
    & ${Revealer} ul li .checkIndicatorIcon-passed {
        color: #26c625fc;
    }

    & ${Revealer} ul li .checkIndicatorIcon-fail {
        color: #565656a8;
    }

    

    /* & ${Revealer} div {
        display: flex;
        flex: 0 1 100%;
        height: 100px;
    } */
`;

export default InputErrorToltip;