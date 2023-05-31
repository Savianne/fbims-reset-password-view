import styled, { css } from "styled-components";
import React, { useEffect } from "react";
import { IStyledFC } from "./UseRipple";
import UseRipple from "./UseRipple";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import InputErrorToltip from "./InputErrorToltip";

//Types 
interface IValidationResult {
    caption: string,
    passed: boolean,
}

interface IFormErrorFieldValues {
    errorText: string,
    validationResult: IValidationResult[]
};

type TInputVal = string | number | boolean;
type TInputType = 'text' | 'number' | 'radio' | 'checkbox' | 'date' | 'email';
interface IFormErrorFieldValues {
    errorText: string,
    validationResult: IValidationResult[]
};

export interface IFCInput extends IStyledFC {
    name?: string,
    value?: string | null,
    placeholder: string,
    type: TInputType,  
    error?: IFormErrorFieldValues | null,
    disabled?: boolean,
    onValChange: (val: TInputVal) => void,
    label?: string,
    checked?: boolean;
    autoFocus?: boolean
}

const CheckboxBase = styled(UseRipple)`
    position: relative;
    display: flex;
    height: 40px;
    width: 40px;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background-color 300ms ease-in-out;

    &:hover {
        /* background-color: ${({theme}) => theme.background.light}; */
        background-color: lightgray;
    }

    & input {
        position: absolute;
        opacity: 0;
        background-color: pink;
        cursor: pointer;
        height: 100%;
        width: 100%;
        z-index: 2;
    }
    
    & input ~ .checkboxChecked {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 13px;
        height: 13px;
        border-radius: 3px;
        border: 2px solid #e6e8ec;
        background-color: #15A9FD;
        font-size: 13px;
        z-index: 1;
        color: #fff;
        transition: background-color 300ms linear, border-color 300ms liner;
    }

    & input ~ .checkboxChecked > i {
        opacity: 0;
        transition: opacity 300ms linear;
    }

    & input:checked ~ .checkboxChecked {
        background-color: #2196F3;
        border-color: #2196F3;
    }

    & input:checked ~ .checkboxChecked  i {
        opacity: 1;
    }


    /* & input:checked ~ .checkboxChecked {
        background-color: #2196F3;
        border-color: #2196F3;
        color: #fff;
    }

    &input:checked ~ .checkboxChecked i {
        display: inline;
    } */
`;

const FCInput: React.FC<IFCInput> = ({className, onValChange, name, value = null, disabled, type = 'text', placeholder, error, label, checked, autoFocus}) => {
    const inputRef = React.useRef<null | HTMLInputElement>(null);
    const [inputVal, updateInputVal] = React.useState<string | boolean | null>(value);
    const [inputState, updateInputState] = React.useState<'init' | 'onfocus' | 'onblur'>('init');

    React.useEffect(() => {
        if(!(inputVal == null)) onValChange(inputVal);
    },[inputVal]);

    React.useEffect(() => {
        updateInputVal(value);
    }, [value]);
    
    const checkboxInput = 'checkbox' as typeof type;

    React.useEffect(() => {
        updateInputVal(checked as boolean);
    }, [checked]);
    return (
        <div className={className}>
            {
                type == checkboxInput? <>
                    <CheckboxBase>
                        <input 
                        autoFocus={autoFocus}
                        checked={inputVal as boolean}
                        ref={inputRef}
                        type={type}
                        onChange={(e) => updateInputVal(e.currentTarget.checked)} 
                        onBlur={(e) => {
                            if(type == 'date') e.preventDefault();
                            updateInputState('onblur')
                        }}
                        onFocus={(e) => updateInputState('onfocus')}
                        value={typeof inputVal == 'string'? inputVal : ''}
                        placeholder={placeholder}
                        className={error? 'error-field input-field' : 'input-field'} />
                        <span className="checkboxChecked"><i><FontAwesomeIcon icon={["fas", "check"]} /></i></span>
                    </CheckboxBase>
                    <p className="label">{label}</p>
                </> 
                :
                <>
                    <input 
                    autoFocus={autoFocus}
                    ref={inputRef}
                    type={type}
                    onChange={(e) => updateInputVal(e.target.value)} 
                    onBlur={(e) => {
                        if(type == 'date') e.preventDefault();
                        updateInputState('onblur')
                    }}
                    onFocus={(e) => updateInputState('onfocus')}
                    value={typeof inputVal == 'string'? inputVal : ''}
                    placeholder={placeholder}
                    className={error? 'error-field input-field' : 'input-field'}
                    />
                    <label onClick={(e) => inputRef.current?.focus()}>{ placeholder }</label>
                    {
                        error? <>
                            <span className="error-toltip">
                                <InputErrorToltip error={error} />
                            </span>
                        </> : ''
                    }
        
                    {
                        error? <i className='error-icon'><FontAwesomeIcon icon={["fas", "circle-exclamation"]} /></i>  : ''
                    }         
                </>
            }
        </div>
    )
}

const Input = styled(FCInput)`
    position: relative;
    display: flex;
    align-items: center;

    ${(prop) => {
        const inputType = prop.type as string;
        
        switch(inputType) {
            case 'checkbox':
                return css`
                    width: fit-content;
                    padding: 10px 0;

                    & .label {
                        margin-left: 5px;
                        color: #000000;
                    }
                `;
            break;
            default:
                return css`
                    flex: 1;
                    height: fit-content;

                    & input {
                        font-family: inherit;
                        width: 100%;
                        border: 0;
                        border-bottom: 1px solid #d2d2d2;
                        outline: 0;
                        font-size: 15px;
                        color: #000000;
                        padding: 7px 3px;
                        background: transparent;
                        transition: border-color 0.2s;
                        /* background-color: ${({theme}) => theme.mode == 'dark'? '#f9f9f90a' : '#f9f9f9'}; */
                    }

                    /* & input::-webkit-calendar-picker-indicator { filter: ${({theme}) => theme.mode == 'dark'? 'invert(100%)' : 'none'}; } */

                    & input::placeholder {
                        color: transparent;
                    }

                    & input:placeholder-shown ~ label {
                        font-size: 15px;
                        cursor: text;
                        top: 5px;
                        left: 5px;
                        z-index: 0;
                    }

                    & label,
                    & input:focus ~ label {
                        position: absolute;
                        top: -18px;
                        left: 0;
                        display: block;
                        transition: 0.2s;
                        font-size: 12px;
                        color: #9b9b9b;
                    }

                    & input:focus ~ label {
                        color: #15A9FD;
                    }

                    & input:focus {
                        padding-bottom: 6px;
                        border-bottom: 2px solid #15A9FD;
                    }
                `
        }
    }}

    
    /* & .error-text, */
    & .error-toltip {
        position: absolute;
        top: calc(100% + 1px);
        width: 100%;
        font-size: 11px;
        color: #FD1515;
        z-index: 100;
    }

    & .error-field, & .error-field:focus {
        border-color: #FD1515;
    }

    & .error-field ~ label, & .error-field:focus ~ label {
        color: #FD1515;
    }

    & .error-icon {
        width: fit-content;
        height: fit-content;
        position: absolute;
        right: 5px;
        font-size: 11px;
        color: #FD1515;
    }
`;

export default Input;