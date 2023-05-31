import styled from "styled-components";

const Bubble = styled.span<{size: string, color: string, top?: string, left?: string, bottom?: string; right?: string}>`
    display: flex;
    position: absolute;
    width: ${(props) => props.size};
    height: ${(props) => props.size};
    border-radius: 50%;
    opacity: 0.2;
    background-color: ${(props) => props.color};
    bottom: ${(props) => props.bottom? props.bottom : "none"};
    top: ${(props) => props.top? props.top : "none"};
    right: ${(props) => props.right? props.right : "none"};
    left: ${(props) => props.left? props.left : "none"};
    z-index: 0;
`;

export default Bubble;