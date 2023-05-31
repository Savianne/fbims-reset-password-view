import styled, { DefaultTheme, keyframes, css } from "styled-components";
import React from "react";

export interface IStyledFC {
    className?: string,
    children?: React.ReactChild | React.ReactChild[],
}

interface CreateRippleProps extends IStyledFC {
    onClick?: React.MouseEventHandler<HTMLDivElement>
}

const CreateRipple: React.FC<CreateRippleProps> = ({className, children, onClick}) => {
    const ref = React.useRef<HTMLDivElement>(null);
    
    React.useEffect(() => {
        function createRipple(this: HTMLDivElement, e: MouseEvent) {
            // let x = e.clientX - this.offsetLeft;
            // let y = e.clientY - this.offsetTop;

            let pos = this.getBoundingClientRect();
            let x = e.clientX - pos.left;
            let y = e.clientY - pos.top;
            
            let ripple = document.createElement('span');
            ripple.setAttribute('id', 'ripple');
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 800);
        }

        ref.current?.addEventListener('click', createRipple)
        return(() => {
            ref.current?.removeEventListener('click', createRipple);
        })
    }, []);
    return (
        <div className={className} ref={ref} onClick={onClick}>{children}</div>
    )
};

const rippleAnimation = keyframes`
        from {
            width: 0px;
            height: 0px;
            opacity: 0.5;
        }
        to {
            width: 500px;
            height: 500px;
            opacity: 0;
        }
`;

const UseRipple = styled(CreateRipple)`
    & {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        overflow: hidden;
        border-radius: inherit;
    }
    
    & #ripple {
        position: absolute;
        background-color: #e6f2fa;
        transform: translate(-50%, -50%);
        pointer-events: none;
        border-radius: 50%;
        animation: ${rippleAnimation} 0.8s ease-in infinite;
        /* z-index: 1000; */
    }
`;

export default UseRipple;