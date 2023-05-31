import React from "react";
import styled from "styled-components";

const FaveVerse = styled.div`
    display: flex;
    flex: 0 1 100%;
    flex-wrap: wrap;
    color: white;
    z-index: 5;
    height: fit-content;
    margin-top: 50px;
    
    .verse {
        flex: 0 1 100%;
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
    }

    .verse-text {
        flex: 0 1 100%;
        font-size: 15px;
        font-family: AssistantExtraLight;
        font-style: italic;
        text-align: justify;
    }
`

export default FaveVerse;