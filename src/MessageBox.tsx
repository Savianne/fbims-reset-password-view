import styled from "styled-components";

const MessageBox = styled.div<{color: string}>`
    display: flex;
    flex: 0 1 100%;
    padding: 7px 10px;
    border-left: 2px solid ${(props) => props.color};
    background-color: #F9F9F9;
    font-size: 12px;
    white-space: pre-line;
`;

export default MessageBox