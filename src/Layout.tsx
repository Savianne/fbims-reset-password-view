import styled from "styled-components";
import Button from "./Button";
import { InputContainer } from "./OTPField";
import IconInput from "./IconInput";

export const Container = styled.div`
    display: flex;
    flex: 0 1 fit-content;
    height: fit-content;
    flex-direction: column;
    -webkit-box-shadow: 14px 3px 73px 11px rgba(240,240,240,0.61);
    -moz-box-shadow: 14px 3px 73px 11px rgba(240,240,240,0.61);
    box-shadow: 14px 3px 73px 11px rgba(240,240,240,0.61);
    z-index: 5;

    .timer {
        display: flex;
        flex: 1;
        justify-content: center;
    }

    .loading-indicator-area {
        display: flex;
        flex: 0 1 100%;
        justify-content: center;
        background-color: transparent;
        height: fit-content;
    }

    .got-expired {
        font-size: 30px;
        font-weight: bold;
        color: red;
    }
`;

export const BGImage = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: url(http://localhost:3009/assets/images/organizations.jpg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0.3;
`;

export const LoginForm = styled.div`
    position relative;
    display: flex;
    align-content: flex-start;
    max-width: 450px;
    min-width: 300px;
    height: 100%;
    background-color: white;
    flex-wrap: wrap;
    -webkit-box-shadow: 4px 5px 5px -1px  rgba(140,140,140,1);
    -moz-box-shadow: 4px 5px 5px -1px  rgba(140,140,140,1);
    box-shadow: 4px 5px 5px -1px  rgba(140,140,140,1);
    overflow: hidden;

    .form-group {
        display: flex;
        flex: 0 1 100%;
        flex-wrap: wrap;
        padding: 0 40px;
        height: fit-content;
        justify-content: center;
        margin: 20px 0 20px 0;
    }
 
    h1 {
        display: flex;
        flex: 0 1 100%;
        justify-content: center;
        margin: 10px 0 0 0;
        font-weight: bold;
        font-size: 18px;
    }

    .user-info-group {
        display: flex;
        flex: 0 1 100%;
        height: fin-content;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
    }

    .user-info-group .user-fullname,
    .user-info-group .user-email {
        flex: 0 1 100%;
        text-align: center;
    }

    .user-info-group .user-email {
        color: gray;
        font-size: 13px;
        font-style: italic;
    }

    .user-info-group .user-fullname {
        font-size: 18px;
        font-weight: 600;
    }

    .form-group .input-group {
        display: flex;
        flex: 0 1 100%;
        height: fit-content;
        margin-bottom: 25px;
        flex-wrap: wrap;
    }

    .form-group .input-group .error-text {
        flex: 0 1 100%;
        font-size: 12px;
        margin-top: 3px;
        font-weight: 600;
        color: #FD1515;
    }
    
    .form-group ${InputContainer} {
        margin: 15px 0;
    }
    .form-group ${Button} {
        margin-top: 10px;
        margin-left: auto;
    }

    .form-group .forgot-pass-link-area,
    .form-group .back-to-login-form-area {
        display: flex;
        flex: 0 1 100%;
        margin-top: 30px;
        cursor: pointer;
    }

    .form-group .forgot-pass-link-area .forgot-pass-link,
    .form-group .back-to-login-form-area .back-to-login-form {
        margin-left: auto;
        font-weight: 600;
        color: rgba(157, 195, 230, 1);
    }
`;

const Layout = styled.div`
    display: flex;
    position: relative;
    flex: 0 1 100%;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #cbc8c81f;
    font-family: AssistantVariableFontwght;
    line-height: 1.5;
    letter-spacing: 0.00938em;

    ${IconInput} {
        z-index: 150;
    }

    .global-loading-spinner {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100vh;
        position: fixed;
        z-index: 1000;
      /* From https://css.glass */
        background: rgba(1, 10, 40, 0.28);
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(1.6px);
        -webkit-backdrop-filter: blur(1.6px);
        border: 1px solid rgba(1, 10, 40, 0.3);
    }

    .global-loading-spinner .loading-content {
        display: flex;
        width: fit-content;
        height: fit-content;
        flex-direction: column;
        align-items: center;
    }

    .global-loading-spinner .loading-content .spinner-text {
        margin-top: 10px;
        font-size: 20px;
        font-weight: bold;
        color: white;
    }
`;

export default Layout;